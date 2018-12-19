const viewConfigRoutes = {
  create: '/view-config/manage/detail/:operation(new)',
  findAll: '/view-config/manage',
  editOne: '/view-config/manage/detail/:id/:operation(edit)',
  findOne: '/view-config/manage/detail/:id/:operation(view)',
}
const terminalRoutes = {
  findAll: '/terminal/manage',
  create: 'terminal/manage/detail/:operation(new)',
  editOne: 'terminal/manage/detail/:id/:operation(edit)',
  findOne: 'terminal/manage/detail/:id/:operation(view)',
}

const FORM_ITEM_LAYOUT = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
}
const SUBMIT_FORM_LAYOUT = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
}

const VIEW_CONFIG_TYPE_MAP = [
  {
    label: '瀑布',
    value: 0,
  },
  {
    label: '展台',
    value: 1,
  },
]

const VIEW_CONFIG_ID = {
  PUBU_ID: 0,
  ZHANTAI_ID: 1,
}

export default {
  viewConfigRoutes,
  terminalRoutes,
  VIEW_CONFIG_TYPE_MAP,
  VIEW_CONFIG_ID,
  FORM_ITEM_LAYOUT,
  SUBMIT_FORM_LAYOUT,
}
