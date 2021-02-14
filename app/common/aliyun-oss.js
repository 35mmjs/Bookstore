const path = require('path')
const OSS = require('ali-oss')

const { STS } = OSS


const policy = `{
  "Statement": [
    {
      "Action": [
        "oss:*"
      ],
      "Effect": "Allow",
      "Resource": ["acs:oss:*:*:*"]
    }
  ],
  "Version": "1"
}`
const stsConfig = {
  AccessKeyId: 'LTAIXZPnYB9FYzcq',
  AccessKeySecret: 'En6KmB4OYQvUULv80QSNLgYhlRgZ3S',
  RoleArn: 'acs:ram::1669745743235719:role/bookstore-admin-user1',
  Bucket: 'bookstore-prod',
  // 建议 Token 失效时间为 1 小时
  TokenExpireTime: '3600',
  PolicyFile: policy,
}

const ossConfig = {
  AccessKeyId: 'LTAIXZPnYB9FYzcq',
  AccessKeySecret: 'En6KmB4OYQvUULv80QSNLgYhlRgZ3S',
  Bucket: 'bookstore-public',
  // Bucket: 'bookstore-prod',
  Region: 'oss-cn-hangzhou',
}

/**
 * sts 用于客户端上传鉴权
 */
function getOssStsToken() {
  return new Promise((resolve, reject) => {
    const client = new STS({
      // region: '<oss region>',
      // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
      accessKeyId: stsConfig.AccessKeyId,
      accessKeySecret: stsConfig.AccessKeySecret,
      bucket: stsConfig.Bucket,
    })

    // TODO 需要判断失效时间
    client.assumeRole(stsConfig.RoleArn, stsConfig.policy, stsConfig.TokenExpireTime).then((result) => {
      result = result.credentials
      const res = {
        id: result.AccessKeyId,
        secret: result.AccessKeySecret,
        token: result.SecurityToken,
      }
      resolve(res)
    }).catch((err) => {
      reject(err)
    })
  })
}

/**
 * 用于服务端上传, 所以不需要sts来做权限控制, 目前后台是全oss可读
 * 所以没有RoleAn这个参数
 * 文档上传方式参考 https://help.aliyun.com/document_detail/32072.html?spm=a2c4g.11186623.4.1.4aea10d5H0yBQh
 */
function uploadBundle(filePath, filename) {
  return new Promise((res, rej) => {
    const client = new OSS({
      region: ossConfig.Region,
      accessKeyId: ossConfig.AccessKeyId,
      accessKeySecret: ossConfig.AccessKeySecret,
      bucket: ossConfig.Bucket,
      timeout: '30m', // 设置成30分钟来解决超时问题
    })
    // example object表示上传到OSS的Object名称，localfile表示本地文件或者文件路径
    client.put(filename || path.basename(filePath), filePath).then((r1) => {
      if (r1.res.status === 200) {
        res(r1.url)
      } else {
        rej(r1.res.statusMessage)
      }
    }).catch((err) => {
      rej(err)
    })
  })
}

module.exports = {
  getOssStsToken,
  uploadBundle,
}
