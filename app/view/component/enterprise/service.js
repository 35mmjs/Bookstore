import ajax from '../../common/ajax'

export function create(data) {
  return ajax({
    url: '/enterprise/create.json',
    data,
    method: 'post',
  })
}

export function findAll() {
  return ajax({
    url: '/enterprise/findAll.json',
    method: 'get',
  })
}
