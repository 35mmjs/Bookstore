import React from 'react'
import { getPaihangDetail } from '../../util/services'
import Cover from './cover'
import Detail from './detail'

import './index.less'

class App extends React.Component {
  componentDidMount() {
    this.getData()
  }

  getData = () => {
    this.timeout = setTimeout(() => {
      getPaihangDetail().then(res => {
        console.log('123131', res)
        this.getData()
      })
    }, 3000)
  }

  render() {
    return (
      <div className="app">
        <div className="wrapper">
          <Cover />
          <Detail />
        </div>
      </div>
    )
  }
}

export default App
