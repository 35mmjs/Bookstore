function bookInfoMap(res) {
  const processedResult = {
    cover: res.fmdt, // 封面
    isbn: res.isbn, // isb
    spbs: res.spbs, // 书本唯一标识或者是数据库id
    name: res.sm, // 书名
    author: res.author, // 作者
    catalog: res.yxxlmc, // 分类
    toc: res.ml, // 目录,
    price: res.dj, // 定价
    pricing: res.dj,
    recommender: res.tjy, // 推荐语
    intro: res.nrty, // 内容提要
    pageType: res.kb,
    pageNum: res.ys,
    publish: res.bb,
    version: '',
    bookshelf: '',
    stockList: res.stockList || [], // 库存列表, 格式如: [ { jwh: '架位号:204031', lbmc: '哲学', lc: '西区书城二楼', zjs: '1' } ]
    qrcode: res.qrcode, // 购买链接
  }
  return Object.assign({}, processedResult)
}

module.exports = {
  bookInfoMap,
}
