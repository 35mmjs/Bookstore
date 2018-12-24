const { filter, omit } = require('../common/utils')

const notEmpty = (payload) => {
  payload = omit(payload, ['updated_at', 'created_at'])
  const notEmptyPayload = filter(payload, (value, key) => !(value === '' || value === 'null' || value === 'undefined'))
  return notEmptyPayload
}
module.exports = () => {
  // 处理request当中, 去除没有value的key
  return async function (ctx, next) {
    if (ctx.query) {
      ctx.query = notEmpty(ctx.query)
    }
    if (ctx.params) {
      ctx.params = notEmpty(ctx.params)
    }
    if (ctx.request.body) {
      ctx.request.body = notEmpty(ctx.request.body)
    }
    await next()
  }
}
