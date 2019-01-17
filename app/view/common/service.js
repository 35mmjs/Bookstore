import ajax from './ajax'
import { terminalType, common } from '../../api'

export function findTerminalType(data) {
  return ajax({
    url: terminalType.findAll,
    data,
    method: 'get',
  })
}

export function getOssToken(data) {
  return ajax({
    url: common.getOssToken,
    data,
    method: 'get',
  })
}
