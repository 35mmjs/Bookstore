const { Controller } = require('egg')

function bookInfoMap(res) {
  const processedResult = {
    cover: res.fmdt,
    isbn: res.isbn,
    name: res.sm,
    author: res.author,
    catalog: res.yxxlmc,
    price: res.edj,
    pricing: res.dj,
    recommender: '',
    intro: res.tjy,
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
    const item1 = await this.getSingleChannel(7)
    const item2 = await this.getSingleChannel(8)
    const result = []
    result.push(item1)
    result.push(item2)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async findBookByISBN() {
    const { query } = this.ctx
    const { isbn } = query
    const res = await this.ctx.service.bookAPI.getBookByISBN(isbn)
    const processedResult = bookInfoMap(res)
    this.ctx.body = {
      success: true,
      data: processedResult,
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
