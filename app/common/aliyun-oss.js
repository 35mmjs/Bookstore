const { STS } = require('ali-oss')


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
const config = {
  AccessKeyId: 'LTAIXZPnYB9FYzcq',
  AccessKeySecret: 'En6KmB4OYQvUULv80QSNLgYhlRgZ3S',
  RoleArn: 'acs:ram::1669745743235719:role/bookstore-admin-user1',
  Bucket: 'bookstore-prod',
  // 建议 Token 失效时间为 1 小时
  TokenExpireTime: '3600',
  PolicyFile: policy,
}

function ossInit() {
  return new Promise((resolve, reject) => {
    const client = new STS({
      // region: '<oss region>',
      // 云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
      accessKeyId: config.AccessKeyId,
      accessKeySecret: config.AccessKeySecret,
      bucket: config.Bucket,
    })

    // TODO 需要判断失效时间
    client.assumeRole(config.RoleArn, config.policy, config.TokenExpireTime).then((result) => {
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

module.exports = {
  ossInit,
}
