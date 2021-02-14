const ms = require('ms')
const { Controller } = require('egg')

class DeviceListController extends Controller {
  async create() {
    const ctx = this.ctx
    // const { enterprise, store, url, type, play_time } = ctx.request.body
    const request = this.ctx.request.body
    const result = await ctx.service.deviceList.create(request)
    this.ctx.body = {
      success: true,
      data: result,
      message: '创建成功',
    }
  }

  async remove() {
    const request = this.ctx.request.body
    const result = await this.ctx.service.deviceList.remove(request.id)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async update() {
    const ctx = this.ctx
    const request = ctx.request.body
    const result = await this.ctx.service.deviceList.update(request)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }
}

module.exports = DeviceListController
