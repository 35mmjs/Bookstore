const ms = require('ms')
const { Controller } = require('egg')

class AdsController extends Controller {
  async create() {
    const ctx = this.ctx
    // const { enterprise, store, url, type, play_time } = ctx.request.body
    const request = this.ctx.request.body
    const user = this.ctx.session.user
    let isStore = false
    if (user && user.store) {
      if (user.store === 'all') {
      } else {
        isStore = true
      }
    }
    if (isStore) {
      request.store = user.store
    } else if (user && user.enterprise) {
      request.enterprise = user.enterprise
    }
    const result = await ctx.service.ads.create(request)
    this.ctx.body = {
      success: true,
      data: result,
      message: '创建成功',
    }
  }

  async findOneByEIdCd() {
    const request = this.ctx.request.body
    const user = this.ctx.session.user
    request.orgId = user.enterprise
    request.clientId = user.store
    const result = await this.ctx.service.ads.findOneByEIdCd(request)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async findAll() {
    const request = this.ctx.request.body
    const enterprise = this.ctx.getLoginEnterprise()
    const result = await this.ctx.service.ads.findAll(request)
    const user = this.ctx.session.user
    let isStore = false
    if (user && user.store) {
      if (user.store === 'all') {
      } else {
        isStore = true
      }
    }
    // console.log('isStore:'+isStore)
    // console.log(result)
    if (isStore) {
      let list1 = result.filter(n => n.enterprise === user.enterprise ) || []
      let list2 = result.filter(n => n.store === user.store) || []
      this.ctx.body = {
        success: true,
        data: list1.concat(list2),
      }
      return
    }
    if (user && (user.isEnterpriseUser || user.isAdmin) && user.enterprise) {
      this.ctx.body = {
        success: true,
        data: result.filter(n => n.enterprise === user.enterprise ),
      }
      return
    }
    if (user && user.isAdmin) {
      this.ctx.body = {
        success: true,
        data: result,
      }
      return
    }
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async remove() {
    const request = this.ctx.request.body
    const result = await this.ctx.service.ads.remove(request.id)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async update() {
    const ctx = this.ctx
    const { id, store_list } = ctx.request.body
    const result = await this.ctx.service.ads.update(ctx.request.body)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }
}

module.exports = AdsController
