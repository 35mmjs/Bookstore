import { queryGetData, queryPOSTData, removeRule, addRule } from '../services/api';

export default {
  namespace: 'rule',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryGetData, payload);
      console.log('params->', payload);
      console.log('response->', response);
      let list = [];
      for (var i in response['[]']) {
        let heart_connect = response['[]'][i]['heart_connect'];
        console.log('heart_connect:' + heart_connect);
        if (heart_connect && heart_connect['gmt_create']) {
          console.log('heart_connect:' + heart_connect['gmt_create']);
          response['[]'][i]['device_list']['gmt_last'] = heart_connect['gmt_create'];
          let lastTime = new Date(heart_connect['gmt_create']).getTime();
          let currentTime = new Date().getTime();
          let str;
          if (currentTime - lastTime < 5 * 60 * 1000) {
            response['[]'][i]['device_list']['open_status'] = 1;
          } else {
            response['[]'][i]['device_list']['open_status'] = 0;
          }
        }
        list.push(response['[]'][i]['device_list']);
      }
      const result = {
        list: list,
        pagination: {
          total: response['total'],
          pageSize: payload['[]']['count'],
          current: payload['[]']['page'] + 1,
        },
      };
      console.log('result->', result);
      yield put({
        type: 'save',
        payload: result,
      });
    },
    *add({ payload, callback }, { call, put }) {
      console.log('add function');
      const response = yield call(queryPOSTData, payload);
      console.log('add function after');
      if (callback) callback();
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
  },

  reducers: {
    save(state, action) {
      console.log('save function');
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
