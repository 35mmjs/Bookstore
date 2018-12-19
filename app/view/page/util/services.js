import ajax from '../../common/ajax'

export const search = (data) => {
  return ajax({
    url: 'http://47.96.75.202/open/v1/book/search',
    data,
    method: 'post',
  })
}
