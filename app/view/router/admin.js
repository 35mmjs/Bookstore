import React from 'react'
// import { HashRouter as Router, Route } from 'react-router-dom'
import { HashRouter as Router, Route, Switch } from 'dva/router'
import createLoading from 'dva-loading';
import dva from 'dva'
import dynamic from 'dva/dynamic'
import Layout from '../component/layout'
import constant from '../common/constant'
import Enterprise from '../component/enterprise/index'
import User from '../component/user/index'
import AdsCenter from '../component/adsCenter/index'
import TerminalControl from '../component/terminalControl/index'
import TerminalTask from '../component/terminalTask/index'
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
            label: '发布中心',
            value: '/view-config/manage',
            icon: 'hdd',
            children: null,
          },
          {
            label: '设备中心',
            value: '/terminal/manage',
            icon: 'desktop',
            children:
            [
              {
                label: '设备控制',
                value: '/terminal-control',
                icon: 'hdd',
                children: null,
              },
              {
                label: '查看终端任务',
                value: '/terminal-task',
                icon: 'desktop',
              },
            ],
          },
        ]
      : null,
  },
  {
    label: '广告管理',
    icon: 'team',
    value: '/ads',
    children: null,
  },
  {
    label: '用户中心',
    icon: 'team',
    value: '/user',
    children: null,
  },
  {
    label: '数据中心',
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
      label: '发布中心',
      value: '/view-config/manage',
      icon: 'hdd',
      children: null,
    },
    {
      label: '设备中心',
      value: '/terminal/manage',
      icon: 'desktop',
    },
    {
      label: '广告管理',
      icon: 'team',
      value: '/ads',
      children: null,
    },
    {
      label: '用户中心',
      icon: 'team',
      value: '/user',
      children: null,
    },
    {
      label: '数据中心',
      icon: 'hdd',
      value: '/tracker/data-view',
      children: null,
    },
  ]
}

if (window.appData.loginUser.isStoreManager) {
  menu = [
    {
      label: '发布中心',
      value: '/view-config/manage',
      icon: 'hdd',
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
      path: '/ads',
      models: () => [require('../component/adsCenter/model')],
      component: () => AdsCenter,
    },
    {
      path: '/terminal-control',
      models: () => [require('../component/terminalControl/model')],
      component: () => TerminalControl,
    },
    {
      path: '/terminal-task',
      models: () => [require('../component/terminalTask/model')],
      component: () => TerminalTask,
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
app.use(createLoading());

app.router(() => <AppRouter />)
const Demo = app.start()
export default Demo
