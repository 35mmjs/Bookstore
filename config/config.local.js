// 开发模式关闭安全校验
module.exports = () => {
  const config = {}
  config.security = {
    xframe: {
      enable: false,
    },
    csrf: {
      enable: false,
    },
  }
  return config
}
