import * as service from './service'

export default {
  namespace: 'viewConfig',
  state: {
    list: [],
    total: null,
  },
  reducers: {
    save(
      state,
      {
        payload: { data: list, total, page },
      },
    ) {
      return { ...state, list, total, page }
    },
    findAllReducer(state, { payload }) {
      return {
        ...state,
        list: payload.items,
      }
    },
  },
  effects: {
    *findAll(
      {
        payload: {},
      },
      { call, put },
    ) {
      const data = yield call(service.findAll, {})
      yield put({
        type: 'findAllReducer',
        payload: data,
      })
    },
  },
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname, query }) => {
  //       if (pathname === '/users') {
  //         dispatch({ type: 'fetch', payload: query })
  //       }
  //     })
  //   },
  // },
}
