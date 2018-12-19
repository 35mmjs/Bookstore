import axios from 'axios'

export const search = (data) => {
  return axios({
    url: 'http://47.96.75.202/open/v1book/search',
    data,
    method: 'post',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
}

export const getZhantaiData = (data) => {
  return axios.get('http://47.96.75.202/open/v1/zhantai')
}
