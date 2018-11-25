const { Controller } = require('egg')

class HomeController extends Controller {
  async index() {
    const { ctx } = this
    await ctx.render('layout/layout.html', { entry: 'home' })
  }
}

module.exports = HomeController
