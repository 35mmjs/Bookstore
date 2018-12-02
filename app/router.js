'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  // admin
  router.get('/admin.html', controller.admin.index)
  router.post('/admin/create.json', controller.admin.create)
  router.post('/admin/remove.json', controller.admin.remove)
  // user
  router.post('/user/login.json', controller.user.login)
  router.post('/user/create.json', controller.user.create)
  // enterprise
  router.post('/enterprise/create.json', controller.enterprise.create)
  router.get('/enterprise/findAll.json', controller.enterprise.findAll)
  router.post('/enterprise/remove.json', controller.admin.remove)
}
