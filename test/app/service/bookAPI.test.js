const { app } = require('egg-mock/bootstrap')
const expect = require('expect')

describe('test/app/service/bookAPI.test.js', () => {
  let ctx
  beforeEach(() => {
    ctx = app.mockContext({})
  })
  it('getRankingList', async () => {
    const data = await ctx.service.bookAPI.getRankingList()
    expect(Array.isArray(data)).toEqual(true)
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
  it.only('getStockList', async () => {
    // 桐乡: 市店3304830001，部门12, 购书中心3304830006，部门12
    // 衢州店号3308000001部门50
    const data = await ctx.service.bookAPI.getStockList('3308000001', '4063544', '50')
    // const data = await ctx.service.bookAPI.getStockList('3304830001', '4063544', '12')
    expect(data.length > 0).toEqual(true)
    /**
     * {"mdkc":[{"bmbh":"50","jwkcs":[{"jwkc":[{"jwh":"架位号:11001","lbmc":"哲学","lc":"三楼右侧(北)社科区","zjs":"4"}]}],"mddh":"057788225231","mddz":"温州公园路158弄8号(宏"mdzkc":"4"},{"bmbh":"36","jwkcs":[{"jwkc":[{"jwh":"架位号:1","lbmc":"哲学","lc":"新书区","zjs":"2"}]}],"mddh":"057763482495","mddz":"洞头县北岙镇中心街76号","mdjc":"]}
     */
    // expect(data.mdkc.length > 0).toEqual(true)
  })
  it('getRecommendBooks', async () => {
    ctx.service.bookAPI.getRecommendBooks('4087393')
  })
  it('searchBookByName', async () => {
    const data = await ctx.service.bookAPI.searchBookByName('中华人民共和国宪法(宣誓本)')
    expect(data[0].sm).toMatch(/宪法/)
  })
  it('searchBookByKeyword', async () => {
    const data = await ctx.service.bookAPI.searchBookByKeyword('中华人民共和国宪法')
    expect(data.length > 0).toEqual(true)
  })
})
