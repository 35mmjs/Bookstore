function bookInfoMap(res) {
  const processedResult = {
    cover: res.fmdt,
    isbn: res.isbn,
    spbs: res.spbs,
    name: res.sm,
    author: res.author,
    catalog: res.yxxlmc, // 分类
    toc: res.ml, // 目录,
    price: res.dj,
    pricing: res.dj,
    recommender: res.tjy, // 推荐语
    intro: res.nrty, // 内容提要
    pageType: res.kb,
    pageNum: res.ys,
    publish: res.bb,
    version: '',
    bookshelf: '',
    stockList: res.stockList || [], // 库存列表, 格式如: [ { jwh: '架位号:204031', lbmc: '哲学', lc: '西区书城二楼', zjs: '1' } ]
    qrcode: res.qrcode,
  }
  return Object.assign({}, processedResult)
}

module.exports = {
  bookInfoMap,
}
