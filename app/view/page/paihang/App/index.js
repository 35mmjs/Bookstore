import React from 'react'
import { getPaihangCatalog, updatePaihangCatalog } from '../../util/services'
// import RoundSlider from '../roundSlider'
import './index.less'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    getPaihangCatalog({
      channelId: 1
    }).then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div className="app">
        <div className="wrapper">
          <div className="channel">
            {/* <RoundSlider
              value={100}
              rotationOffset={-45}
              arcSize={270}
              allowClick={true}
            /> */}
          </div>
        </div>
      </div>
    )
  }
}

export default App
