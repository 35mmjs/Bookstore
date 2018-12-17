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
}
