const { app } = require('egg-mock/bootstrap')
const expect = require('expect')

const SHOP_ID = '9016'

describe('test/app/service/bookAPIByLiuzhou.test.js', () => {
  let ctx
  beforeEach(() => {
    ctx = app.mockContext({})
  })
  it('getRankingList', async () => {
    const data = await ctx.service.bookAPIByLiuzhou.getRankingList()
    expect(Array.isArray(data)).toEqual(true)
  })
  it('getRingkingInfo', async () => {
    const data = await ctx.service.bookAPIByLiuzhou.getRinkingInfo(1, SHOP_ID)
    expect(Array.isArray(data)).toEqual(true)
  })
  it('getBookByISBN', async () => {
    const isbn = '9787530208977'
    const data = await ctx.service.bookAPIByLiuzhou.getBookByISBN(isbn, SHOP_ID)
    expect(data.isbn).toEqual(isbn)
  })
  it('getBookBySPBS', async () => {
    const spbs = '103688077'
    const data = await ctx.service.bookAPIByLiuzhou.getBookBySPBS(spbs, SHOP_ID)
    expect(String(data.spbs)).toEqual(spbs)
  })
  it('searchBookByKeyword', async () => {
    const keyword = '三毛'
    const data = await ctx.service.bookAPIByLiuzhou.searchBookByKeyword(keyword, SHOP_ID)
    expect(Array.isArray(data)).toEqual(true)
  })
  it('getStockList', async () => {
    const data = await ctx.service.bookAPIByLiuzhou.getStockList(SHOP_ID, '103688077')
  })
  it('getRecommendBooks', async () => {
    const data = await ctx.service.bookAPIByLiuzhou.getRecommendBooks('103688077', SHOP_ID)
  })
})
