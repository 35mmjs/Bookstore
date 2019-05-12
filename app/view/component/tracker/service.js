import ajax from '../../common/ajax'
import { tracker } from '../../../api'

export function findAll(data) {
  return ajax({
    url: tracker.findAll,
    data,
    method: 'get',
  })
}
