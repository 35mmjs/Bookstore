import ajax from '../../common/ajax'

export function create(data) {
  return ajax({
    url: 'http://localhost:7001/enterprise/create.json',
    data,
    method: 'post',
  })
}

export function findAll() {
  return ajax({
    url: 'http://localhost:7001/enterprise/findAll.json',
    method: 'get',
  })
}
