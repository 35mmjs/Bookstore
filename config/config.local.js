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
