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

const trackerRoutes = {
  findAll: '/tracker/data-view',
}

const NORMAL_MAP = {
  name: '名称',
  content: '内容',
  created_at: '创建时间',
  updated_at: '更新时间',
  type: '类型',
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

const FORM_ITEM_LAYOUT_VERTICAL = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
    md: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 24 },
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
    md: { span: 8, offset: 8 },
  },
}

const VIEW_CONFIG_TYPE_MAP = [
  {
    label: '瀑布',
    value: 1,
    chicun: '1080px*3840px',
  },
  {
    label: '展台',
    value: 2,
    chicun: '1920px*360px',
  },
  {
    label: '导视',
    value: 3,
    chicun: '1920px*1080px',
  },
  {
    label: '排行控制台',
    value: 4,
    chicun: '1080px*1920px',
  },
  {
    label: '排行榜',
    value: 5,
    chicun: '旧pad 800px*1280px，新pad 1200px*1920px',
  },
  {
    label: '新排行控制台',
    value: 6,
    chicun: '1080px*1920px',
  },
]

const VIEW_CONFIG_ID = {
  PUBU_ID: 1,
  ZHANTAI_ID: 2,
  DAOSHI_ID: 3,
  PAIHANG_CONTROL_ID: 4,
  PAIHANG_ID: 5,
  NEW_PAIHANG_CONTROL_ID: 6,
}

export default {
  viewConfigRoutes,
  storeRoutes,
  terminalRoutes,
  trackerRoutes,
  VIEW_CONFIG_TYPE_MAP,
  VIEW_CONFIG_ID,
  FORM_ITEM_LAYOUT,
  SUBMIT_FORM_LAYOUT,
  FORM_ITEM_LAYOUT_MODAL,
}
