const { Controller } = require('egg')
const { ossInit } = require('../common/aliyun-oss')

class CommonController extends Controller {
  async index() {
    const { ctx } = this
    // const data = await ctx.service.users.find(33)
    await ctx.render('layout/layout.html', { entry: 'admin' })
  }

  async getOssToken() {
    const token = await ossInit()
    this.ctx.body = {
      success: true,
      data: token,
    }
  }
}

module.exports = CommonController
