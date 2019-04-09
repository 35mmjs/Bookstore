const { Service } = require('egg')
const Client = require('aliyun-api-gateway').Client
const CommonError = require('../common/CommonError')


function normalize(d) {
  if (!d) return {}
  return {
    fmdt: d.image_osspath || '', // 封面
    isbn: d.ISBN, // isb
    tm: d.ISBN, // 条码
    spbs: '', // 书本唯一标识或者是数据库id
    sm: d.bk_name || '', // 书名
    author: d.author_name || '', // 作者
    yxxlmc: '',
    ml: d.catalog || '', // 目录,
    dj: d.price , // 定价
    tjy: (d.recommend || '').trim(), // 推荐语
    nrty: (d.Contentsummary || '').trim(), // 内容提要
    pageType: d.page_type,
    ys: d.page_size, // 页数
    bb: d.publi_full_name || '', // 出版社
    // stockList: res.stockList || [], // 库存列表, 格式如: [ { jwh: '架位号:204031', lbmc: '哲学', lc: '西区书城二楼', zjs: '1' } ]
    qrcode: 'http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/apic/WechatIMG134.jpeg', // 购买链接
    postscript: '' , // 后记
    prologue: '', // 序言
    bkScore:d.bk_score,
    bkid:d.bk_id,
    ls_SendUnitID: d.ls_SendUnitID, // 用于查询库存用
  }
}


/**
 * 中金的API接口
 */
class BookAPIByZhongjinService extends Service {
  constructor(...args) {
    super(...args);
    this.bookConfig = this.app.config.bookAPIByZhongjin;
    this.client = new Client(this.bookConfig.appKey, this.bookConfig.appSecret);
  }

  getAPIType(){
    return 'zhongjin';
  }

  async fetch(path, query) {
    const data = await this.client.get(`${this.bookConfig.url}${path}`, {
      data: query,
      headers: {
        accept: 'application/json',
      },
    })
    if (data.errCode !== 0) throw new Error(`[BookAPIByZhongjin] ${data.errMsg}`)
    return data.data
  }

  /**
   * 获取中金的门店排行
   * @param pageNnum {Number}
   * @param pageSize {Number}
   * @param storeId {String} 中金的门店id，如 3300000000330100000112
   */
  getStoreProdRank({ pageNum = 1, pageSize = 10, storeId }) {
    return this.fetch('/getStoreProdRank', { pageNum, pageSize, store_id: storeId })
  }

  /**
   * 根据书号获取书的详细信息
   * @param ISBN {String} - 书号
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
  getBookByISBN(ISBN) {
    return this.fetch('/getBkinfoFromIsbns',{
      ISBNS: ISBN,
      pageNum:1,
      pageSize:100
    }).then(d => {
      if(!d.rows){
        throw new CommonError('未找到对应书本');
      }
      if (d.rows.length === 0){ 
        throw new CommonError('未找到对应书本');
      }
      let list = [];
      d.rows.map(item => {
        list.push(normalize(item));
      });
      return list;
    })
  }

}

module.exports = BookAPIByZhongjinService
