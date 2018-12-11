
module.exports = app => {
  if (!app.config.webpack.startWebpackServer) {
    // 加入静态资源中间件
    app.config.coreMiddleware.push('webpackStatic')
    return
  }
  app.messenger.on('webpackAddressChanged', address => {
    // eslint-disable-next-line no-param-reassign
    app.config.webpack.staticUrl = address
  })
  app.messenger.sendToAgent('egg-webpack-worker-started')
}
