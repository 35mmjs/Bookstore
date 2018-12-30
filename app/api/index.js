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

const store = {
  create: '/store/create.json',
  findAll: '/store/findAll.json',
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
}

const book = {
  findOneByISBN: '/book.json', // isbn=xxxx
  findOneByISBNs: '/books.json', // isbn=xxxx
  findRankingListBySingleStore: '/ranking.json', // store=xxx
  findRankingBooks: '/ranking/books.json', // id=xxxx
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
}
