import ajax from '../../common/ajax'
import { user } from '../../../api'

export function create(data) {
  return ajax({
    url: user.create,
    data,
    method: 'post',
  })
}

export function findAll() {
  return ajax({
    url: user.findAll,
    method: 'get',
  })
}

export function remove(data) {
  return ajax({
    url: user.remove,
    data,
    method: 'post',
  })
}

export function update(data) {
  return ajax({
    url: user.update,
    data,
    method: 'post',
  })
}
