/* eslint-disable */
module.exports = {
  '/mock/*': function(req, res) {
    // 默认自带
    // res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'HEAD, GET, POST, PUT, PATCH, DELETE')
    // 添加 custom header 满足跨域要求
    res.set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, x-csrf-token, X-Requested-With')
    let data = {}
    let url = `${req.url.replace('.json', '.js').split('?')[0]}`
    const path = './mock/' + url.split('/mock/')[1].replace('/', '.')
    try {
      data = require(path)
    } catch (e) {
      return res.json({ success: false, error: e.message })
    }
    if (typeof data === 'function') {
      return data(req, res)
    }
    return res.json(data)
  },
}
