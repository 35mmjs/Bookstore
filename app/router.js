'use strict'

const {
  enterprise, viewConfig, openApi, book, terminal, store,
  terminalType,
} = require('./api/index')

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  // client papes
  router.get('/page/pubu', controller.page.pubuPage)
  router.get('/page/zhantai', controller.page.zhantaiPage)
  router.get('/page/daoshi', controller.page.daoshiPage)
  // html pages
  router.get('/admin.html', controller.admin.index)
  router.get('/user/login.html', controller.user.loginPage)
  router.get('/user/createAdmin.html', controller.user.createAdminPage)
  // user
  router.post('/user/login.json', controller.user.login)
  router.post('/user/logout.json', controller.user.logout)
  router.post('/user/createAdmin.json', controller.user.createAdmin)
  router.post('/user/createUser.json', controller.user.createUser)
  // enterprise
  router.post(enterprise.create, controller.enterprise.create)
  router.get(enterprise.findAll, controller.enterprise.findAll)
  router.post(enterprise.remove, controller.enterprise.remove)
  router.post(enterprise.update, controller.enterprise.update)
  // 门店
  router.post(store.create, controller.store.create)
  router.get(store.findAll, controller.store.findAll)
  router.get(store.remove, controller.store.remove)
  router.post(store.update, controller.store.update)
  // view config
  router.post(viewConfig.create, controller.viewConfig.create)
  router.get(viewConfig.findAll, controller.viewConfig.findAll)
  router.get(viewConfig.remove, controller.viewConfig.remove)
  router.get(viewConfig.findOne, controller.viewConfig.findOne)
  // // 终端
  router.post(terminal.create, controller.terminal.create)
  router.post(terminal.update, controller.terminal.update)
  router.get(terminal.findAll, controller.terminal.findAll)
  router.get(terminal.remove, controller.terminal.remove)
  router.get(terminal.findOne, controller.terminal.findOne)
  // 终端类型
  router.get(terminalType.findAll, controller.terminalType.findAll)

  // book query
  router.get(book.findOneByISBN, controller.book.getBook)
  router.get(book.findOneByISBNs, controller.book.getBookByISBNs)
  router.get(book.findRankingListBySingleStore, controller.book.findRankingListBySingleStore)
  router.get(book.findRankingBooks, controller.book.findRankingBooks)
  // open api
  router.get(openApi.daoshi, controller.openApi.getDaoshi)
  router.get(openApi.pubu, controller.openApi.getPubu)
  router.get(openApi.findBookByISBN, controller.openApi.findBook)
  router.get(openApi.findBookBySPBS, controller.openApi.findBook)
  router.get(openApi.zhantai, controller.openApi.getZhantai)
  router.get(openApi.findBooksByKeyword, controller.openApi.findBooksByKeyword)
  router.get(openApi.findRecommendByISBN, controller.openApi.findRecommend)
  router.get(openApi.findRecommendBySPBS, controller.openApi.findRecommend)
  router.get(openApi.getStockInfo, controller.openApi.getStockInfo)
}
