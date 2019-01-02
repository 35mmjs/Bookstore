const { Controller } = require('egg')

class PageController extends Controller {
  async pubuPage() {
    const { ctx } = this
    const { clientId, orgId } = ctx.query

    await ctx.render('layout/pwa.html', {
      entry: 'pubu',
      appData: {
        clientId,
        orgId,
      },
      mainfest: '/public/pubu/manifest.json',
    })
  }

  async zhantaiPage() {
    const { ctx } = this
    const { client, clientId, orgId } = ctx.query

    await ctx.render('layout/pwa.html', {
      entry: 'zhantai',
      appData: {
        clientId: client || clientId,
        orgId,
      },
      mainfest: '/public/zhantai/manifest.json',
    })
  }

  async daoshiPage() {
    const { ctx } = this
    const { location, orgId, clientId } = ctx.query

    await ctx.render('layout/pwa.html', {
      entry: 'daoshi',
      appData: {
        location,
        orgId,
        clientId,
      },
      mainfest: '/public/daoshi/manifest.json',
    })
  }
}

module.exports = PageController
