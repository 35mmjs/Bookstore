import ajax from '../../common/ajax'
import { viewConfig } from '../../../api'

export function create(data) {
  return ajax({
    url: viewConfig.create,
    data,
    method: 'post',
  })
}

export function findAll() {
  return ajax({
    url: viewConfig.findAll,
    method: 'get',
  })
}

export function remove(data) {
  return ajax({
    url: viewConfig.remove,
    data,
    method: 'post',
  })
}

export function update(data) {
  return ajax({
    url: viewConfig.update,
    data,
    method: 'post',
  })
}

