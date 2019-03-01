import React from 'react'
import { getPaihangCatalog, updatePaihangCatalog, getPaihangDetail } from '../../util/services'
import Roundy from "roundy"
import './index.less'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: 50,
    }
  }

  componentDidMount() {
    this.getCatalog()
  }

  getCatalog = () => {
    getPaihangCatalog({
      navId: 1,
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
  }

  upate = () => {
    const { value } = this.state
    console.log('==> value', value)
    updatePaihangCatalog({
      navId: 2,
      catalogId: value,
    }).then(res => {
      console.log('===> res', res)
    })
  }

  onChange = (e) => {
    console.log(e.target.value)
    this.setState({
      value: e.target.value,
    })
  }

  updateValue = (value) => {
    console.log(value)
    this.setState({
      value,
    })
  }

  render() {
    const { value } = this.state
    return (
      <div className="app">
        <div className="wrapper">
          <div className="channel">
            <input type="text" value={this.state.value} onChange={this.onChange} />
            <a onClick={this.upate}>click</a>
            <div className="slider">
              <Roundy
                value={value}
                allowClick
                min={1}
                radius={50}
                max={255}
                render={(state, props) => (
                  <div
                    style={{
                      height: 100,
                      width: 100,
                      transform: `rotate(${state.angle}deg)`,
                      backgroundColor: `hsl(${state.value}, 50%, 50%)`
                    }}
                  />
                )}
                onChange={this.updateValue}
              />  
            </div>
            
          </div>
        </div>
      </div>
    )
  }
}

export default App
