function bookInfoMap(res, userInfo = {}) {
  const { enterprise = 1 } = userInfo
  const enterpriseInZj = [1, 2, 3, 4]
  let isFromZj = 'false'
  if (enterpriseInZj.includes(enterprise)) {
    isFromZj = 'true'
  }
  const score = Math.floor((Math.random() * (10 - 8) + 8) * 10) / 10
  const processedResult = {
    cover: res.fmdt, // 封面
    isbn: res.isbn, // isbn
    spbs: res.spbs, // 书本唯一标识或者是数据库id
    name: res.sm, // 书名
    author: res.author, // 作者
    catalog: res.yxxlmc, // 分类
    toc: res.ml, // 目录,
    price: res.dj, // 定价
    pricing: res.dj,
    recommender: res.tjy, // 推荐语
    intro: res.nrty, // 内容提要
    pageType: res.kb, // 开本
    pageNum: res.ys, // 页数
    publish: res.bb, // 发行商
    version: '',
    bookshelf: (res.stockList && res.stockList.length && res.stockList[0].jwh) || '',
    stockList: res.stockList || [], // 库存列表, 格式如: [ { jwh: '架位号:204031', lbmc: '哲学', lc: '西区书城二楼', zjs: '1' } ]
    qrcode: res.qrcode, // 购买链接
    score: res.bkScore || score,
    ls_SendUnitID: res.ls_SendUnitID,
    isFromZj,
  }
  return Object.assign({}, processedResult)
}

function renlianbookInfoMap(res) {
  const score = Math.floor((Math.random() * (10 - 8) + 8) * 10) / 10
  const processedResult = {
    cover: res.pic_url, // 封面
    isbn: res.isbn, // isbn
    spbs: res.prod_id, // 书本唯一标识或者是数据库id
    name: res.prod_name, // 书名
    author: res.author, // 作者
    score: res.score || score,
    publish: res.publi_comp,
    price: (res.fix_price / 100).toFixed(2), // 定价
    isFromZj: true,
  }
  return Object.assign({}, processedResult)
}

function zhantaiMap(item) {
  let res = {}
  const payloadStr = item.content || '{}'
  const payloadArray = JSON.parse(payloadStr)
  if (payloadArray && payloadArray.length > 0) {
    const data = payloadArray[0]
    res = {
      id: item.id,
      type: item.type,
      name: item.name,
      note: item.note,
      books: data.books,
    }
  }
  return res
}

function pubuMap(item) {
  const resArray = []
  const payloadStr = item.content || '{}'
  const payloadArray = JSON.parse(payloadStr)
  if (payloadArray && payloadArray.length > 0) {
    payloadArray.forEach(data => {
      const singlePubu = {
        books: data.books,
        banner: {
          src: data.banner ? data.banner.url : '',
        },
        channel: data.channel,
      }
      resArray.push(singlePubu)
    })
  }
  return resArray
}

module.exports = {
  bookInfoMap,
  zhantaiMap,
  pubuMap
}
