const { Controller } = require('egg')

class AdminController extends Controller {
  index() {
    const { ctx } = this
    const loginUser = ctx.getLoginUser()
    ctx.render('layout/layout.html', {
      entry: 'admin',
      appData: {
        loginUser,
      },
    })
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
}

module.exports = AdminController
