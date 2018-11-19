module.exports = appInfo => {
  const config = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_1541304366148_5290`

  // add your config here
  config.middleware = []

  // 模版
  config.view = {
    defaultViewEngine: 'nunjucks',
  }

  // redis
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: '0',
    },
    app: true,
  }

  // mysql
  exports.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: process.env.MYSQL_PASSWORD,
      // 数据库名
      database: 'BOOKSTORE',
    },
    app: true,
  }

  config.security = {
    xframe: {
      value: 'SAMEORIGIN',
    },
  }
  return config
}
