import ajax from '../../common/ajax'
import { terminal } from '../../../api'

export function create(data) {
  return ajax({
    url: terminal.create,
    data,
    method: 'post',
  })
}

export function update(data) {
  return ajax({
    url: terminal.update,
    data,
    method: 'post',
  })
}

export function findAll() {
  return ajax({
    url: terminal.findAll,
    method: 'get',
  })
}

export function findOne() {
  return ajax({
    url: terminal.findOne,
    method: 'get',
  })
}

export function remove(data) {
  return ajax({
    url: terminal.remove,
    data,
    method: 'get',
  })
}
