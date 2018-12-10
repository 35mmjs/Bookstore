// 统一API入口
const enterprise = {
  create: '/enterprise/create.json',
  findAll: '/enterprise/findAll.json',
  remove: '/enterprise/remove.json',
  update: '/enterprise/update.json',
  findOne: '/enterprise/findAll.json',
}

const terminal = {
  create: '/terminal/create.json',
  findAll: '/terminal/findAll.json',
  remove: '/terminal/remove.json',
  update: '/terminal/update.json',
  findOne: '/terminal/findOne.json',
}

const viewConfig = {
  create: '/view-config/create.json',
  findAll: '/view-config/findAll.json',
  remove: '/view-config/remove.json',
  update: '/view-config/update.json',
  findOne: '/view-config/findOne.json',
}

module.exports = {
  enterprise,
  terminal,
  viewConfig,
}
