module.exports = () => {
  const config = {}
  config.security = {
    xframe: {
      enable: false,
    },
  }
  return config
}
