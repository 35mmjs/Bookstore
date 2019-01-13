import ajax from './ajax'
import { terminalType } from '../../api'

export function findTerminalType(data) {
  return ajax({
    url: terminalType.findAll,
    data,
    method: 'get',
  })
}
