const fs = require('fs')
const Koa = require('koa')

module.exports = options => {
  const app = new Koa()
  app.config = options.config
  app.use(options.middleware(Object.assign({}, options.config, { logger: options.logger })))
  app.on('error', err => options.logger.error(err))
  return new Promise(resolve => {
    let server
    if (options.https) {
      server = require('https').createServer({
        key: fs.readFileSync(options.key),
        cert: fs.readFileSync(options.cert),
      }, app.callback())
    } else {
      server = require('http').createServer(app.callback())
    }

    server.listen(0, function end() {
      const port = this.address().port
      resolve({ port })
    })
  })
}
