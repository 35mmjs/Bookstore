import React from 'react'
// import { HashRouter as Router, Route } from 'react-router-dom'
import { HashRouter as Router, Route, Switch } from 'dva/router'
import dva from 'dva'
import dynamic from 'dva/dynamic'
import Layout from '../component/layout'
import constant from '../common/constant'
import Enterprise from '../component/enterprise/index'
import User from '../component/user/index'
import Terminal from '../component/terminal/index'
import Store from '../component/store/index'
import TerminalDetail from '../component/terminalDetail'
import ViewConfig from '../component/viewConfig'
import ViewConfigDetail from '../component/viewConfigDetail'
import Home from '../component/home/index'
import TrackerDataView from '../component/tracker/index'

const {
  viewConfigRoutes,
  terminalRoutes,
  storeRoutes,
  trackerRoutes,
} = constant

const Employee = () => <h2>Home</h2>

let menu = [
  {
    label: '门店管理',
    value: '/store/manage',
    icon: 'shop',
    children: window.appData.loginUser.store
      ? [
          {
            label: '配置中心',
            value: '/view-config/manage',
            icon: 'hdd',
            children: null,
          },
          {
            label: '终端管理',
            value: '/terminal/manage',
            icon: 'desktop',
          },
        ]
      : null,
  },
  {
    label: '用户管理',
    icon: 'team',
    value: '/user',
    children: null,
  },
  {
    label: '埋点数据',
    icon: 'hdd',
    value: '/tracker/data-view',
    children: null,
  },
]

if (window.appData.loginUser.isAdmin) {
  menu.unshift({
    label: '企业管理',
    icon: 'bank',
    value: '/enterprise',
    children: null,
  })
}

if (
  !window.appData.loginUser.isAdmin &&
  !window.appData.loginUser.isEnterpriseUser
) {
  menu = [
    {
      label: '配置中心',
      value: '/view-config/manage',
      icon: 'hdd',
      children: null,
    },
    {
      label: '终端管理',
      value: '/terminal/manage',
      icon: 'desktop',
    },
    {
      label: '用户管理',
      icon: 'team',
      value: '/user',
      children: null,
    },
    {
      label: '埋点数据',
      icon: 'hdd',
      value: '/tracker/data-view',
      children: null,
    },
  ]
}

const app = dva()

// https://blog.csdn.net/Meditate_MasterYi/article/details/79730214
const routeMap = () => {
  return [
    {
      path: '/',
      component: () => Home,
    },
    {
      path: 'employee',
      models: () => [require('../component/viewConfig/model')],
      component: () => Employee,
    },
    {
      path: '/enterprise',
      component: () => Enterprise,
    },
    {
      path: '/user',
      component: () => User,
    },
    {
      path: storeRoutes.findAll,
      // models: () => [require('../component/store/model')],
      component: () => Store,
    },
    {
      path: terminalRoutes.findAll,
      models: () => [
        require('../component/terminal/model'),
        require('../component/viewConfig/model'),
        require('../component/store/model'),
      ],
      component: () => Terminal,
    },
    {
      path: viewConfigRoutes.findAll,
      models: () => [require('../component/viewConfig/model')],
      component: () => ViewConfig,
    },
    {
      path: viewConfigRoutes.findOne,
      models: () => [require('../component/viewConfigDetail/model')],
      component: () => ViewConfigDetail,
    },
    {
      path: viewConfigRoutes.editOne,
      models: () => [require('../component/viewConfigDetail/model')],
      component: () => ViewConfigDetail,
    },
    {
      path: viewConfigRoutes.create,
      models: () => [require('../component/viewConfigDetail/model')],
      component: () => ViewConfigDetail,
    },
    {
      path: trackerRoutes.findAll,
      models: () => [require('../component/tracker/model')],
      component: () => TrackerDataView,
    },
  ]
}

class AppRouter extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <Layout menu={menu}>
        <Router>
          <Switch>
            {routeMap().map(({ path, ...dynamics }, key) => {
              return (
                <Route
                  key={path}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics,
                  })}
                />
              )
            })}
          </Switch>
        </Router>
      </Layout>
    )
  }
}

app.router(() => <AppRouter />)
const Demo = app.start()
export default Demo
