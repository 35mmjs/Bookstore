const { Controller } = require('egg')

class TrackerController extends Controller {
  /**
   * query { type, terminalName }
   */
  async findAll() {
    // const request = this.ctx.params
    const { query } = this.ctx
    const userInfo = this.ctx.getLoginUser()
    const { isAdmin } = userInfo
    // 判断是否管理员
    if (isAdmin) {
      query.isAdmin = true
    } else {
      query.store = this.ctx.getLoginStore()
      query.isAdmin = false
    }
    const result = await this.ctx.service.tracker.findAll(query)
    if (result && result.length > 0) {
      this.ctx.body = {
        success: true,
        data: {
          items: result,
        },
      }
    } else {
      this.ctx.body = {
        success: true,
        data: {
        },
      }
    }
  }
}

module.exports = TrackerController
