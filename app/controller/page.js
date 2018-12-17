const { Controller } = require('egg')

class PageController extends Controller {
  async pubuPage() {
    const { ctx } = this
    await ctx.render('layout/pwa.html', {
      entry: 'pubu',
      appData: {},
    })
  }

  async zhantaiPage() {
    const { ctx } = this
    await ctx.render('layout/pwa.html', {
      entry: 'zhantai',
      appData: {},
    })
  }

  async daoshiPage() {
    const { ctx } = this
    await ctx.render('layout/pwa.html', {
      entry: 'daoshi',
      appData: {},
    })
  }
}

module.exports = PageController
