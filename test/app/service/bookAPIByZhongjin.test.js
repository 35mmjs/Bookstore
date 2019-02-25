const { app } = require('egg-mock/bootstrap')
const expect = require('expect')

describe('test/app/service/bookAPIByZhongjin.test.js', () => {
  let ctx
  beforeEach(() => {
    ctx = app.mockContext({})
  })
  it('getStoreProdRank', async () => {
    const data = await ctx.service.bookAPIByZhongjin.getStoreProdRank({ pageNum: 1, pageSize: 10, storeId: '3300000000330100000112' })
    console.log('aaaaaaaa', data)
    expect(data.pageSize).toEqual(10)
  })
})
