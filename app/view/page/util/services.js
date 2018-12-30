import axios from 'axios'

export const search = (data) => {
  return axios.get(`http://47.96.181.54/open/v1/book/search?keyword=${data.keyword}`)
}

export const getPubuData = (data) => {
  return axios.get('http://47.96.181.54/open/v1/pubu')
}

export const getRecommend = (data) => {
  return axios.get(`http://47.96.181.54/open/v1/book/recommend?isbn=${data.isbn}`)
}

export const getZhantaiData = (data) => {
  return axios.get('http://47.96.181.54/open/v1/zhantai')
}

export const getBook = (data) => {
  return axios.get(`http://47.96.181.54/open/v1/book?isbn=${data.isbn}`)
}

export const getDaoshiData = (data) => {
  return axios.get('http://47.96.181.54/open/v1/daoshi')
}
