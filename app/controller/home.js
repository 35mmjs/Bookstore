const { Controller } = require('egg')

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    // const data = await ctx.service.users.find(33)
    await ctx.render('layout/layout.html', { entry: 'admin' })
  }
}

module.exports = HomeController
