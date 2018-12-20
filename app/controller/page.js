const { Controller } = require('egg')

class PageController extends Controller {
  async pubuPage() {
    const { ctx } = this
    await ctx.render('layout/pwa.html', {
      entry: 'pubu',
      appData: {},
      mainfest: '/public/pubu/mainfest.json',
    })
  }

  async zhantaiPage() {
    const { ctx } = this
    await ctx.render('layout/pwa.html', {
      entry: 'zhantai',
      appData: {},
      mainfest: '/public/zhantai/mainfest.json',
    })
  }

  async daoshiPage() {
    const { ctx } = this
    await ctx.render('layout/pwa.html', {
      entry: 'daoshi',
      appData: {},
      mainfest: '/public/daoshi/mainfest.json',
    })
  }
}

module.exports = PageController
