const { app } = require('egg-mock/bootstrap')
const expect = require('expect')

describe('test/app/service/bookAPI.test.js', () => {
  let ctx
  beforeEach(() => {
    ctx = app.mockContext({})
  })
  it('getRinkingList', async () => {
    const data = await ctx.service.bookAPI.getRinkingList()
    expect(Object.keys(data[0])).toEqual(['phid', 'phmc'])
  })
  it('getRinkingInfo', async () => {
    const data = await ctx.service.bookAPI.getRinkingInfo('00000084')
    expect(Array.isArray(data)).toEqual(true)
  })
  it('getBookByISBN', async () => {
    const data = await ctx.service.bookAPI.getBookByISBN('9787509392652')
    expect(data.sm).toMatch(/宪法/)
  })
  it('getBookBySPBS', async () => {
    const data = await ctx.service.bookAPI.getBookBySPBS('4087393')
    expect(data.sm).toMatch(/宪法/)
  })
  it('getRecommendBooks', async () => {
    ctx.service.bookAPI.getRecommendBooks('4087393')
  })
  it('searchBookByName', async () => {
    const data = await ctx.service.bookAPI.searchBookByName('中华人民共和国宪法(宣誓本)')
    console.log('aaaaaaaa', data)
    expect(data[0].sm).toMatch(/宪法/)
  })
  it('searchBookByKeyword', async () => {
    const data = await ctx.service.bookAPI.searchBookByKeyword('中华人民共和国宪法')
    console.log('aaaaaaaa', data)
    expect(data.length > 0).toEqual(true)
  })
})
