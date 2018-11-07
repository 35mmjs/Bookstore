function createWebpackMiddleware(publicPath, webpackConfig) {
  const webpack = require('atool-build/lib/webpack')
  const ProgressPlugin = webpack.ProgressPlugin
  const webpackMiddleware = require('koa-webpack-dev-middleware')
  const compiler = webpack(webpackConfig)
  const outputConfig = {
    publicPath,
    noInfo: true,
    progress: true,
  }

  compiler.apply(new ProgressPlugin((percentage, msg) => {
    const stream = process.stderr
    if (stream.isTTY && percentage < 0.71) {
      stream.cursorTo(0)
      stream.write(msg)
      stream.clearLine(1)
    } else if (percentage === 1) {
      console.log('\n[egg-webpack]: bundle build is now finished.')
    }
  }))
  return webpackMiddleware(compiler, outputConfig)
}

module.exports = (options) => {
  const { getWebpackDevConfig } = require('../build/buildUtil')
  const webpackConfig = getWebpackDevConfig(options.baseDir)
  return createWebpackMiddleware('/', webpackConfig)
}
