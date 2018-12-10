const { app } = require('egg-mock/bootstrap')

describe('test/app/service/bookAPI.test.js', () => {
  it('fetch', async () => {
    const ctx = app.mockContext({})
    await ctx.service.bookAPI.fetch()
  })
})
