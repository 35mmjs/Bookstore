module.exports = {
  name: {
    type: 'string',
    max: 16,
    required: true,
    placeholder: '门店名字',
  },
  store_code: {
    type: 'string',
    required: true,
    placeholder: '门店号',
  },
  addr: {
    type: 'string',
    required: false,
    placeholder: '门店地址',
  },
  config: {
    type: 'string',
    required: false,
    placeholder: '门店配置信息',
  },
}
