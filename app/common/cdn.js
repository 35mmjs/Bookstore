/* eslint-disable import/no-extraneous-dependencies */
const qiniu = require('qiniu')

const config = {}
config.cdn = {
  QINIU_ACCESS_KEY: 'rMuPOEhqC8_B3yxqsNfNG1ho75YecTa4MdR3J-nY',
  QINIU_SECRET_KEY: 'Pz2yOnEO4kofFcjWq8Kx4FoeWh_IpHnidTXaf6pz',
  BUCKET: 'bookstore-prod',
}

function genQiniuToken() {
  const accessKey = config.cdn.QINIU_ACCESS_KEY
  const secretKey = config.cdn.QINIU_SECRET_KEY

  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)

  const bucket = config.cdn.BUCKET

  const options = {
    scope: bucket,
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return uploadToken
}

module.exports = {
  genQiniuToken,
}
