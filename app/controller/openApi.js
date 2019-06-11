const { Controller } = require('egg')
const { bookInfoMap } = require('../common/bizHelper')

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

function paihangMap(item, navId) {
  let res = []
  const payloadStr = item.content || '{}'
  const payloadObj = JSON.parse(payloadStr)
  let payloadArray
  if (navId === '1') {
    payloadArray = payloadObj.nav1
    if (payloadArray && payloadArray.length > 0) {
      res = payloadArray.map(i => {
        return {
          ...i,
        }
      })
    }
  }
  if (navId === '2') {
    payloadArray = payloadObj.nav2
    if (payloadArray && payloadArray.length > 0) {
      res = payloadArray.map(i => {
        return {
          ...i,
        }
      })
    }
  }
  return res
}

function bookInfoListProcess(list, userInfo) {
  if (!list || list.length <= 0) return []
  const res = list.map(item => {
    return bookInfoMap(item, userInfo)
  })
  return res
}

class OpenApiController extends Controller {
  // post
  async create() {
    const request = this.ctx.request.body
    const result = await this.ctx.service.enterprise.create(request.name)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async getPubu() {
    const query = this.ctx.query
    const { clientId, orgId } = query
    if (!orgId) {
      this.ctx.body = {
        success: false,
        error: `无法找到门店id: ${orgId}`,
      }
      return
    }
    const item = await this.ctx.service.openApi.findViewConfigByStoreAndTerminal(
      orgId,
      clientId,
    )
    if (!item) {
      this.ctx.body = {
        success: false,
        error: '无法找到对应设备终端',
      }
      return
    }
    const resArray = pubuMap(item)
    this.ctx.body = {
      success: true,
      data: resArray,
    }
  }

  async getDaoshi() {
    const query = this.ctx.query
    const { clientId, orgId } = query
    if (!orgId) {
      this.ctx.body = {
        success: false,
        error: `无法找到门店id: ${orgId}`,
      }
      return
    }
    const item = await this.ctx.service.openApi.findViewConfigByStoreAndTerminal(
      orgId,
      clientId,
    )
    if (!item) {
      this.ctx.body = {
        success: false,
        error: '无法找到对应设备终端',
      }
      return
    }
    const result = zhantaiMap(item)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async processPaihangConfig(payload, navId, clientId) {
    let res = {}
    function getCatelogAndSaveToRedis(data) {
      let resMap = {}
      if (data && data.length > 0) {
        resMap = data.map((item, index) => {
          return {
            id: index,
            name: item.channel,
          }
        })
      }
      return resMap
    }
    try {
      payload.forEach(async (item, index) => {
        if (index + 1 === navId) {
          res = getCatelogAndSaveToRedis(item, navId, clientId)
          const payload = {
            catalogId: '',
            catalogName: '',
            catalog: res,
            content: item,
          }
          await this.app.redis.set(
            `paihang_nav_${clientId}_${navId}`,
            JSON.stringify(payload),
          )
        }
      })
    } catch (e) {
      console.error(e)
    }

    return res
  }

  async getPaihang() {
    const query = this.ctx.query
    let result = []
    const { clientId, orgId, navId } = query
    if (!orgId) {
      this.ctx.body = {
        success: false,
        error: `无法找到门店id: ${orgId}`,
      }
      return
    }
    const item = await this.ctx.service.openApi.findViewConfigByStoreAndTerminal(
      orgId,
      clientId,
    )
    if (!item) {
      this.ctx.body = {
        success: false,
        error: '无法找到对应设备终端',
      }
      return
    }
    if (item.content) {
      result = await this.processPaihangConfig(
        JSON.parse(item.content),
        parseInt(navId, 10),
        clientId,
      )
    } else {
      this.ctx.body = {
        success: false,
        error: '未配置排行视图',
      }
      return
    }
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  async findBook() {
    let res = ''
    const { query } = this.ctx
    const { isbn, spbs } = query
    const { storeCode, storeNum, bookAPI } = await this.ctx.getBookAPI()
    let books = []
    
    if (isbn) {
      books = await bookAPI.getBookByISBN(isbn)
      // res = await bookAPI.getBookByISBN(isbn)
      res = books[0]
    }
    if (spbs) {
      let stockList = []
      // if (bookAPI.getAPIType() === 'liuzhou') {
      //   stockList = await bookAPI.getStockList(storeCode, res.ls_SendUnitID)
      // } else {
      //   stockList = await bookAPI.getStockList(storeCode, spbs, storeNum)
      // }
      // res = await bookAPI.getBookBySPBS(spbs)
      books = await bookAPI.getBookBySPBS(spbs)
      res = books[0]
      if (bookAPI.getAPIType() === 'liuzhou') {
        let newBooks = await bookAPI.getBookByISBN(isbn)
        res = newBooks[0]
        stockList = await bookAPI.getStockList(storeCode, res.ls_SendUnitID)
      } else {
        stockList = await bookAPI.getStockList(storeCode, spbs, storeNum)
      }
      res.stockList = stockList
    }
    const processedResult = bookInfoMap(res, this.ctx.session.user)
    this.ctx.body = {
      success: true,
      data: processedResult,
    }
  }

  /**
   * 推荐相关
   [ { dj: '10',
    phid: '00000212',
    phmc: '12月政治法律TOP10',
    sm: '2018年党员学习参考',
    spbs: '4204543',
    tm: '9787213088032',
    xh: '1' },
  { dj: '29',
    phid: '00000212',
    phmc: '12月政治法律TOP10',
    sm: '习近平新时代中国特色社会主义思想三十讲',
    spbs: '4164039',
    tm: '9787514708547',
    xh: '2' }]
    return [{
      price // 定价
      name // 书名
      isbn // 书号
    }]
   */
  async findRecommend() {
    let list = []
    let res = null
    let rawList = []
    const param = this.ctx.query
    const { bookAPI } = await this.ctx.getBookAPI()
    const { isbn, spbs } = param
    if (isbn) {
      // res = await bookAPI.getBookByISBN(isbn)
      let books = await bookAPI.getBookByISBN(isbn)
      res = books[0]
      const { spbs: bookSpbs } = res
      if (bookSpbs) {
        rawList = await bookAPI.getRecommendBooks(bookSpbs)
      }
    }
    if (spbs) {
      rawList = await bookAPI.getRecommendBooks(spbs)
    }
    if (rawList && rawList.length > 0) {
      list = await Promise.all(
        rawList.map(async item => {
          // const singleBook = await this.ctx.service.bookAPI.getBookBySPBS(item.spbs)
          // let books = await bookAPI.getBookByISBN(item.tm)
          // const singleBook = await bookAPI.getBookByISBN(item.tm)
          // const singleBook = books[0]
          return bookInfoMap(item, this.ctx.session.user)
        }),
      )
      this.ctx.body = {
        success: true,
        data: list,
      }
    } else {
      this.ctx.body = {
        success: true,
        data: '',
      }
    }
  }

  async findBooksByKeyword() {
    const { query } = this.ctx
    const { keyword } = query
    const { storeCode, bookAPI } = await this.ctx.getBookAPI()
    let processedResult = []
    const res = await bookAPI.searchBookByKeyword(keyword, storeCode)
    if (res && res.length > 0) {
      processedResult = bookInfoListProcess(res, this.ctx.session.user)
    }
    this.ctx.body = {
      success: true,
      data: processedResult,
    }
  }

  async findBooksByName() {
    const { query } = this.ctx
    const { keyword } = query
    const { storeCode, bookAPI } = await this.ctx.getBookAPI()
    let processedResult = []
    const res = await bookAPI.searchBookByName(keyword, storeCode)
    if (res && res.length > 0) {
      processedResult = bookInfoListProcess(res)
    }
    this.ctx.body = {
      success: true,
      data: processedResult,
    }
  }

  async findTerminal() {
    const { query } = this.ctx
    const { clientId } = query
    const item = await this.ctx.service.openApi.findTerminal(clientId)
    this.ctx.body = {
      success: true,
      data: {
        ...item,
        config: JSON.parse(item.config),
      },
    }
  }

  async getZhantai() {
    const query = this.ctx.query
    const { clientId, orgId } = query
    if (!orgId) {
      this.ctx.body = {
        success: false,
        error: `无法找到门店id: ${orgId}`,
      }
      return
    }
    const item = await this.ctx.service.openApi.findViewConfigByStoreAndTerminal(
      orgId,
      clientId,
    )
    if (!item) {
      this.ctx.body = {
        success: false,
        error: '无法找到对应设备终端',
      }
      return
    }
    const result = zhantaiMap(item)
    this.ctx.body = {
      success: true,
      data: result,
    }
  }

  /**
   * 获取排行的类目
   */
  async findPaihangCatalog() {
    const { bookAPI } = await this.ctx.getBookAPI()
    const res = await bookAPI.getRankingList()
    const list = res.map(item => {
      return {
        id: item.phid,
        name: item.phmc,
      }
    })
    if (!list || list.length < 1) {
      this.ctx.body = {
        success: true,
        data: [],
        msg: '暂无数据',
      }
      return
    }
    this.ctx.body = {
      success: true,
      data: list,
    }
  }

  async getPaihangInfo(paihangId) {
    const { bookAPI } = await this.ctx.getBookAPI()
    const oldPaihangInfoRaw = await this.app.redis.get('paihang_info')
    let oldPaihangInfo = {}
    if (oldPaihangInfoRaw) {
      oldPaihangInfo = JSON.parse(oldPaihangInfoRaw) || {}
    }
    if (oldPaihangInfo[paihangId]) {
      return oldPaihangInfo[paihangId]
    }
    const paihangInfo = await bookAPI.getRinkingInfoDetail(paihangId)
    const processedResult = paihangInfo.map(item =>
      bookInfoMap(item, this.ctx.session.user),
    )
    oldPaihangInfo[paihangId] = processedResult
    await this.app.redis.set('paihang_info', JSON.stringify(oldPaihangInfo))
    return processedResult
  }

  /**
   * 更新排行的当前选中分类
   * 排行帮的数据结构存储在sessio中, 结构如下
  [
    {
      clientId: '1',
      navId: '1',
      current_cat: '2345',
    }
  ]
   */
  // TODO redis 要优化
  async updatePaihang() {
    const query = this.ctx.query
    let books = []
    const { orgId, clientId, navId, catalogId } = query
    const paihangNavSession = await this.app.redis.get(
      `paihang_nav_${clientId}_${navId}`,
    )
    if (!paihangNavSession) {
      this.ctx.body = {
        success: false,
        msg: '获取排行失败',
      }
      return
    }
    const paihangNavObj = JSON.parse(paihangNavSession)
    const content = paihangNavObj.content
    if (content) {
      const data = content.find(
        (item, index) => index === parseInt(catalogId, 10),
      )
      books = data.books
    }
    await this.app.redis.set(
      `paihang_pad_${clientId}_${navId}`,
      JSON.stringify(books),
    )
    this.ctx.body = {
      success: true,
      data: {
        value: '',
      },
    }
  }

  /**
   * 埋点接口, 不会报错
   */
  async setTracker() {
    const query = this.ctx.query
    const { act, biz_type, biz_data, clientId } = query
    const date = new Date()
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    await this.ctx.service.openApi.setTracker({
      terminal: clientId,
      act,
      biz_type,
      biz_data,
      date: formattedDate,
    })
    this.ctx.body = {
      success: true,
      data: {
        value: '',
      },
    }
  }

  /**
   * 获取选中的排行分类的书本详情, 轮询接口
   */
  async findPaihangPadDetail() {
    let res = {}
    const query = this.ctx.query
    const { orgId, clientId, navId, rankId } = query
    const paihangNavSession = await this.app.redis.get(
      `paihang_nav_${clientId}_${navId}`,
    )
    if (!paihangNavSession) {
      this.ctx.body = {
        success: false,
        msg: '请先选择排行',
      }
      return
    }
    const paihangPadSession = await this.app.redis.get(
      `paihang_pad_${clientId}_${navId}`,
    )
    if (paihangPadSession) {
      const paihangPadArray = JSON.parse(paihangPadSession)
      if (paihangPadArray && paihangPadArray.length > 0) {
        paihangPadArray.forEach((item, index) => {
          if (index + 1 === parseInt(rankId, 10)) {
            res = item
          }
        })
      }
    }
    this.ctx.body = {
      success: true,
      data: {
        ...res,
      },
    }
  }
}

module.exports = OpenApiController
