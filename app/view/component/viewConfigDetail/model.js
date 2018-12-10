import * as service from './service'

export default {
  namespace: 'viewConfigDetail',
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
    createReducer(state, { payload }) {
      return {
        ...state,
        list: payload.items,
      }
    },
  },
  effects: {
    *create(
      {
        payload,
      },
      { call, put },
    ) {
      console.log('aaaaaaaa', payload)
      const data = yield call(service.create, payload)
      yield put({
        type: 'createReducer',
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
