module.exports = {
  loadStaticUrl(name) {
    let staticUrl = this.ctx.app.config.webpack.staticUrl
    staticUrl = staticUrl[staticUrl.length - 1] === '/' ? staticUrl.substr(0, -1) : staticUrl
    return `${staticUrl}/${name}`
  },
}
