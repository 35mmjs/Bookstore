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
      par_value: JSON.stringify(data),
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
          const ret = JSON.parse(result.sv_serviceReturn.$value)
          if (ret.code === '200' || ret.code === '000') {
            resolve(ret.data)
          } else {
            reject(ret)
          }
        })
      })
    })
  }

  /**
   * 获取排行榜分类列表
   * @param khbh {String} - 客户编号，如果不传入则代表使用全省通用排行, 如果传入则代表单店排行
   * @return {Array}
   *  - phid {String} 排行ID
   *  - phmc {phmc} 排行名称
   */
  getRinkingList(khbh) {
    return this.fetch('GetRinkingInfo', { khbh: khbh || '3300000000', lx: 'list' })
  }

  /**
   * 获取排行分类的详细信息
   * @param phid {String} - 排行ID，由getRinkingList列表获取
   * @param khbh {String} - 客户编号，如果不传入则代表使用全省通用排行, 如果传入则代表单店排行
   * @return {Array}
   *  - phid 排行id
   *  - phmc 排行名称
   *  - xh 排行序号
   *  - tm 条码/ISBN
   *  - spbs 商品标识
   *  - sm 书名
   *  - dj 定价
   */
  getRinkingInfo(phid, khbh) {
    return this.fetch('GetRinkingInfo', { khbh: khbh || '3300000000', phid, lx: 'detailed' })
  }

  /**
   * 根据书号获取书的详细信息
   * @param ISBN {String} - 书号
   * @return {Object}
   *  - spbs 浙江新华图书商品的唯一标识
   *  - sm 书名
   *  - di 定价
   *  - isbn 书号
   *  - zyz 作者
   *  - fmtp 封面图片
   */
  getBookByISBN(ISBN) {
    return this.fetch('itemInfoSearch', { params: { type: 'ISBN', value: ISBN } }).then(d => JSON.parse(d)[0])
  }
}

module.exports = BookAPIService
