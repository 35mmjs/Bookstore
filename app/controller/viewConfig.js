const { Controller } = require('egg')

class ViewConfigController extends Controller {
  // post
  async create() {
    const request = this.ctx.request.body
    request.store = this.ctx.getLoginStore()
    const result = await this.ctx.service.viewConfig.create(request)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  // get
  async findAll() {
    const { query } = this.ctx
    query.store = this.ctx.getLoginStore()
    const result = await this.ctx.service.viewConfig.findAll(query)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  // get
  async findOne() {
    // const request = this.ctx.params
    const request = this.ctx.query
    const { id } = request
    const result = await this.ctx.service.viewConfig.findOne(id)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async remove() {
    const request = this.ctx.request.query
    const result = await this.ctx.service.viewConfig.remove(request.id)
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
