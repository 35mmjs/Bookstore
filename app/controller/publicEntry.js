const { Controller } = require('egg')

class PublicEntryController extends Controller {
  index() {
    const { ctx } = this
    const loginUser = ctx.getLoginUser()
    ctx.render('layout/layout.html', {
      entry: 'admin',
      appData: {
        loginUser,
      },
    })
  }
}

module.exports = PublicEntryController
