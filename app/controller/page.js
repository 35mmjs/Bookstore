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

  async paihangPage() {
    const { ctx } = this
    const { channelId, orgId, clientId, padId } = ctx.query

    await ctx.render('layout/pwa.html', {
      entry: 'paihang',
      appData: {
        padId,
        channelId,
        clientId,
        orgId,
      },
      mainfest: '/public/paihang/manifest.json',
    })
  }

  async paihangpadPage() {
    const { ctx } = this
    const { channelId, orgId, clientId, rankId } = ctx.query

    await ctx.render('layout/pwa.html', {
      entry: 'paihangPad',
      appData: {
        rankId,
        channelId,
        clientId,
        orgId,
      },
      mainfest: '/public/paihang/manifest.json',
    })
  }
}

module.exports = PageController
