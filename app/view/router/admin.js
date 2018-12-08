import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Layout from '../component/layout'
import Enterprise from '../component/enterprise/index'
import Terminal from '../component/terminal/index'
import Store from '../component/store/index'
import TerminalDetail from '../component/terminalDetail'

const Index = () => <h2>Home</h2>
const About = () => <h2>About</h2>
const Users = () => <h2>Users</h2>


// export default class AppRouter extends React.Component {
//   constructor() {
//     super()
//     this.state = {}
//   }
//   render() {
//     return (
//       <Router>
//         <div>
//           <Layout path="/" exact component={Index} />
//           <Layout path="/home" exact component={Index} />
//           <Layout path="/about/" component={About} />
//           <Layout path="/users/" component={Users} />
//         </div>
//       </Router>
//     )
//   }
// }

const menu = [
  {
    label: '配置中心',
    value: 'config',
    icon: 'file',
    children: [
      {
        label: '终端大盘',
        value: 'terminal-static',
        children: null,
      },
      {
        label: '配置录入',
        value: 'new-config',
        children: null,
      },
    ],
  },
  {
    label: '终端管理',
    value: 'terminal/manage',
    children: null,
  },
  {
    label: '员工管理',
    value: 'employee',
    icon: 'file',
    children: null,
  },
  {
    label: '门店管理',
    value: 'store',
    icon: 'user',
    children: [

      {
        label: 'option2-2',
        value: 'option2-2',
        children: null,
      },
    ],
  },
  {
    label: '企业管理',
    icon: 'file',
    value: 'enterprise',
    children: null,
  },
  {
    label: '用户管理/管理员',
    icon: 'file',
    value: 'user',
    children: null,
  },
]

export default class AppRouter extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <Layout menu={menu}>
        <Router>
          <div>
            <Route path="/" exact component={Index} />
            <Route path="/home" exact component={Index} />
            <Route path="/about/" component={About} />
            <Route path="/users/" component={Users} />
            <Route path="/enterprise" component={Enterprise} />
            <Route path="/store" component={Store} />
            <Route path="/terminal/manage" exact component={Terminal} />
            <Route path="/terminal/manage/detail/:id" exact component={TerminalDetail} />
            <Route path="/terminal/manage/detail/:id/:operation(edit)" exact component={TerminalDetail} />
          </div>
        </Router>
      </Layout>
    )
  }
}

