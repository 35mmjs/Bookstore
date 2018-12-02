const { Controller } = require('egg')

class UserController extends Controller {
  async login() {
    const request = this.ctx.request.body
    // const result = await this.ctx.service.admins.create(request.username, request.password)
    this.ctx.body = {
      success: true,
      data: request,
    }
  }
  create() {
    const request = this.ctx.request.body
    // const result = await this.ctx.service.admins.create(request.username, request.password)
    this.ctx.body = {
      success: true,
      data: request,
    }
  }
}

module.exports = UserController
