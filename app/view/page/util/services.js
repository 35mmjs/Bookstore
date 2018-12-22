import axios from 'axios'

export const search = (data) => {
  return axios.get('http://47.96.75.202/open/v1/book/search')
}

export const getPubuData = (data) => {
  return axios.get('http://47.96.75.202/open/v1/pubu')
}

export const getRecommend = (data) => {
  return axios.get(`http://47.96.75.202/open/v1/book/recommend?isbn=${data.isbn}`)
}

export const getZhantaiData = (data) => {
  return axios.get('http://47.96.75.202/open/v1/zhantai')
}

export const getBook = (data) => {
  return axios.get(`http://47.96.75.202/open/v1/book?isbn=${data.isbn}`)
}
