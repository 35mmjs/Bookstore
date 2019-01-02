import axios from 'axios'

export const search = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get('http://47.96.181.54/open/v1/book/search', {
    params: {
      keyword: data.keyword,
      orgId,
      clientId,
    },
  })
}

export const getPubuData = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get('http://47.96.181.54/open/v1/pubu', {
    params: {
      orgId,
      clientId,
    },
  })
}

export const getRecommend = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get('http://47.96.181.54/open/v1/book/recommend', {
    params: {
      orgId,
      clientId,
      isbn: data.isbn,
    },
  })
}

export const getZhantaiData = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get('http://47.96.181.54/open/v1/zhantai', {
    params: {
      orgId,
      clientId,
    },
  })
}

export const getBook = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get('http://47.96.181.54/open/v1/book', {
    params: {
      orgId,
      clientId,
      isbn: data.isbn,
    },
  })
}

export const getDaoshiData = (data) => {
  const { orgId, clientId } = window.appData
  return axios.get('http://47.96.181.54/open/v1/daoshi', {
    params: {
      orgId,
      clientId,
    },
  })
}
