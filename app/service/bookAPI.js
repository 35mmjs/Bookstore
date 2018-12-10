const { Service } = require('egg')
const soap = require('soap')

class BookAPIService extends Service {
  constructor(...args) {
    super(...args)
    this.SDK_URL = this.app.config.bookAPI.url
  }
  fetch() {
    const params = {
      appMethod: 'sdkcBySpbs',
      khid: '9999999998',
      md5_value: '',
      par_type: 'json',
      par_value: JSON.stringify({ params: { kcdh: '9999999998', spbs: '0379419' } }),
    }
    return new Promise((resolve, reject) => {
      soap.createClient(this.SDK_URL, (err, client) => {
        if (err) {
          reject(err)
          return
        }
        client.sv_service(params, (err2, result) => {
          if (err2) {
            reject(err2)
            return
          }
          console.log(result)
          resolve(result)
        })
      })
    })
  }
}

module.exports = BookAPIService
