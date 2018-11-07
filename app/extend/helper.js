module.exports = {
  getAppDataScript(appData) {
    return `window.appData = ${JSON.stringify(appData) || '{}'}`
  },
}
