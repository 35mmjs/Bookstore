const { Controller } = require('egg')

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
  async getPubu() {
    // const request = this.ctx.params
    const item = await this.ctx.service.openApi.getPubu(3)
    const payloadStr = item.content || '{}'
    const payloadObj = JSON.parse(payloadStr)
    const result = {
      id: item.id,
      type: item.type,
      note: item.note,
      books: payloadObj.books || {},
      banner: {
        src: payloadObj.banner,
      },
    }

    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async findBookByISBN() {
    const { params } = this.ctx
    const { isbn } = params
    const res = await this.ctx.service.bookAPI.getBookByISBN(isbn)
    const processedResult = {
      cover: res.fmdt,
      isbn: res.isbn,
      name: res.sm,
      author: res.author,
      catalog: res.yxxlmc,
      price: res.edj,
      pricing: '',
      recommender: '',
      intro: res.tjy,
      pageType: res.kb,
      pageNum: res.ys,
      publish: res.bb,
      version: '',
      bookshelf: '',
      qrcode: '',
    }
    this.ctx.body = {
      success: true,
      data: processedResult,
    }
  }

  async remove() {
    const request = this.ctx.request.body
    const result = await this.ctx.service.enterprise.remove(request.id)
    console.log('aaaaaaaa', request)
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
