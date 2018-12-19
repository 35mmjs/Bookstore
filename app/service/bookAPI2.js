const { Service } = require('egg')
const querystring = require('querystring')
const http = require('http')

/**
 * 中金的API接口
 */
class BookAPI2Service extends Service {
  constructor(...args) {
    super(...args)
    this.bookConfig = this.app.config.bookAPI2
  }
  fetch() {
    return new Promise((response, reject) => {
      const postData = querystring.stringify({
        msg: 'Hello World!',
      })
      const options = {
        host: 'ec1dbcdea7084714a62fc480c469abff-cn-shanghai.alicloudapi.com/getStoreProdRank',
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          // 'Content-Length': Buffer.byteLength(postData),
          'X-Ca-Key': this.bookConfig.appKey,
        },
      }
      const req = http.get(options, (res) => {
        res.setEncoding('utf8')
        res.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`)
        })
        res.on('end', () => {
          response()
        })
      })
      req.on('error', (e) => {
        reject(e)
      })
      // write data to request body
      // req.write(postData)
      // req.end()
    })
  }
}

module.exports = BookAPI2Service
