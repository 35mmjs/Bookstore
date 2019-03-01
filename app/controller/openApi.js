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

function bookInfoListProcess(list) {
  if (!list || list.length <= 0) return []
  const res = list.map(item => {
    return bookInfoMap(item)
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

  async findBook() {
    let res = ''
    const { query } = this.ctx
    const { isbn, spbs } = query
    const { storeCode, storeNum } = await this.ctx.getStoreCodeFromQuery()
    if (isbn) {
      res = await this.ctx.service.bookAPI.getBookByISBN(isbn)
    }
    if (spbs) {
      const stockList = await this.ctx.service.bookAPI.getStockList(storeCode, spbs, storeNum)
      res = await this.ctx.service.bookAPI.getBookBySPBS(spbs)
      res.stockList = stockList
    }
    const processedResult = bookInfoMap(res)
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
    const { isbn, spbs } = param
    if (isbn) {
      res = await this.ctx.service.bookAPI.getBookByISBN(isbn)
      const { spbs: bookSpbs } = res
      if (bookSpbs) {
        rawList = await this.ctx.service.bookAPI.getRecommendBooks(bookSpbs)
      }
    }
    if (spbs) {
      rawList = await this.ctx.service.bookAPI.getRecommendBooks(spbs)
    }
    if (rawList && rawList.length > 0) {
      list = await Promise.all(
        rawList.map(async item => {
          // const singleBook = await this.ctx.service.bookAPI.getBookBySPBS(item.spbs)
          const singleBook = await this.ctx.service.bookAPI.getBookByISBN(
            item.tm,
          )
          return bookInfoMap(singleBook)
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
    const { storeCode } = await this.ctx.getStoreCodeFromQuery()
    let processedResult = []
    const res = await this.ctx.service.bookAPI.searchBookByKeyword(keyword, storeCode)
    if (res && res.length > 0) {
      processedResult = bookInfoListProcess(res)
    }
    this.ctx.body = {
      success: true,
      data: processedResult,
    }
  }

  async findBooksByName() {
    const { query } = this.ctx
    const { keyword } = query
    const { storeCode } = await this.ctx.getStoreCodeFromQuery()
    let processedResult = []
    const res = await this.ctx.service.bookAPI.searchBookByName(keyword, storeCode)
    if (res && res.length > 0) {
      processedResult = bookInfoListProcess(res)
    }
    this.ctx.body = {
      success: true,
      data: processedResult,
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
    const res = await this.service.bookAPI.getRankingList()
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
    const oldPaihangInfoRaw = await this.app.redis.get('paihang_info')
    let oldPaihangInfo = {}
    if (oldPaihangInfoRaw) {
      oldPaihangInfo = JSON.parse(oldPaihangInfoRaw) || {}
    }
    if (oldPaihangInfo[paihangId]) {
      return oldPaihangInfo[paihangId]
    }
    const paihangInfo = await this.ctx.service.bookAPI.getRinkingInfoDetail(paihangId)
    const processedResult = paihangInfo.map(item => bookInfoMap(item))
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
    const { orgId, clientId, navId, catalogId } = query
    let newPaihangSession
    const paihang = await this.app.redis.get('paihang')
    // 更新session
    if (!paihang) {
      await this.app.redis.set('paihang', JSON.stringify([]))
    }
    const paihangSessionRaw = await this.app.redis.get('paihang')
    const paihangSession = JSON.parse(paihangSessionRaw)
    // 通过设备id确定唯一排行
    const matched = paihangSession.find(item => {
      return item.clientId === clientId && item.navId === navId
    })
    if (matched) {
      newPaihangSession = paihangSession.map(item => {
        if (item.clientId === clientId && item.navId === navId) {
          return {
            ...item,
            catalogId,
          }
        }
        return item
      })
    } else {
      paihangSession.push({
        clientId,
        navId,
        catalogId,
        orgId,
      })
      newPaihangSession = paihangSession
    }
    await this.app.redis.set('paihang', JSON.stringify(newPaihangSession))
    const data = await this.app.redis.get('paihang')
    let paihangInfo
    try {
      paihangInfo = await this.getPaihangInfo(catalogId)
    } catch (e) {
      console.error(e)
    }
    this.ctx.body = {
      success: true,
      data: {
        value: paihangInfo,
      },
    }
  }

  /**
   * 获取选中的排行分类的书本详情, 轮询接口
   */
  async findPaihangPadDetail() {
    const query = this.ctx.query
    const { orgId, clientId, navId, rankId } = query
    const paihangSessionRaw = await this.app.redis.get('paihang')
    if (!paihangSessionRaw) {
      this.ctx.body = {
        success: false,
        msg: '请先选择排行',
      }
      return
    }
    // 计算 navId
    // 通过设备id确定唯一排行
    const paihangSession = JSON.parse(paihangSessionRaw)
    const matched = paihangSession.find(item => {
      return item.clientId === clientId && item.navId === navId
    })
    if (!matched) {
      this.ctx.body = {
        success: false,
        msg: '请先选择排行',
      }
      return
    }
    const catalogId = matched.catalogId
    const paihangInfoRaw = await this.app.redis.get('paihang_info')
    const paihangInfo = JSON.parse(paihangInfoRaw)
    const paihangInfoList = paihangInfo[catalogId]
    let payload = {}
    if (paihangInfoList && paihangInfoList.length > 0) {
      payload = paihangInfoList[rankId - 1]
    }
    this.ctx.body = {
      success: true,
      data: {
        ...payload,
      },
    }
  }
}

module.exports = OpenApiController
