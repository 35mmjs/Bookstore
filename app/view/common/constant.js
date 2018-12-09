const viewConfigRoutes = {
  create: '/view-config/manage/detail/:operation(new)',
  findAll: '/view-config/manage',
  editOne: '/view-config/manage/detail/:id/:operation(edit||view)',
  findOne: '/view-config/manage/detail/:id/:operation(edit||view)',
}

export default {
  viewConfigRoutes,
}
