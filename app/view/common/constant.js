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

export default {
  viewConfigRoutes,
  terminalRoutes,
}
