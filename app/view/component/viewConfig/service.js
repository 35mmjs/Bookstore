import ajax from '../../common/ajax'
import { viewConfig } from '../../../api'

export function create(data) {
  return ajax({
    url: viewConfig.create,
    data,
    method: 'post',
  })
}

export function findAll(data) {
  return ajax({
    url: viewConfig.findAll,
    data,
    method: 'get',
  })
}

export function findOne() {
  return ajax({
    url: viewConfig.findOne,
    method: 'get',
  })
}

export function remove(data) {
  return ajax({
    url: viewConfig.remove,
    data,
    method: 'get',
  })
}

export function update(data) {
  return ajax({
    url: viewConfig.update,
    data,
    method: 'post',
  })
}
