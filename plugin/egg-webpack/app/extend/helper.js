const path = require('path')

module.exports = {
  loadStaticUrl(name) {
    const appConfig = this.ctx.app.config
    let staticUrl = appConfig.webpack.staticUrl
    staticUrl = staticUrl[staticUrl.length - 1] === '/' ? staticUrl.substr(0, -1) : staticUrl
    // from dist cache
    if (!appConfig.webpack.startWebpackServer) {
      let mapJson = {}
      try {
        // eslint-disable-next-line global-require,import/no-unresolved,import/no-dynamic-require
        mapJson = require(path.join(this.ctx.app.baseDir, './dist/map.json'))
      } catch (e) { /* */ }
      return `${staticUrl}/${mapJson[name] || name}`
    }
    return `${staticUrl}/${name}`
  },
}
