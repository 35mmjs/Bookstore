const { Controller } = require('egg')

class PageController extends Controller {
  async pubuPage() {
    const { ctx } = this
    await ctx.render('layout/pwa.html', {
      entry: 'pubu',
      appData: {},
      mainfest: '/public/pubu/manifest.json',
    })
  }

  async zhantaiPage() {
    const { ctx } = this
    const { client } = ctx.query

    await ctx.render('layout/pwa.html', {
      entry: 'zhantai',
      appData: {
        client, 
      },
      mainfest: '/public/zhantai/manifest.json',
    })
  }

  async daoshiPage() {
    const { ctx } = this
    const { location } = ctx.query

    await ctx.render('layout/pwa.html', {
      entry: 'daoshi',
      appData: {
        location,
      },
      mainfest: '/public/daoshi/manifest.json',
    })
  }
}

module.exports = PageController
