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

const storeRoutes = {
  findAll: '/store/manage',
  create: 'store/manage/detail/:operation(new)',
  editOne: 'store/manage/detail/:id/:operation(edit)',
  findOne: 'store/manage/detail/:id/:operation(view)',
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

const FORM_ITEM_LAYOUT_MODAL = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 15,
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
    value: 1,
  },
  {
    label: '展台',
    value: 2,
  },
]

const VIEW_CONFIG_ID = {
  PUBU_ID: 1,
  ZHANTAI_ID: 2,
}

export default {
  viewConfigRoutes,
  storeRoutes,
  terminalRoutes,
  VIEW_CONFIG_TYPE_MAP,
  VIEW_CONFIG_ID,
  FORM_ITEM_LAYOUT,
  SUBMIT_FORM_LAYOUT,
  FORM_ITEM_LAYOUT_MODAL,
}
