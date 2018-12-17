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

const VIEW_CONFIG_TYPES = [
  {
    label: '瀑布',
    value: 'pubu',
  },
  {
    label: '展台',
    value: 'zhantai',
  },
]

export default {
  viewConfigRoutes,
  terminalRoutes,
  VIEW_CONFIG_TYPES,
}
