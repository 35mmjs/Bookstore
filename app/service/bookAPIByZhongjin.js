const { Service } = require('egg')
const Client = require('aliyun-api-gateway').Client

/**
 * 中金的API接口
 */
class BookAPIByZhongjinService extends Service {
  constructor(...args) {
    super(...args)
    this.bookConfig = this.app.config.bookAPIByZhongjin
    this.client = new Client(this.bookConfig.appKey, this.bookConfig.appSecret)
  }

  async fetch(path, query) {
    const data = await this.client.get(`${this.bookConfig.url}${path}`, {
      data: query,
      headers: {
        accept: 'application/json',
      },
    })
    if (data.errCode !== 0) throw new Error(`[BookAPIByZhongjin] ${data.errMsg}`)
    return data.data
  }

  /**
   * 获取中金的门店排行
   * @param pageNnum {Number}
   * @param pageSize {Number}
   * @param storeId {String} 中金的门店id，如 3300000000330100000112
   */
  getStoreProdRank({ pageNum = 1, pageSize = 10, storeId }) {
    return this.fetch('/getStoreProdRank', { pageNum, pageSize, store_id: storeId })
  }
}

module.exports = BookAPIByZhongjinService
