import ajax from '../../common/ajax'
import { store } from '../../../api'

export function create(data) {
  return ajax({
    url: store.create,
    data,
    method: 'post',
  })
}

export function update(data) {
  return ajax({
    url: store.update,
    data,
    method: 'post',
  })
}

export function findAll(data) {
  return ajax({
    url: store.findAll,
    data,
    method: 'get',
  })
}

export function findByEnterprise({ enterprise }) {
  return ajax({
    url: store.findByEnterprise,
    data: { enterprise },
    method: 'get',
  }).then(d => d.items)
}

export function findOne() {
  return ajax({
    url: store.findOne,
    method: 'get',
  })
}

export function remove(data) {
  return ajax({
    url: store.remove,
    data,
    method: 'get',
  })
}

export function changeStoreById(storeId) {
  return ajax({
    url: '/user/changeStore.json',
    data: { store: storeId },
    method: 'post',
  })
}
