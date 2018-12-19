import * as service from './service'

export default {
  namespace: 'terminal',
  state: {
    list: [],
    singleItem: {},
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
        ...state, list, total, page,
      }
    },
    findAllReducer(state, { payload }) {
      return {
        ...state,
        list: payload,
      }
    },
  },
  effects: {
    *findAll(
      {
        payload,
      },
      { call, put },
    ) {
      const data = yield call(service.findAll, payload)
      yield put({
        type: 'findAllReducer',
        payload: data.items,
      })
    },
    *findOne(
      {
        payload,
      },
      { call, put },
    ) {
      const data = yield call(service.findOne, payload)
      yield put({
        type: 'save',
        payload: data,
      })
    },
    *create(
      {
        payload,
      },
      { call, put },
    ) {
      const data = yield call(service.create, payload)
      yield put({
        type: 'save',
        payload: data,
      })
    },
    *update(
      {
        payload,
      },
      { call, put },
    ) {
      const data = yield call(service.update, payload)
      yield put({
        type: 'save',
        payload: data,
      })
    },
    *remove(
      {
        payload,
      },
      { call, put },
    ) {
      const data = yield call(service.remove, payload)
      yield put({
        type: 'save',
        payload: data,
      })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen((a) => {
        // if (pathname === '/users') {
        //   dispatch({ type: 'fetch', payload: query })
        // }
      })
    },
  },
}
