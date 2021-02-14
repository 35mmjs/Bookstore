import * as service from './service'
import { queryGetData, queryPOSTData, queryPUTData, removeRule, addRule } from '../../common/api';

export default {
  namespace: 'tracker',
  state: {
    list: [],
    pagination: {},
    total: null,
    form: {},
  },
  reducers: {
    save(
      state,
      {
        payload: { data: list, total, page },
      },
    ) {
      return {
        ...state,
        list,
        total,
        page,
      }
    },
    findAllReducer(state, { payload }) {
      return {
        ...state,
        list: payload.list,
        pagination: payload.pagination,
      }
    },
  },
  effects: {
    *findAll({ payload }, { call, put }) {
      // const data = yield call(service.findAll, payload)
      const response = yield call(queryGetData, payload)
      let trackList = response['[]'] || []
      let list = []
      for (let i in trackList) {
        trackList[i]['tracker']['type'] = trackList[i]['terminals']['type']
        trackList[i]['tracker']['terminals_name'] = trackList[i]['terminals']['name']
        trackList[i]['tracker']['store_name'] = trackList[i]['stores']['name']
        list.push(trackList[i]['tracker'])
      }
      const result = {
        list,
        pagination: {
          total: response.total,
          pageSize: payload['[]']['count'],
          current: payload['[]']['page'] + 1,
        },
      }
      yield put({
        type: 'findAllReducer',
        payload: result,
      })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(a => {
        // if (pathname === '/users') {
        //   dispatch({ type: 'fetch', payload: query })
        // }
      })
    },
  },
}
