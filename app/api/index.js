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

const ads = {
  create: '/ads/create.json',
  findAll: '/ads/findAll.json',
  findOneByEIdCd: '/ads/findOneByEIdCd.json',
  findByEnterprise: '/ads/findByEnterprise.json',
  fintByStore: '/ads/findByStore.json',
  remove: '/ads/remove.json',
  update: '/ads/update.json',
  findOne: '/ads/findOne.json',
}

const deviceList = {
  create: '/device-list/create.json',
  remove: '/device-list/remove.json',
  update: '/device-list/update.json',
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

/**
 * 埋点相关
 */
const tracker = {
  findAll: '/tracker/findAll.json',
  findOne: '/tracker/findOne.json',
}

const openApi = {
  daoshi: '/open/v1/daoshi',
  pubu: '/open/v1/pubu',
  zhantai: '/open/v1/zhantai',
  paihang: '/open/v1/paihang',
  findBookByISBN: '/open/v1/book', // isbn=xxx
  findBookBySPBS: '/open/v1/book', // spbs=xxx
  findBooksByKeyword: '/open/v1/book/search', // keyword=xxx
  findRecommendByISBN: '/open/v1/book/recommend', // isbn=xxx
  findRecommendBySPBS: '/open/v1/book/recommend', // spbs=xxx
  getFaceRecommendById: '/open/v1/book/getfacerecommend',
  findPaihangCatalog: '/open/v1/paihang/catalog',
  updatePaihang: '/open/v1/paihang/update', // POST
  findPaihangPadDetail: '/open/v1/paihang/pad/detail', // rankId
  tracker: '/open/v1/tracker', // 埋点相关
  findTerminal: '/open/v1/terminal', // 获取termin 元数据 clientId=xxx
  findAds: '/open/v1/ads', // 获取当前设备的可投放广告,
  getOssToken: '/open/v1/getOssToken',
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
  ads,
  deviceList,
  book,
  openApi,
  common,
  publicEntry,
  tracker,
}
