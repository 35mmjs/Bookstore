const { Controller } = require('egg')

class EnterpriseController extends Controller {
  // post
  async create() {
    const request = this.ctx.request.body
    this.ctx.validate('enterprise', request)
    const result = await this.ctx.service.enterprise.create(request.name)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  // get
  async findAll() {
    // const request = this.ctx.params
    const result = await this.ctx.service.enterprise.findAll()
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
    this.ctx.validate('enterprise', request)
    const result = await this.ctx.service.enterprise.update(request.id, request.name)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }
}

module.exports = EnterpriseController
