'use strict'

const {
  enterprise, viewConfig, openApi, book, terminal, store,
  terminalType, user, ads, common, publicEntry, tracker,
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
  router.get('/page/paihang', controller.page.paihangPage)
  router.get('/page/paihangpad', controller.page.paihangpadPage)
  // html pages
  router.get('/', controller.admin.index)
  router.get('/admin.html', controller.admin.index)
  router.get('/user/login.html', controller.user.loginPage)
  router.get('/user/createAdmin.html', controller.user.createAdminPage)
  // user
  router.post('/user/login.json', controller.user.login)
  router.post('/user/logout.json', controller.user.logout)
  router.post('/user/changeEnterpriseByAdmin.json', controller.user.changeEnterpriseByAdmin)
  router.post('/user/changeStore.json', controller.user.changeStore)
  router.post('/user/createAdmin.json', controller.user.createAdmin)
  router.post(user.create, controller.user.create)
  router.get(user.findAll, controller.user.findAll)
  router.post(user.remove, controller.user.remove)
  router.post(user.update, controller.user.update)
  // enterprise
  router.post(enterprise.create, controller.enterprise.create)
  router.get(enterprise.findAll, controller.enterprise.findAll)
  router.post(enterprise.remove, controller.enterprise.remove)
  router.post(enterprise.update, controller.enterprise.update)
  // 门店
  router.post(store.create, controller.store.create)
  router.get(store.findAll, controller.store.findAll)
  router.get(store.remove, controller.store.remove)
  router.get(store.findByEnterprise, controller.store.findByEnterprise)
  router.post(store.update, controller.store.update)
  // 广告中心
  router.post(ads.create, controller.ads.create)
  router.post(ads.findAll, controller.ads.findAll)
  router.post(ads.remove, controller.ads.remove)
  // router.get(ads.findByEnterprise, controller.ads.findByEnterprise)
  router.post(ads.update, controller.ads.update)
  // view config
  router.post(viewConfig.create, controller.viewConfig.create)
  router.post(viewConfig.update, controller.viewConfig.update)
  router.get(viewConfig.findAll, controller.viewConfig.findAll)
  router.get(viewConfig.remove, controller.viewConfig.remove)
  router.get(viewConfig.findOne, controller.viewConfig.findOne)
  // 终端
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
  router.get(common.getOssToken, controller.common.getOssToken)
  // open api
  router.get(openApi.daoshi, controller.openApi.getDaoshi)
  router.get(openApi.pubu, controller.openApi.getPubu)
  router.get(openApi.findBookByISBN, controller.openApi.findBook)
  router.get(openApi.findBookBySPBS, controller.openApi.findBook)
  router.get(openApi.zhantai, controller.openApi.getZhantai)
  router.get(openApi.findBooksByKeyword, controller.openApi.findBooksByKeyword)
  router.get(openApi.findRecommendByISBN, controller.openApi.findRecommend)
  router.get(openApi.findRecommendBySPBS, controller.openApi.findRecommend)
  // 排行榜 api
  router.get(openApi.paihang, controller.openApi.getPaihang)
  router.get(openApi.findPaihangCatalog, controller.openApi.findPaihangCatalog)
  router.get(openApi.updatePaihang, controller.openApi.updatePaihang)
  router.get(openApi.findPaihangPadDetail, controller.openApi.findPaihangPadDetail)
  // 埋点相关
  router.get(openApi.tracker, controller.openApi.setTracker)
  // 终端元数据
  router.get(openApi.findTerminal, controller.openApi.findTerminal)
  // public entry
  router.get(publicEntry.entry, controller.publicEntry.index)
  // 埋点数据展示
  router.get(tracker.findAll, controller.tracker.findAll)
}
