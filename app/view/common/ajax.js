import { message } from 'antd'
import debug from 'debug'
import xhr from './xhr'

const ajaxDebug = debug('ajax')
// const isMock = process.env.MOCK
const isMock = false


/**
 * @param opts
 * @returns {Promise<any>}
 */
export default function ajax({ url, type = 'json', data = {}, method = 'get' }) {
  return new Promise((resolve, reject) => {
    if (data.type === 'jsonp') {
      /* eslint-disable no-underscore-dangle */
      data.data._t = Date.now()
    }
    return xhr({
      url: isMock ? `http://localhost:8989/mock${url}` : url,
      // url,
      type,
      method,
      data,
      success(json = {}) {
        if (json.success) {
          ajaxDebug('%c%s%c req:%o,res:%o', 'color:green', url, 'color: black', data, json.data)
          message.success(json.message || '请求成功')
          resolve(json.data)
        } else {
          ajaxDebug('%c%s%c req:%o,res:%o', 'color:red', url, 'color: black', data, json.data)
          reject(new Error(json.error))
        }
      },
      error() {
        message.error('系统异常, 操作失败')
        ajaxDebug('%c%s%c req:%o', 'color:red', url, 'color: black', data)
        reject(new Error('系统异常, 操作失败'))
      },
    })
  })
}
