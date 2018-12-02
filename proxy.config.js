/* eslint-disable */
module.exports = {
  '/mock/*': function(req, res) {
    let data = {}
    let url = `${req.url.replace('.json', '.js').split('?')[0]}`
    const path = './mock/' + url.split('/mock/')[1].replace('/', '.')
    try {
      data = require(path)
      console.log('aaaaaaaa', req.url, path, data)
    } catch (e) {
      return res.json({ success: false, error: e.message })
    }
    if (typeof data === 'function') {
      return data(req, res)
    }
    return res.json(data)
  },
}
