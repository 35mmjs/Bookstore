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
  return config
}
