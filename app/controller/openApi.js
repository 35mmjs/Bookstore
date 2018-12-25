const { Controller } = require('egg')

function bookInfoMap(res) {
  const processedResult = {
    cover: res.fmdt,
    isbn: res.isbn,
    name: res.sm,
    author: res.author,
    catalog: res.yxxlmc, // 分类
    toc: res.ml, // 目录,
    price: res.edj,
    catalog: res.yxxlmc,
    price: res.dj,
    pricing: res.dj,
    recommender: res.tjy, // 推荐语
    intro: res.tjy, // 介绍
    pageType: res.kb,
    pageNum: res.ys,
    publish: res.bb,
    version: '',
    bookshelf: '',
    qrcode: res.qrcode,
  }
  return processedResult
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

  /**
   */
  async getSingleChannel(id) {
    const item = await this.ctx.service.openApi.getPubu(id)
    const payloadStr = item.content || '{}'
    const payloadObj = JSON.parse(payloadStr)
    const singleChannel = {
      id: item.id,
      type: item.type,
      note: item.note,
      books: payloadObj.books || {},
      banner: {
        src: payloadObj.banner,
      },
    }
    return singleChannel
  }

  async getPubu() {
    // const request = this.ctx.params
    const item1 = await this.getSingleChannel(1)
    const item2 = await this.getSingleChannel(2)
    const item3 = await this.getSingleChannel(3)
    const item4 = await this.getSingleChannel(4)
    const result = []
    result.push(item1)
    result.push(item2)
    result.push(item3)
    result.push(item4)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async getDaoshi() {
    // const { query } = this.ctx
    // const {} = query
    // const res = a
    // const request = this.ctx.params
    const item = await this.ctx.service.openApi.getPubu(3)
    const payloadStr = item.content || '{}'
    const payloadObj = JSON.parse(payloadStr)
    const result = {
      id: item.id,
      type: item.type,
      note: item.note,
      books: payloadObj.books || {},
    }

    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async findBookByISBN() {
    const { query } = this.ctx
    const { isbn } = query
    const res = await this.ctx.service.bookAPI.getBookByISBN(isbn)
    // const processedResult = bookInfoMap(res)
    console.log('aaaaaaaa', res)
    this.ctx.body = {
      success: true,
      data: res,
      // data: processedResult,
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
  async findRecommendByISBN() {
    let list = []
    const param = this.ctx.query
    const { isbn } = param
    const res = await this.ctx.service.bookAPI.getBookByISBN(isbn)
    const { spbs } = res
    console.log('aaaaaaaa', spbs)
    if (spbs) {
      const rawList = await this.ctx.service.bookAPI.getRecommendBooks(spbs)
      console.log('aaaaaaaa', rawList)
      if (rawList && rawList.length > 0) {
        list = rawList.map(item => {
          return {
            price: item.dj,
            name: item.sm,
            isbn: item.tm,
          }
        })
      }
      this.ctx.body = {
        success: true,
        data: list,
      }
    } else {
      this.ctx.body = { success: true, data: '' }
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
    // const { query } = this.ctx
    // const {} = query
    // const res = a
    // const request = this.ctx.params
    const item = await this.ctx.service.openApi.getPubu(3)
    const payloadStr = item.content || '{}'
    const payloadObj = JSON.parse(payloadStr)
    const result = {
      id: item.id,
      type: item.type,
      note: item.note,
      books: payloadObj.books || {},
    }

    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async remove() {
    const request = this.ctx.request.body
    const result = await this.ctx.service.enterprise.remove(request.id)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async update() {
    const request = this.ctx.request.body
    const result = await this.ctx.service.enterprise.create(
      request.name,
      request.password,
    )
    this.ctx.body = {
      success: true,
      data: result,
    }
  }
}

module.exports = OpenApiController
