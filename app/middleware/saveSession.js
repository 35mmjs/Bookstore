module.exports = () => {
  return async function (ctx, next) {
    await next()
    if (!this.session || !this.session.userId) return
    this.session.save()
  }
}
