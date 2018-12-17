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

const user = {
  login: '/user/login.json',
}

const book = {
  findOneByISBN: '/book.json', // isbn=xxxx
  findRankingListBySingleStore: '/ranking.json', // store=xxx
}

const openApi = {
  pubu: '/open/v1/pubu',
  zhantai: '/open/v1/zhantai',
  findBookByISBN: '/open/v1/book/:isbn',
}

module.exports = {
  enterprise,
  terminal,
  viewConfig,
  user,
  book,
  openApi,
}
