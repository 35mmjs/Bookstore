// 统一API入口
const enterprise = {
  create: '/enterprise/create.json',
  findAll: '/enterprise/findAll.json',
  remove: '/enterprise/remove.json',
  update: '/enterprise/update.json',
}

const terminal = {
  create: '/terminal/create.json',
  findAll: '/terminal/findAll.json',
  remove: '/terminal/remove.json',
  update: '/terminal/update.json',
}
module.exports = {
  enterprise,
  terminal,
}
