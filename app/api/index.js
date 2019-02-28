// 统一API入口
const enterprise = {
  create: '/enterprise/create.json',
  findAll: '/enterprise/findAll.json',
  remove: '/enterprise/remove.json',
  update: '/enterprise/update.json',
  findOne: '/enterprise/findOne.json',
}

const terminal = {
  create: '/terminal/create.json',
  findAll: '/terminal/findAll.json',
  remove: '/terminal/remove.json',
  update: '/terminal/update.json',
  findOne: '/terminal/findOne.json',
}

const store = {
  create: '/store/create.json',
  findAll: '/store/findAll.json',
  findByEnterprise: '/store/findByEnterprise.json',
  remove: '/store/remove.json',
  update: '/store/update.json',
  findOne: '/store/findOne.json',
}

const viewConfig = {
  create: '/view-config/create.json',
  findAll: '/view-config/findAll.json',
  remove: '/view-config/remove.json',
  update: '/view-config/update.json',
  findOne: '/view-config/findOne.json',
}

const terminalType = {
  findAll: '/terminal-type/findAll.json',
}

const user = {
  login: '/user/login.json',
  create: '/user/create.json',
  findAll: '/user/findAll.json',
  remove: '/user/remove.json',
  update: '/user/update.json',
  findOne: '/user/findOne.json',
}

const book = {
  findOneByISBN: '/book.json', // isbn=xxxx
  findOneByISBNs: '/books.json', // isbn=xxxx
  findRankingListBySingleStore: '/ranking.json', // store=xxx
  findRankingBooks: '/ranking/books.json', // id=xxxx
}

const common = {
  getOssToken: '/common/ossToken.json',
}

const openApi = {
  daoshi: '/open/v1/daoshi',
  pubu: '/open/v1/pubu',
  zhantai: '/open/v1/zhantai',
  findBookByISBN: '/open/v1/book', // isbn=xxx
  findBookBySPBS: '/open/v1/book', // spbs=xxx
  findBooksByKeyword: '/open/v1/book/search', // keyword=xxx
  findRecommendByISBN: '/open/v1/book/recommend', // isbn=xxx
  findRecommendBySPBS: '/open/v1/book/recommend', // spbs=xxx
  findPaihangCatalog: '/open/v1/paihang/catalog',
  updatePaihang: '/open/v1/paihang/update', // POST
  findPaihangPadDetail: '/open/v1/paihang/pad/detail', // rankId
}

const publicEntry = {
  entry: '/public/entry.html',
}

module.exports = {
  store,
  enterprise,
  terminal,
  viewConfig,
  terminalType,
  user,
  book,
  openApi,
  common,
  publicEntry,
}
