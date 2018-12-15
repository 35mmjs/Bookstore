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
})
