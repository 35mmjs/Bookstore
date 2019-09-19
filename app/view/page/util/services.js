import axios from 'axios'

import ajax from '../../common/ajax'
import { viewConfig } from '../../../api'

const devHost = '127.0.0.1:7001'
const dailyHost = '47.96.75.202'
// const pubHost = '47.96.181.54'
const pubHost = 'www.shulian8.com'

console.log('host: ', window.location.hostname)
const host = window.location.hostname === pubHost ? pubHost : pubHost

//当前页面请求http换成https modify by xiazifei

export const search = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get(`https://${host}/open/v1/book/search`, {
    params: {
      keyword: data.keyword,
      orgId,
      clientId,
    },
  })
}

export const getPubuData = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get(`https://${host}/open/v1/pubu`, {
    params: {
      orgId,
      clientId,
    },
  })
}

export const getRecommend = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get(`https://${host}/open/v1/book/recommend`, {
    params: {
      orgId,
      clientId,
      isbn: data.isbn,
      spbs: data.spbs,
    },
  })
}

export const getZhantaiData = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get(`https://${host}/open/v1/zhantai`, {
    params: {
      orgId,
      clientId,
    },
  })
}

export const getBook = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get(`https://${host}/open/v1/book`, {
    params: {
      orgId,
      clientId,
      isbn: data.isbn,
      spbs: data.spbs,
      ls_SendUnitID: data.ls_SendUnitID,
    },
  })
}

export const getDaoshiData = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get(`https://${host}/open/v1/daoshi`, {
    params: {
      orgId,
      clientId,
    },
  })
}

export const getPaihangCatalog = data => {
  const { orgId, clientId } = window.appData
  const { navId } = data
  return axios.get(`https://${host}/open/v1/paihang`, {
    params: {
      orgId,
      clientId,
      navId,
    },
  })
}

export const updatePaihangCatalog = data => {
  const { orgId, clientId } = window.appData
  const { navId, catalogId } = data
  return axios.get(`https://${host}/open/v1/paihang/update`, {
    params: {
      orgId,
      clientId,
      navId,
      catalogId,
    },
  })
}

export const getPaihangDetail = data => {
  const { orgId, clientId, navId = 2, rankId = 3 } = window.appData
  return axios.get(`https://${host}/open/v1/paihang/pad/detail`, {
    params: {
      orgId,
      clientId,
      navId,
      rankId,
    },
  })
}

export const tracker = data => {
  const { orgId, clientId } = window.appData
  return axios.get(`https://${host}/open/v1/tracker`, {
    params: {
      clientId,
      act: data.act || 'click',
      biz_type: data.biz_type,
      biz_data: data.biz_data,
    },
  })
}

export const getClientConfig = data => {
  const { orgId, clientId } = window.appData
  return axios.get(`https://${host}/open/v1/terminal`, {
    params: {
      orgId,
      clientId,
    },
  })
}

// export const getViewConfigData = id => {
//   return axios.get(`https://${host}/view-config/findOne.json`, {
//     params: {
//       id,
//     },
//   })
// }
export function getViewConfigData(id) {
  return ajax({
    url: viewConfig.findOne,
    method: 'get',
    data: {
      id,
    },
  })
}