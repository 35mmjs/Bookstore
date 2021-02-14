const { Controller } = require('egg')

class StoreController extends Controller {
  // post
  async create() {
    const request = this.ctx.request.body
    request.enterprise = this.ctx.getLoginEnterprise()
    const result = await this.ctx.service.store.create(request)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  // get
  async findAll() {
    const enterprise = this.ctx.getLoginEnterprise()
    const result = await this.ctx.service.store.findAll({
      enterprise,
    })
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async findByEnterprise() {
    const { enterprise } = this.ctx.query
    const result = await this.ctx.service.store.findAll({
      enterprise,
    })
    this.ctx.body = {
      success: true,
      data: result,
    }
  }
  // get
  async findOne() {
    const query = this.ctx.query
    const { id } = query
    const result = await this.ctx.service.store.findOne(id)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async remove() {
    const query = this.ctx.query
    const { id } = query
    const result = await this.ctx.service.store.remove(id)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async update() {
    const request = this.ctx.request.body
    const result = await this.ctx.service.store.update(request)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }
}

module.exports = StoreController
