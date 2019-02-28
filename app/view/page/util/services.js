import axios from 'axios'

const dailyHost = '47.96.75.202'
const pubHost = '47.96.181.54'

console.log('host: ', window.location.hostname)
const host = window.location.hostname === pubHost ? pubHost : '127.0.0.1:7001'

export const search = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get(`http://${host}/open/v1/book/search`, {
    params: {
      keyword: data.keyword,
      orgId,
      clientId,
    },
  })
}

export const getPubuData = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get(`http://${host}/open/v1/pubu`, {
    params: {
      orgId,
      clientId,
    },
  })
}

export const getRecommend = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get(`http://${host}/open/v1/book/recommend`, {
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
  return axios.get(`http://${host}/open/v1/zhantai`, {
    params: {
      orgId,
      clientId,
    },
  })
}

export const getBook = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get(`http://${host}/open/v1/book`, {
    params: {
      orgId,
      clientId,
      isbn: data.isbn,
      spbs: data.spbs,
    },
  })
}

export const getDaoshiData = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get(`http://${host}/open/v1/daoshi`, {
    params: {
      orgId,
      clientId,
    },
  })
}

export const getPaihangCatalog = data => {
  const { orgId, clientId } = window.appData
  const { navId } = data
  return axios.get(`http://${host}/open/v1/paihang/catalog`, {
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
  return axios.get(`http://${host}/open/v1/paihang/update`, {
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
  return axios.get(`http://${host}/open/v1/paihang/pad/detail`, {
    params: {
      orgId,
      clientId,
      navId,
      rankId,
    },
  })
}
