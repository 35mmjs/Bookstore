import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import Layout from '../component/layout'
import Enterprise from '../component/enterprise/index'

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
    label: 'option1',
    value: 'option1',
    icon: 'file',
    children: null,
  },
  {
    label: 'option2',
    value: 'option2',
    icon: 'user',
    children: [
      {
        label: 'enterprise',
        value: 'enterprise',
        children: null,
      },
      {
        label: 'option2-2',
        value: 'option2-2',
        children: null,
      },
    ],
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
          </div>
        </Router>
      </Layout>
    )
  }
}

