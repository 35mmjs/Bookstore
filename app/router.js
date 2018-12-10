'use strict'

const { enterprise } = require('./api/index')

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
  // enterprise
  router.post('/enterprise/create.json', controller.enterprise.create)
  router.get(enterprise.findAll, controller.enterprise.findAll)
  router.post(enterprise.remove, controller.enterprise.remove)
  router.post(enterprise.update, controller.enterprise.update)
  // router.get('common/generateToken.json', controller)
}
