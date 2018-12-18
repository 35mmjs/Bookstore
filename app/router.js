'use strict'

const {
  enterprise, viewConfig, openApi, book,
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
  // view config
  router.post(viewConfig.create, controller.viewConfig.create)
  router.get(viewConfig.findAll, controller.viewConfig.findAll)
  router.get(viewConfig.remove, controller.viewConfig.remove)
  router.get(viewConfig.findOne, controller.viewConfig.findOne)
  // book query
  router.get(book.findOneByISBN, controller.book.getBookByISBN)
  // open api
  router.get(openApi.pubu, controller.openApi.getPubu)
  router.get(openApi.findBookByISBN, controller.openApi.findBookByISBN)
  router.get(openApi.zhantai, controller.openApi.getZhantai)
  router.get(openApi.findBooksByKeyword, controller.openApi.findBooksByKeyword)
}
