import { stringify } from 'qs';
import request from './request';

export async function queryRule(params) {
  // return request(`/api/rule?${stringify(params)}`);
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryGetData(params) {
  // return request(`/api/rule?${stringify(params)}`);
  // return request('http://home.redcat.im:8340/queryport/get', {
  return request('https://www.shulian8.com/queryport/get', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function queryPOSTData(params) {
  // return request(`/api/rule?${stringify(params)}`);
  return request('https://www.shulian8.com/queryport/post', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}


export async function queryPUTData(params) {
  // return request(`/api/rule?${stringify(params)}`);
  return request('https://www.shulian8.com/queryport/put', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function querySQLData(params) {
  return request(`http://120.55.150.29/bridgeQuery/?${stringify(params)}`);
  // return request('http://47.92.193.131:8000/bridgeQuery/', {
  //   method: 'GET',
  //   body: {
  //     ...params,
  //   },
  // });
}



export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  console.log(params);
  if (params.userName == 'admin' && params.password == 'hipac888888') {
    return {
        status: 'ok',
        type: params.type,
        currentAuthority: 'admin',
      };
  } else if (params.userName == 'admin' && params.password == 'admin') {
    return {
      status: 'ok',
      type: params.type,
      currentAuthority: 'admin',
    };
  } else {
    return {
      status: 'error',
      type: params.type,
      currentAuthority: 'guest',
    }
  }
  // return request('/api/login/account', {
  //   method: 'POST',
  //   body: params,
  // });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
