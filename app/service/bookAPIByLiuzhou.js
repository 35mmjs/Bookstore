const { Service } = require('egg')
const querystring = require('querystring')
const http = require('http')
const { omit } = require('../common/utils')
const CommonError = require('../common/CommonError')

function month(m) {
  return m.toString().length === 1 ? `0${m}` : `${m}`
}
// 转换成新华的接口数据
function normalize(d) {
  if (!d) return null
  return {
    fmdt: d.CoverImage || '', // 封面
    isbn: d.ISBN, // isb
    tm: d.ISBN, // 条码
    spbs: d.SendUnitID, // 书本唯一标识或者是数据库id
    sm: d.Name, // 书名
    author: d.Author, // 作者
    // yxxlmc: res.yxxlmc, // 分类
    ml: d.Catalog || '', // 目录,
    dj: d.PrePrice || d.Price, // 定价
    tjy: d.Prologue || '', // 推荐语
    nrty: d.Contentsummary || '', // 内容提要
    // pageType: res.kb,
    // ys: res.ys, // 页数
    bb: d.EditionNO, // 出版社
    // stockList: res.stockList || [], // 库存列表, 格式如: [ { jwh: '架位号:204031', lbmc: '哲学', lc: '西区书城二楼', zjs: '1' } ]
    qrcode: '', // 购买链接
    postscript: d.Postscript || '', // 后记
    prologue: d.Prologue || '', // 序言
    ls_SendUnitID: d.ls_SendUnitID, // 用于查询库存用
  }
}
/**
 * 柳州的API接口, Demo见：http://cw.gxxhsd.com/book/demo.html
 */
