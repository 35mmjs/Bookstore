module.exports = appInfo => {
  const config = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_${process.env.COOKIE_KEYS}`

  // add your config here
  config.middleware = [
    'errorHandler',
    'saveSession',
  ]

  // 模版
  config.view = {
    defaultViewEngine: 'nunjucks',
  }

  // redis
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: process.env.REDIS_PASSWORD,
      db: '0',
    },
    app: true,
  }

  // mysql
  config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
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
    agent: false,
  }

  config.security = {
    xframe: {
      value: `XFRAME_${process.env.XFRAME_VALUE}`,
    },
  }
  return config
}
