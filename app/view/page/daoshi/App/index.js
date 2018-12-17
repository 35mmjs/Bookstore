import React from 'react'
import Map from '../Map'
import Books from '../Books'
import './index.less'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="app">
        <div className="warpper">
          <div className="title" />
          <Map />
          <Books />
        </div>
      </div>
    )
  }
}

export default App
