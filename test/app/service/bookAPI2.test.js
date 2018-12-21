const { app } = require('egg-mock/bootstrap')
const expect = require('expect')

describe('test/app/service/bookAPI2.test.js', () => {
  let ctx
  beforeEach(() => {
    ctx = app.mockContext({})
  })
  it.skip('getRinkingList', async () => {
    const data = await ctx.service.bookAPI2.fetch()
  })
})