class BookAPIByZhongjinService extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
    this.bookConfig = this.app.config.bookAPIByLiuzhou
  }

  fetch(data) {
    // 柳州的shopID从session获取
    data.shopID = data.shopID || this.ctx.storeCodeFromSession
    const postData = querystring.stringify({
      ProjID: 19491949,
      pageNum: 1, // 分页页码
      rowsNum: 20, // 分页条数
      FormType: 'Web', // 请求来源
      ServerID: data.ServerID,
      DataObject: JSON.stringify(omit(data, ['ServerID'])),
    })
    return new Promise((res, rej) => {
      const req = http.request(this.bookConfig.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Content-Length': Buffer.byteLength(postData),
        },
      }, (d) => {
        if (d.statusCode !== 200) {
          rej(new CommonError(`请求出错: ${d.statusCode}`))
        }
        const resData = []
        d.setEncoding('utf8')
        d.on('data', (chunk) => {
          resData.push(chunk)
        })
        d.on('end', () => {
          try {
            const chunkData = JSON.parse(resData.join(''))
            if (!chunkData.IsSuccess) {
              rej(new CommonError(chunkData.EXMessages))
              return
            }
            res(JSON.parse(chunkData.DataObject))
          } catch (e) {
            rej(new CommonError('JSON解析错误'))
          }
        })
      })
      req.on('error', (e) => {
        rej(new CommonError(`请求出错: ${e.message}`))
      })
      req.write(postData)
      req.end()
    })
  }

  /**
   * @return {Array}
   *  - phid {String} 排行ID
   *  - phmc {phmc} 排行名称
   */
  getRankingList() {
    return this.fetch({
      ServerID: 6,
      pageNum: 1,
      rowsNum: 20,
    }).then((d) => d.map(item => {
      return {
        phid: item.ID,
        phmc: item.Name,
      }
    }))
  }

  /**
   * 获取排行分类的详细信息
   * @param phid {String} - 排行ID，由getRinkingList列表获取
   * @return {Array}
   *  - phid 排行id
   *  - phmc 排行名称
   *  - xh 排行序号
   *  - tm 条码/ISBN
   *  - spbs 商品标识
   *  - sm 书名
   *  - dj 定价
   *  - ml 目录
   *  - tjy 简介
   */
  getRinkingInfo(phid, khbh) {
    const time = new Date()
    return this.fetch({
      ServerID: 5,
      shopID: khbh,
      top: 20,
      BeginTime: `${time.getFullYear()}${month(time.getMonth())}01`,
      EndTime: `${time.getFullYear()}${month(time.getMonth() + 1)}01`,
      key: phid, // 1哲学、社会科学,2文化、教育,3文学、艺术,4自然科学、科技,5少儿读物,6大中专教材,7课本,8教辅读物,9其他出版物,10音像制品
    }).then(arr => Promise.all(arr.map(item => this.getBookBySPBS(item.UpSendUnitID, khbh))))
  }

  getRinkingInfoDetail(phid) {
    // 柳州的接口保持一致
    return this.getRinkingInfo(phid)
  }

  /**
   * 根据书号获取书的详细信息
   * @param ISBN {String} - 书号
   * @param khbh {String} - 客户编号
   * @return {Object}
   *  - spbs 浙江新华图书商品的唯一标识
   *  - sm 书名
   *  - di 定价
   *  - isbn 书号
   *  - zyz 作者
   *  - fmtp 封面图片
   *  - zbkc 总部库存
   *  - qrcode 购买链接，用于生成二维码
   */
  getBookByISBN(ISBN, khbh) {
    return this.fetch({
      ServerID: 2, // 函数ID
      key: ISBN,
      shopID: khbh,
    }).then(d => normalize(d[0]))
  }

  /**
   * 根据商品标识
   * @param SPBS
   * @param khbh
   * @return {Promise<T | never | never>}
   */
  getBookBySPBS(SPBS, khbh) {
    return this.fetch({
      ServerID: 3, // 函数ID
      ID: SPBS,
      shopID: khbh,
    }).then(d => normalize(d[0]))
  }

  /**
   * 根据关键字查询，返回数组
   * @param keyword
   * @param khbh
   * @return {Array}
   */
  searchBookByKeyword(keyword, khbh) {
    return this.fetch({
      ServerID: 2, // 函数ID
      key: keyword,
      shopID: khbh,
    }).then(d => d.map(i => normalize(i)))
  }

  /**
   * 根据书名查询, 返回数组
   * @param bookname
   * @param khbh
   * @return {Array}
   */
  searchBookByName(bookname, khbh) {
    return this.searchBookByKeyword(bookname, khbh)
  }

  /**
   * 获取推荐的书籍
   * @param spbs {String}
   * @param khbh
   */
  getRecommendBooks(spbs, khbh = '3300000000') {
    // TODO 暂时没有
    return []
  }

  /**
   * 获取库存信息
   * @param khbh {String} 库存店号
   * @param spbs {String} 商品标识
   */
  async getStockList(khbh, spbs) {
    const data = await this.getBookBySPBS(spbs, khbh)
    if (!data || !data.ls_SendUnitID) return []
    // "[{"SendUnitID":4777330,"Name":"民族大道店","StockNumber":"6本","Tel":"0771-5851848","Address":"民族大道69号","PositionID":"127-1-1-1"},{"SendUnitID":4777330,"Name":"王府井店","StockNumber":"12本","Tel":"0771-5516253","Address":"新民路华星时代广场王府井4楼C20","PositionID":"6-3-1-1"},{"SendUnitID":4777330,"Name":"概念书屋","StockNumber":"3本","Tel":"0771-2883566","Address":"南宁吴圩国际机场T2航站楼三楼23号登机口斜对面","PositionID":"27-7-1-1"},{"SendUnitID":4777330,"Name":"约阅读体验中心","StockNumber":"3本","Tel":"18977113515","Address":"南宁职业技术学院图书馆A区","PositionID":"畅销书-001-001-00"},{"SendUnitID":4777330,"Name":"概念书屋朝阳店","StockNumber":"2本","Tel":"18697980280","Address":"南宁饭店大堂","PositionID":"5-1-1-1"},{"SendUnitID":4777330,"Name":"机场嘉暘碧天酒店概念书屋","StockNumber":"3本","Tel":"0771-2886325","Address":"广西南宁市吴圩国际机场T2航站区机场大道18号嘉暘碧天酒店三","PositionID":null},{"SendUnitID":4777330,"Name":"约阅读体验中心","StockNumber":"5本","Tel":null,"Address":"广西南宁市合兴路3号（南宁师范大学五合校区饭堂二楼）","PositionID":null}]"
    return this.fetch({
      ServerID: 4,
      LSID: data.ls_SendUnitID,
      shopID: khbh,
    })
  }
}

module.exports = BookAPIByZhongjinService
