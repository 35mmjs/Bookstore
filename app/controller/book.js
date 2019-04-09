const { Controller } = require('egg')
const { bookInfoMap } = require('../common/bizHelper')

class BookController extends Controller {
  async index() {
    const { ctx } = this
    // const data = await ctx.service.users.find(33)
    await ctx.render('layout/layout.html', { entry: 'admin' })
  }

  async getBookByISBNs() {
    const params = this.ctx.query
    const { isbns } = params
    const { bookAPI } = await this.ctx.getBookAPI()
    let list = []
    const isbnArray = isbns.split(',')
    if (isbnArray && isbnArray.length > 0) {
      if (bookAPI.getAPIType() === 'zhongjin') {
        let bookList = await bookAPI.getBookByISBN(isbns);
        if (bookList.length > 0) {
          bookList.map(item => {
            list.push(bookInfoMap(item, this.ctx.session.user));
          });
        }
      } else {
        list = await Promise.all(
          isbnArray.map(async item => {
            let res = {};
            res = await bookAPI.getBookByISBN(item);
            if (res.spbs) {
              res = await bookAPI.getBookBySPBS(res.spbs);
            }
            return bookInfoMap(res, this.ctx.session.user);
          })
        );
      }

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

  async getBook() {
    const param = this.ctx.query
    const { isbn, spbs } = param
    const { bookAPI } = await this.ctx.getBookAPI()
    let res =[]
    let processedResult = []
    if (isbn) {
      // let res = []
      res = await bookAPI.getBookByISBN(isbn)
      if (res.spbs) {
        res = await bookAPI.getBookBySPBS(res.spbs)
      }
      // processedResult = bookInfoMap(res, this.ctx.session.user)
      // processedResult = res.map(item => {return bookInfoMap(item, this.ctx.session.user)});
    }
    if (spbs) {
      res = await bookAPI.getBookBySPBS(spbs)
      // processedResult = res.map(item => {return bookInfoMap(item, this.ctx.session.user)});
    }
    res.map(item => { processedResult.push(bookInfoMap(item, this.ctx.session.user))});
    this.ctx.body = {
      success: true,
      data: processedResult,
    }
  }
  // 书籍搜索
  // 详情接口

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
  async getRecommendBooksByISBN() {
    let list = []
    const param = this.ctx.query
    const { isbn } = param
    const { bookAPI } = await this.ctx.getBookAPI()
    const res = await bookAPI.getBookByISBN(isbn)
    const { spbs } = res
    if (spbs) {
      const rawList = await bookAPI.getRecommendBooks()
      if (rawList && rawList.length > 0) {
        list = rawList.map(item => {
          return {
            price: item.dj,
            name: item.sm,
            isbn: item.tm,
          }
        })
      }
      this.ctx.body = {
        success: true,
        data: list,
      }
    } else {
      this.ctx.body = { success: true, data: '' }
    }
  }
  */

  async findRankingListBySingleStore() {
    const { bookAPI } = await this.ctx.getBookAPI()
    const res = await bookAPI.getRankingList()
    const processedResult = res.map(item => {
      return {
        value: item.phid,
        label: item.phmc,
      }
    })
    this.ctx.body = {
      success: true,
      data: processedResult,
    }
  }

  async findRankingBooks() {
    const param = this.ctx.query
    const { bookAPI } = await this.ctx.getBookAPI()
    const { id } = param
    try {
      const res = await bookAPI.getRinkingInfoDetail(id)
      const processedResult = res.map(item => {
        return bookInfoMap(item, this.ctx.session.user)
      })
      this.ctx.body = {
        success: true,
        data: processedResult,
      }
    } catch (e) {
      console.error('error', e)
    }
  }
}

module.exports = BookController
