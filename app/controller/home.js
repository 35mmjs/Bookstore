const Controller = require('egg').Controller

class HomeController extends Controller {
  async index() {
    await this.ctx.render('layout/layout.html', { entry: 'home' })
  }
}

module.exports = HomeController
