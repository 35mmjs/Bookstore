const { Controller } = require('egg')

class PageController extends Controller {
  async pubuPage() {
    const { ctx } = this
    await ctx.render('layout/pwa.html', {
      entry: 'pubu',
      appData: {},
    })
  }
}

module.exports = PageController
