module.exports = {
  name: {
    type: 'string',
    max: 16,
    required: true,
    label: '门店名字',
  },
  store_code: {
    type: 'string',
    required: true,
    label: '门店号',
    placeholder: '门店号-部门号-数据源, 如:3233137-40-liuzhou',
  },
  addr: {
    type: 'string',
    required: false,
    label: '门店地址',
  },
  config: {
    type: 'json',
    required: false,
    label: '配置信息',
  },
}
