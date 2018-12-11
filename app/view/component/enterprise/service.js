import ajax from '../../common/ajax'
import { enterprise } from '../../../api'

export function create(data) {
  return ajax({
    url: enterprise.create,
    data,
    method: 'post',
  })
}

export function findAll() {
  return ajax({
    url: enterprise.findAll,
    method: 'get',
  })
}

export function remove(data) {
  return ajax({
    url: enterprise.remove,
    data,
    method: 'post',
  })
}

export function update(data) {
  return ajax({
    url: enterprise.update,
    data,
    method: 'post',
  })
}
