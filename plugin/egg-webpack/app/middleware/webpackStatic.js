const sendfile = require('koa-send')
const path = require('path')

let entryKeys
function isPrefixWith(target, prefix) {
  return target.slice(0, prefix.length) === prefix
}

module.exports = (options, app) => (
  // eslint-disable-next-line consistent-return
  async function assets(ctx, next) {
    const staticPath = app.config.webpack.staticUrl
    if (!isPrefixWith(ctx.path, staticPath)) {
      await next()
      return
    }

    let entryName = ctx.path.slice(staticPath.length)
    entryName = entryName[0] === '/' ? entryName.slice(1) : entryName
    if (!entryKeys) {
      // eslint-disable-next-line global-require,import/no-unresolved,import/no-dynamic-require
      const mapJson = require(path.join(app.baseDir, './dist/map.json'))
      entryKeys = Object.keys(mapJson).map(k => mapJson[k])
    }
    if (entryKeys.includes(entryName)) {
      await sendfile(ctx, entryName, {
        root: path.join(app.baseDir, './dist'),
        maxage: 1000 * 60 * 60 * 24 * 30, // 30天
      })
    }
  }
)
