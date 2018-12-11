const { Controller } = require('egg')

class ViewConfigController extends Controller {
  // post
  async create() {
    const request = this.ctx.request.body
    const result = await this.ctx.service.viewConfig.create(request)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  // get
  async findAll() {
    // const request = this.ctx.params
    const result = await this.ctx.service.viewConfig.findAll()
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async remove() {
    const request = this.ctx.request.body
    const result = await this.ctx.service.viewConfig.remove(request.id)
    console.log('aaaaaaaa', request)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async update() {
    const request = this.ctx.request.body
    const result = await this.ctx.service.viewConfig.create(request.name, request.password)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }
}

module.exports = ViewConfigController
