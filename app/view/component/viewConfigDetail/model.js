import { message } from 'antd'
import * as service from './service'

export default {
  namespace: 'viewConfigDetail',
  state: {
    list: [],
    total: null,
    singleItem: {},
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
    findOneReducer(state, { payload }) {
      return {
        ...state,
        list: payload.items,
        singleItem: payload,
      }
    },
  },
  effects: {
    *create({ payload }, { call, put }) {
      const data = yield call(service.create, payload)
      console.log('aaaaaaaa', data)
      message.success('新增成功', 2, () => {
        window.location.reload()
      })
    },
    *findOne({ payload }, { call, put }) {
      const data = yield call(service.findOne, payload)
      yield put({
        type: 'findOneReducer',
        payload: data,
      })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(a => {
        console.log('bbbbbbb', a)
        // if (pathname === '/users') {
        //   dispatch({ type: 'fetch', payload: query })
        // }
      })
    },
  },
}
