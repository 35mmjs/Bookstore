const address = require('address')
const staticServer = require('./lib/staticServer')

module.exports = agent => {
  const agentConfig = agent.config
  const startWebpackServer = agentConfig.webpack.startWebpackServer
  if (!startWebpackServer) return
  let origin
  let domain = address.ip()
  let protocol = 'http'
  let startOptions = {}
  if (process.argv[2]) {
    try {
      startOptions = JSON.parse(process.argv[2])
    } catch (err) {
      agent.coreLogger.debug('[egg-webpack] ignore JSON parse %j error', process.argv[2])
    }
  }

  agent.beforeStart(function* () {
    const options = {
      appname: agentConfig.name,
      // eslint-disable-next-line import/no-dynamic-require,global-require
      middleware: require('./lib/middleware/webpack'),
      config: {
        baseDir: agentConfig.baseDir,
      },
      logger: agent.logger,
      https: startOptions.https,
      key: startOptions.key,
      cert: startOptions.cert,
    }
    const server = yield staticServer(options)

    if (startOptions.https) {
      // chair-bin dev --https 启动会设置 EGG_SERVER_LOCAL_DOMAIN 环境变量
      domain = startOptions.domain || process.env.EGG_SERVER_LOCAL_DOMAIN || domain
      protocol = 'https'
    }
    origin = `${protocol}://${domain}:${server.port}`
    agent.logger.info('[egg-webpack] %s webpack server started on %s',
      agentConfig.name, origin)
  })

  // 需要等待 App Worker 启动成功后才能发送，不然很可能丢失
  agent.messenger.once('egg-ready', () => {
    agent.messenger.sendToApp('webpackAddressChanged', origin)
    // 监听后续 worker reload
    agent.messenger.on('egg-webpack-worker-started', () => {
      agent.messenger.sendToApp('webpackAddressChanged', origin)
    })
  })
}

