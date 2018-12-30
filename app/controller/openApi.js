const { Controller } = require('egg')
const { bookInfoMap } = require('../common/bizHelper')

function pubuMap(item) {
  const resArray = []
  const payloadStr = item.content || '{}'
  const payloadArray = JSON.parse(payloadStr)
  if (payloadArray && payloadArray.length > 0) {
    payloadArray.forEach(data => {
      const singlePubu = {
        books: data.books,
        banner: {
          src: data.banner ? data.banner.url : '',
        },
        channel: data.channel,
      }
      resArray.push(singlePubu)
    })
  }
  return resArray
}

function zhantaiMap(item) {
  let res = {}
  const payloadStr = item.content || '{}'
  const payloadArray = JSON.parse(payloadStr)
  if (payloadArray && payloadArray.length > 0) {
    const data = payloadArray[0]
    res = {
      id: item.id,
      type: item.type,
      name: item.name,
      note: item.note,
      books: data.books,
    }
  }
  return res
}

function bookInfoListProcess(list) {
  if (!list || list.length <= 0) return []
  const res = list.map(item => {
    return bookInfoMap(item)
  })
  return res
}
class OpenApiController extends Controller {
  // post
  async create() {
    const request = this.ctx.request.body
    const result = await this.ctx.service.enterprise.create(request.name)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async getPubu() {
    const query = this.ctx.query
    const { clientId, orgId } = query
    const item = await this.ctx.service.openApi.findViewConfigByStoreAndTerminal(
      '',
      clientId,
    )
    const resArray = pubuMap(item)
    this.ctx.body = {
      success: true,
      data: resArray,
    }
  }

  async getDaoshi() {
    const query = this.ctx.query
    const { clientId, orgId } = query
    const item = await this.ctx.service.openApi.findViewConfigByStoreAndTerminal(
      '',
      clientId,
    )
    const result = zhantaiMap(item)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async findBook() {
    let res = ''
    const { query } = this.ctx
    const { isbn, spbs } = query
    if (isbn) {
      res = await this.ctx.service.bookAPI.getBookByISBN(isbn)
    }
    if (spbs) {
      res = await this.ctx.service.bookAPI.getBookBySPBS(spbs)
    }
    const processedResult = bookInfoMap(res)
    this.ctx.body = {
      success: true,
      data: processedResult,
    }
  }

  /**
   * 推荐相关
   [ { dj: '10',
    phid: '00000212',
    phmc: '12月政治法律TOP10',
    sm: '2018年党员学习参考',
    spbs: '4204543',
    tm: '9787213088032',
    xh: '1' },
  { dj: '29',
    phid: '00000212',
    phmc: '12月政治法律TOP10',
    sm: '习近平新时代中国特色社会主义思想三十讲',
    spbs: '4164039',
    tm: '9787514708547',
    xh: '2' }]
    return [{
      price // 定价
      name // 书名
      isbn // 书号
    }]
   */
  async findRecommend() {
    let list = []
    let res = null
    let rawList = []
    const param = this.ctx.query
    const { isbn, spbs } = param
    if (isbn) {
      res = await this.ctx.service.bookAPI.getBookByISBN(isbn)
      const { spbs: bookSpbs } = res
      if (bookSpbs) {
        rawList = await this.ctx.service.bookAPI.getRecommendBooks(bookSpbs)
      }
    }
    if (spbs) {
      rawList = await this.ctx.service.bookAPI.getRecommendBooks(spbs)
    }
    if (rawList && rawList.length > 0) {
      list = await Promise.all(
        rawList.map(async item => {
          // const singleBook = await this.ctx.service.bookAPI.getBookBySPBS(item.spbs)
          const singleBook = await this.ctx.service.bookAPI.getBookByISBN(
            item.tm,
          )
          return bookInfoMap(singleBook)
        }),
      )
      this.ctx.body = {
        success: true,
        data: list,
      }
    } else {
      this.ctx.body = {
        success: true,
        data: '',
      }
    }
  }

  async findBooksByKeyword() {
    const { query } = this.ctx
    const { keyword } = query
    let processedResult = []
    const res = await this.ctx.service.bookAPI.searchBookByKeyword(keyword, '')
    if (res && res.length > 0) {
      processedResult = bookInfoListProcess(res)
    }
    this.ctx.body = {
      success: true,
      data: processedResult,
    }
  }

  async findBooksByName() {
    const { query } = this.ctx
    const { keyword } = query
    let processedResult = []
    const res = await this.ctx.service.bookAPI.searchBookByName(keyword, '')
    if (res && res.length > 0) {
      processedResult = bookInfoListProcess(res)
    }
    this.ctx.body = {
      success: true,
      data: processedResult,
    }
  }

  async getZhantai() {
    const query = this.ctx.query
    const { clientId, orgId } = query
    const item = await this.ctx.service.openApi.findViewConfigByStoreAndTerminal(
      '',
      clientId,
    )
    const result = zhantaiMap(item)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }
}

module.exports = OpenApiController
