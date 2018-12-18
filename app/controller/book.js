const { Controller } = require('egg')

class BookController extends Controller {
  async index() {
    const { ctx } = this
    // const data = await ctx.service.users.find(33)
    await ctx.render('layout/layout.html', { entry: 'admin' })
  }

  async getBookByISBN() {
    const param = this.ctx.query
    const { isbn } = param
    const res = await this.ctx.service.bookAPI.getBookByISBN(isbn)
    /**
     * {
    "success": true,
    "data": {
        "spbs": "3761737",
        "tm": "9787533936020",
        "isbn": "9787533936020",
        "sm": "月亮与六便士",
        "author": "作者:(英)毛姆",
        "author_check": "译者:徐淳刚",
        "author_edit": "",
        "bb": "浙江文艺出版社",
        "cbrq": "2017-01-01",
        "dj": "39.8",
        "yxxlmc": "外国文学-各国文学",
        "ml": "导读\r\n正文\r\n注释",
        "tjy": "《月亮与六便士》：全世界超会讲故事的作家毛姆经典代表作，村上春树读了两遍，强烈推荐的现象级全球畅销书。\r\n    出版90多年来，本书以62种文字风靡美国、英国、德国、意大利、法国、加拿大等110个国家，总销量突破6000万册！\r\n    2017全新未删减中译本，由水沫诗歌奖、波比文化小说奖得主徐淳刚，译自英国Vintage  Books出版社1999定版，特有7000字精彩导读，为您解析毛姆传奇人生。\r\n    流畅、好读、精准的诗意译文，美轮美奂的全彩插图，完美呈现出毛姆刻薄犀利却又情意绵绵的文学特色，迅速引爆读者口碑推荐效应！\r\n    “人世漫长得转瞬即逝，有人见尘埃，有人见星辰。你一生真正的抉择只有一次，你应该被梦想照亮，还是被金钱照亮？”",
        "bc": "1",
        "kb": "32开",
        "ys": "272",
        "fmdt": "http://images.zxhsd.com/photo/book_b/C/02377/3761737-fm-b.jpg"
    }
}
     */
    const processedResult = {
      cover: res.fmdt,
      isbn: res.isbn,
      name: res.sm,
      author: res.author,
      catalog: res.yxxlmc,
      price: res.edj,
      pricing: res.dj,
      recommender: '',
      intro: res.tjy,
      pageType: res.kb,
      pageNum: res.ys,
      publish: res.bb,
      version: '',
      bookshelf: '',
      qrcode: res.qrcode,
    }
    this.ctx.body = {
      success: true,
      data: processedResult,
    }
  }
}
// 书籍搜索
// 详情接口
// 排行榜相关

module.exports = BookController
