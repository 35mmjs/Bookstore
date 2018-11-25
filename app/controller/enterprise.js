const { Controller } = require('egg')

class AdminController extends Controller {
  async index() {
    const { ctx } = this
    // const data = await ctx.service.admins.find(33)
    await ctx.render('layout/layout.html', { entry: 'admin' })
  }
  async create() {
    const request = this.ctx.request.body
    const result = await this.ctx.service.admins.create(request.name, request.password)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }
  async remove() {
    this.body = {
      success: true,
      data: 'ok',
    }
  }
  async update() {
    const request = this.ctx.request.body
    const result = await this.ctx.service.admins.create(request.name, request.password)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }
}

module.exports = AdminController
