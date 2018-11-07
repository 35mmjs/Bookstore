module.exports = appInfo => {
  const config = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = `${appInfo.name}_1541304366148_5290`

  // add your config here
  config.middleware = []

  config.view = {
    defaultViewEngine: 'nunjucks',
  }

  config.security = {
    xframe: {
      value: 'SAMEORIGIN',
    },
  }
  return config
}
