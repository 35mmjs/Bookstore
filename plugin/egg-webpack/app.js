
module.exports = app => {
  if (!app.config.webpack.startWebpackServer) return
  app.messenger.on('webpackAddressChanged', address => {
    // eslint-disable-next-line no-param-reassign
    app.config.webpack.staticUrl = address
  })
  app.messenger.sendToAgent('egg-webpack-worker-started')
}
