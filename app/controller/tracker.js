const { Controller } = require('egg')

class TrackerController extends Controller {
  /**
   * query { type, terminalName }
   */
  async findAll() {
    // const request = this.ctx.params
    const { query } = this.ctx
    const result = await this.ctx.service.enterprise.findAll()
    query.store = this.ctx.getLoginStore()
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
    this.ctx.validate('enterprise', request)
    const result = await this.ctx.service.enterprise.update(request.id, request.name)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }
}

module.exports = TrackerController
