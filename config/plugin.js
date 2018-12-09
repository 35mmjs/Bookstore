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

exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
}

exports.redis = {
  enable: true,
  package: 'egg-redis',
}

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
}

exports.validate = {
  enable: true,
  package: 'egg-validate',
}
