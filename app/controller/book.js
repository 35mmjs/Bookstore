const { Controller } = require('egg')

class BookController extends Controller {
  async index() {
    const { ctx } = this
    // const data = await ctx.service.users.find(33)
    await ctx.render('layout/layout.html', { entry: 'admin' })
  }
}
// 书籍搜索
// 详情接口
// 排行榜相关

module.exports = BookController
