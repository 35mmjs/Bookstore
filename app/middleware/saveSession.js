module.exports = () => {
  return function* (next) {
    yield next
    if (!this.session || !this.session.userId) return
    this.session.save()
  }
}
