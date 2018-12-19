// 开发模式关闭安全校验
module.exports = () => {
  const config = {}
  // TODO 记得删除掉
  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  }
  // redis
  config.redis = {
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: process.env.REDIS_PASSWORD || '', // no password
      db: '0',
    },
    app: true,
  }

  // 目前针对open api不做登录校验
  config.loginCheck = {
    ignore: '/open',
  }

  // 开放接口允许跨域(临时)
  config.setCors = {
    match: '/open',
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
      password: process.env.MYSQL_PASSWORD || 'BookStore2018@!MYSQL',
      // 数据库名
      database: 'BOOKSTORE',
    },
    app: true,
    agent: false,
  }

  return config
}
