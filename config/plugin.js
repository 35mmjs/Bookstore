const path = require('path')

exports.static = true

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
}
exports.webpack = {
  enable: true,
  path: path.join(__dirname, '../plugin/egg-webpack'),
}
