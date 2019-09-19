import ajax from '../../common/ajax'
import { ads } from '../../../api'

export function create(data) {
  return ajax({
    url: ads.create,
    data,
    method: 'post',
  })
}

export function findAll(data) {
  return ajax({
    url: ads.findAll,
    data,
    method: 'post',
  })
}

export function remove(data) {
  return ajax({
    url: ads.remove,
    data,
    method: 'post',
  })
}

export function update(data) {
  return ajax({
    url: ads.update,
    data,
    method: 'post',
  })
}
