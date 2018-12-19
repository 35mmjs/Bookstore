import ajax from '../../common/ajax'

export const search = (data) => {
  return ajax({
    url: 'http://47.96.75.202/open/v1book/search',
    data,
    method: 'post',
  })
}

export const getZhantaiData = (data) => {
  return ajax({
    url: '/open/v1/zhantai',
    data,
    method: 'get',
  })
}
