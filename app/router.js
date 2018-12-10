'use strict'

const { enterprise } = require('./api/index')

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
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
  router.post('/enterprise/create.json', controller.enterprise.create)
  router.get(enterprise.findAll, controller.enterprise.findAll)
  router.post(enterprise.remove, controller.enterprise.remove)
  router.post(enterprise.update, controller.enterprise.update)
  // router.get('common/generateToken.json', controller)
}
