import ajax from '../../common/ajax'
import { viewConfig, book } from '../../../api'

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

export function findOne() {
  return ajax({
    url: viewConfig.findOne,
    method: 'get',
  })
}

export function findBookByISBN(data) {
  return ajax({
    url: book.findOneByISBN,
    method: 'get',
    data,
  })
}
