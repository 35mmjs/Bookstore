const { Controller } = require('egg')

class PageController extends Controller {
  async pubuPage() {
    const { ctx } = this
    const { clientId, orgId, view_config_id } = ctx.query

    await ctx.render('layout/pwa.html', {
      entry: 'pubu',
      appData: {
        clientId,
        orgId,
        view_config_id,
      },
      mainfest: '/public/pubu/manifest.json',
    })
  }

  async zhantaiPage() {
    const { ctx } = this
    const { client, clientId, orgId, view_config_id } = ctx.query

    await ctx.render('layout/pwa.html', {
      entry: 'zhantai',
      appData: {
        clientId: client || clientId,
        orgId,
        view_config_id,
      },
      mainfest: '/public/zhantai/manifest.json',
    })
  }

  async daoshiPage() {
    const { ctx } = this
    const { location, orgId, clientId, view_config_id } = ctx.query

    await ctx.render('layout/pwa.html', {
      entry: 'daoshi',
      appData: {
        location,
        orgId,
        clientId,
        view_config_id,
      },
      mainfest: '/public/daoshi/manifest.json',
    })
  }

  async paihangPage() {
    const { ctx } = this
    const { navId, orgId, clientId, padId, view_config_id } = ctx.query

    await ctx.render('layout/pwa.html', {
      entry: 'paihang',
      appData: {
        padId,
        navId,
        clientId,
        orgId,
        view_config_id,
      },
      mainfest: '/public/paihang/manifest.json',
    })
  }

  async newpaihangPage() {
    const { ctx } = this
    const { navId, orgId, clientId, padId, view_config_id } = ctx.query

    await ctx.render('layout/pwa.html', {
      entry: 'newpaihang',
      appData: {
        padId,
        navId,
        clientId,
        orgId,
        view_config_id,
      },
      mainfest: '/public/paihang/manifest.json',
    })
  }

  async paihangpadPage() {
    const { ctx } = this
    const { navId, orgId, clientId, rankId } = ctx.query

    await ctx.render('layout/pwa.html', {
      entry: 'paihangPad',
      appData: {
        rankId,
        navId,
        clientId,
        orgId,
      },
      mainfest: '/public/paihang/manifest.json',
    })
  }
}

module.exports = PageController
