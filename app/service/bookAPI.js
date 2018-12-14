const { Service } = require('egg')
const crypto = require('crypto')
const soap = require('soap')

const md5 = text => {
  return crypto.createHash('md5').update(String(text)).digest('hex')
}

class BookAPIService extends Service {
  constructor(...args) {
    super(...args)
    this.bookConfig = this.app.config.bookAPI
  }

  fetch(methodName, data) {
    const { bookConfig } = this
    const d = new Date()
    const params = {
      appMethod: methodName,
      khid: bookConfig.khid,
      md5_value: md5(`${bookConfig.khid}${bookConfig.keyid}${d.getFullYear()}${d.getMonth() + 1}`),
      par_type: 'json',
      par_value: JSON.stringify({ params: data }),
    }
    return new Promise((resolve, reject) => {
      soap.createClient(bookConfig.url, (err, client) => {
        if (err) {
          reject(err)
          return
        }
        client.sv_service(params, (err2, result) => {
          if (err2) {
            reject(err2)
            return
          }
          const ret = result.sv_serviceReturn.$value
          if (ret.code !== '200') {
            reject(ret)
          } else {
            resolve(ret)
          }
        })
      })
    })
  }

  /**
   * 排行榜查询
   */
  getRinkingInfo() {
    return this.fetch('GetRinkingInfo', { khbh: '3300000000', '1x': 'list' })
  }
}

module.exports = BookAPIService
