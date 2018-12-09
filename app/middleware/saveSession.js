module.exports = () => {
  // 延长用户登陆session的有效时间
  return async function (ctx, next) {
    await next()
    if (!ctx.session || !ctx.session.userId) return
    ctx.session.save()
  }
}
