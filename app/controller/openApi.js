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
      banner: payloadObj.banner || '',
    }

    this.ctx.body = {
      success: true,
      data: result,
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
