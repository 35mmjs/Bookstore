import React from 'react'
import Cover from './cover'
import Detail from './detail'

import './index.less'

class App extends React.Component {
  componentDidMount() {

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
