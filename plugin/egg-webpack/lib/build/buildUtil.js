const glob = require('glob')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')
const getWebpackCommonConfig = require('atool-build/lib/getWebpackCommonConfig')
const mergeCustomConfig = require('atool-build/lib/mergeCustomConfig')

const EXTENSIONS = '*.@(js|jsx)'

function normalize(str) {
  return str.replace(/\\/g, '\\')
}

function getEntry(cwd) {
  const viewsEntry = path.join(cwd, 'app/view/entry')
  return glob.sync(EXTENSIONS, { cwd: viewsEntry }).reduce((files, file) => Object.assign(files, { [path.basename(file, path.extname(file))]: `${viewsEntry}/${file}` }), {})
}

function generateTempConfig(cwd, configFile, data) {
  const tempDir = path.join(cwd, './run/webpack-build')
  mkdirp.sync(tempDir)

  const template = fs.readFileSync(path.join(__dirname, `${configFile}.template`), 'utf8')
  const content = template.replace(/{{ (\w+) }}/g, (str, key) => data[key])

  const configPath = path.join(tempDir, configFile)
  fs.writeFileSync(configPath, content, { encoding: 'utf8' })

  return configPath
}

function getWebpackProductConfigPath(cwd) {
  const entry = getEntry(cwd)
  const model = {
    entry: JSON.stringify(entry),
    outputPath: normalize(path.join(cwd, './dist/')),
    mapJsonPath: normalize(path.join(cwd, './run/webpack-build/map.json')),
  }

  return generateTempConfig(cwd, 'webpack.config.js', model)
}

function getWebpackDevConfig(cwd) {
  const webpackCommonConfig = getWebpackCommonConfig({ cwd })
  const entry = getEntry(cwd)
  const model = {
    entry: JSON.stringify(entry),
    outputPath: normalize(path.join(cwd, './dist/')),
  }
  const devConfigPath = generateTempConfig(cwd, 'webpack.dev.config.js', model)
  return mergeCustomConfig(webpackCommonConfig, devConfigPath)
}

module.exports = {
  getWebpackProductConfigPath,
  getWebpackDevConfig,
}
