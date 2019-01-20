const path = require('path')
const expect = require('expect')
const { uploadBundle } = require('../../../app/common/aliyun-oss')

describe('common/aliyun-oss', () => {
  it('upload bundle', async () => {
    const file = path.join(__dirname, './aliyun-oss.test.js')
    const url = await uploadBundle(file)
    expect(typeof url).toEqual('string')
  })
})
