const { Controller } = require('egg')

class UserController extends Controller {
  async login() {
    const { ctx } = this
    await ctx.render('layout/layout.html', { entry: 'admin' })
  }
}

module.exports = UserController
