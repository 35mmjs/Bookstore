const { Service } = require('egg')
const crypto = require('crypto')
const soap = require('soap')
const { omit } = require('../common/utils')
const CommonError = require('../common/CommonError')

const md5 = text => {
  return crypto.createHash('md5').update(String(text)).digest('hex')
}

/**
 * 新华书店的API接口
 */
class BookAPIService extends Service {
  constructor(...args) {
    super(...args)
    this.bookConfig = this.app.config.bookAPI
  }

  getAPIType(){
    return 'zhejiang';
  }

  fetch(methodName, data) {
    const { bookConfig } = this
    const d = new Date()
    const month = String(d.getMonth() + 1)
    const md5key = `${bookConfig.khid}${bookConfig.keyid}${d.getFullYear()}${month.length === 1 ? `0${month}` : month}`
    // md5 cache
    if (!this.md5key || this.md5key !== md5key) {
      this.md5key = md5key
      this.md5value = md5(this.md5key)
    }
    const params = {
      appMethod: methodName,
      khid: bookConfig.khid,
      md5_value: this.md5value,
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
            // 统一上报异常接口
            reject(new CommonError(ret.msg || ret.message))
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
  getRankingList(khbh = '3300000000') {
    return this.fetch('GetRinkingInfo', { khbh, lx: 'list' })
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
   *  - ml 目录
   *  - tjy 简介
   */
  getRinkingInfo(phid, khbh = '3300000000') {
    return this.fetch('GetRinkingInfo', { khbh, phid, lx: 'detailed' })
  }

  async getRinkingInfoDetail(phid, khbh = '3300000000') {
    const list = await this.fetch('GetRinkingInfo', { khbh, phid, lx: 'detailed' })
    const detailList = await Promise.all(list.map(async item => {
      const detail = await this.getBookBySPBS(item.spbs)
      if (detail) return detail[0]
    }))
    return detailList
  }

  /**
   * 根据书号获取书的详细信息
   * @param ISBN {String} - 书号
   * @param khbh {String} - 客户编号
   * @return {Object}
   *  - spbs 浙江新华图书商品的唯一标识
   *  - sm 书名
   *  - di 定价
   *  - isbn 书号
   *  - zyz 作者
   *  - fmtp 封面图片
   *  - zbkc 总部库存
   *  - qrcode 购买链接，用于生成二维码
   */
  getBookByISBN(ISBN, khbh) {
    return this.getBook('ISBN', ISBN, khbh).then(d => d);
  }

  /**
   * 根据商品标识
   * @param SPBS
   * @param khbh
   * @return {Promise<T | never | never>}
   */
  getBookBySPBS(SPBS, khbh) {
    return this.getBook('SPBS', SPBS, khbh).then(d => d);
  }

  /**
   * 根据商品标识
   * @param SPBS list
   * @param khbh
   * @return {Promise<T | never | never>}
   */
  getBookListBySPBS(listArr, khbh) {
    const parse = d => {
      if (!d) return d
      return JSON.parse(d).map(item => Object.assign({}, item, {
        qrcode: `${this.bookConfig.buyUrl}?spbs=${item.spbs}&khbh=${khbh}`,
      }))
    }
    return this.fetch('itemInfoBySpbs', { params: listArr }).then(d => parse(d))
    // return this.getBook('SPBS', SPBS, khbh).then(d => d);
  }

  /**
   * 根据关键字查询，返回数组
   * @param keyword
   * @param khbh
   * @return {Array}
   */
  searchBookByKeyword(keyword, khbh) {
    return this.getBook('KEYWORD', keyword, khbh)
  }

  /**
   * 根据书名查询, 返回数组
   * @param bookname
   * @param khbh
   * @return {Array}
   */
  searchBookByName(bookname, khbh) {
    return this.getBook('SM', bookname, khbh)
  }

  /**
   * @param type {String} ISBN | SM | KEYWORD | SPBS
   * @param value {String} 对应的查询值
   * @param khbh {String} 客户编号
   * @return {Promise<T | never>}
   */
  getBook(type, value, khbh = '3300000000') {
    const parse = d => {
      if (!d) return d
      return JSON.parse(d).map(item => Object.assign({}, item, {
        qrcode: `${this.bookConfig.buyUrl}?spbs=${item.spbs}&khbh=${khbh}`,
      }))
    }
    return this.fetch('itemInfoSearch', { params: { type, value } }).then(d => parse(d))
  }

  /**
   * 获取推荐的书籍
   * @param spbs {String}
   * @param khbh
   */
  async getRecommendBooks(spbs, khbh = '3300000000') {
    let listArr = []
    const list = await this.fetch('GetRinkingInfo', { khbh, lx: 'recommend', spbs })
    if(list && list.length){
      list.map(item => {
        listArr.push({ spbs: item.spbs})
      })
    }
    return this.getBookListBySPBS(listArr,khbh)
    // return this.fetch('GetRinkingInfo', { khbh, lx: 'recommend', spbs })
  }

  /**
   * 根据人脸识别数据获取推荐的书籍
   * @param spbs {String}
   * @param khbh
   */
  async getFaceIdRecommendBooks(facedata, khbh = '3300000000') {
    let listArr = []
    const datastring = await this.fetch('GETBOOKRECOMMENDPEOPLE', JSON.parse(facedata))
    const data = JSON.parse(datastring)
    const list = data.rows
    if(list && list.length){
      list.map(item => {
        listArr.push({ spbs: item.prod_id})
      })
    }
    return this.getBookListBySPBS(listArr,khbh)
    // return this.fetch('GetRinkingInfo', { khbh, lx: 'recommend', spbs })
  }

  /**
   * 获取库存信息
   * @param kcdh {String} 库存店号
   * @param spbs {String} 商品标识
   * @param bmbh {Strig} 部门编号
   */
  async getStockList(kcdh, spbs, bmbh = '') {
    try {
      const data = await this.fetch('stock01', { kcdh, spbs, bmbh }).then(d => JSON.parse(d))
      let stockList = []
      data.mdkc.forEach((item) => {
        stockList = stockList.concat(...item.jwkcs.map(i => i.jwkc.map(j => Object.assign(j, omit(item, ['jwkcs'])))))
      })
      return stockList.map(item => {
        item.jwh = item.jwh.replace('架位号:', '')
        return item
      })
    } catch (e) {
      return []
    }
  }
}

module.exports = BookAPIService
