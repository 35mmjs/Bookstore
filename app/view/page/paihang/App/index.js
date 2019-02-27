import React from 'react'
import RoundSlider from '../roundSlider'
import './index.less'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <div className="app">
        <div className="wrapper">
          <div className="channel">
            <RoundSlider
              value={100}
              rotationOffset={-45}
              arcSize={270}
              allowClick={true}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default App
