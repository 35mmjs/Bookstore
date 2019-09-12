const ms = require('ms')
const { Controller } = require('egg')

class AdsController extends Controller {
  async create() {
    const ctx = this.ctx
    // const { enterprise, store, url, type, play_time } = ctx.request.body
    const request = this.ctx.request.body
    const user = this.ctx.session.user
    if (user && user.store) {
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

  async findAll() {
    // const request = this.ctx.params
    const result = await this.ctx.service.ads.findAll()
    const user = this.ctx.session.user
    if (user && (user.isEnterpriseUser || user.isAdmin) && user.enterprise) {
      this.ctx.body = {
        success: true,
        data: result.filter(n => n.enterprise === user.enterprise && (user.store ? user.store === n.store : true)),
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
      data: user ? result.filter(n => n.id === user.id) : [],
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
    const result = await this.ctx.service.ads.update(id, store_list)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }
}

module.exports = AdsController
