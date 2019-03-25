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
    createReducer(state, { payload }) {
      return {
        ...state,
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
      try {
        const data = yield call(service.create, payload)
        yield put({
          type: 'createReducer',
          payload: data,
        })
        message.success('创建成功', 3, () => {
          window.location.reload()
        })
      } catch (e) {
        message.fail('创建失败')
      }
    },
    *edit({ payload }, { call, put }) {
      try {
        const data = yield call(service.update, payload)
        yield put({
          type: 'createReducer',
          payload: data,
        })
        message.success('修改成功', 3, () => {
          window.location.reload()
        })
      } catch (e) {
        message.fail('创建失败')
      }
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
        // if (pathname === '/users') {
        //   dispatch({ type: 'fetch', payload: query })
        // }
      })
    },
  },
}
