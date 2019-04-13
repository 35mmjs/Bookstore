import React from 'react'
import { getPaihangCatalog, updatePaihangCatalog, getPaihangDetail, tracker } from '../../util/services'
// import Roundy from "roundy"
import Roundy from '../roundSlider'
import './index.less'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value1: 0,
      value2: 0,
      catalog1: [],
      catalog2: [],
      id1: '',
      id2: '',
    }
  }

  componentDidMount() {
    this.getCatalog(1)
    this.getCatalog(2)
  }

  getCatalog = (navId) => {
    getPaihangCatalog({
      navId,
    }).then(res => {
      const { data } = res
      if (data.success) {
        if (navId === 1) {
          this.setState({
            catalog1: data.data,
          })
        } else {
          this.setState({
            catalog2: data.data,
          })
        }
      }
    }).catch(err => {
      console.error(err)
    })
  }

  upate = () => {
    const { value } = this.state
    updatePaihangCatalog({
      navId: 2,
      catalogId: value,
    }).then(res => {
      console.log('===> res', res)
    })

    tracker({
      act: 'click',
      biz_type: 'catalog',
      biz_data: value
    })
  }

  updateValue = (channelId, value) => {
    if (channelId === 1) {
      this.setState({
        value1: value,
      })
    } else {
      this.setState({
        value2: value,
      })
    }
  }

  getFontSize = (name) => {
    const len = name.length
    if (len <= 4) return 90
    if (len === 5) return 80
    if (len === 6) return 70
    if (len === 7) return 60
    return 48
  }

  getName = (name) => {
    if (!name) return name
    return name
  }

  getCatalogItem = (catalog, value) => {
    let curr = parseInt(catalog.length * value / 255, 10)
    curr = curr === catalog.length ? curr - 1 : curr
    return catalog[curr]
  }

  onAfterChangeChannel1 = () => {
    const { value1, catalog1, id1 } = this.state
    const curr = this.getCatalogItem(catalog1, value1)
    if (curr) {
      if (curr.id !== id1) {
        this.setState({
          id1: curr.id
        })
        updatePaihangCatalog({
          navId: 1,
          catalogId: curr.id,
        }).then(res => {
          console.log(res.data)
        })
      }
    }
  }

  onAfterChangeChannel2 = () => {
    const { value2, catalog2, id2 } = this.state
    const curr = this.getCatalogItem(catalog2, value2)
    if (curr) {
      if (curr.id !== id2) {
        console.log('should save')
        this.setState({
          id2: curr.id
        })
        updatePaihangCatalog({
          navId: 2,
          catalogId: curr.id,
        }).then(res => {
          console.log(res.data)
        })
      }
    }
  }

  getNextCatalog1 = e => {
    e.preventDefault()
    const { value1, catalog1 } = this.state
    const curr = parseInt(catalog1.length * value1 / 255, 10)
    const next = curr < catalog1.length ? curr + 1 : curr
    const value = Math.ceil(next / catalog1.length * 255)
    this.updateValue(1, value)
  }

  getNextCatalog2 = e => {
    e.preventDefault()
    const { value2, catalog2 } = this.state
    const curr = parseInt(catalog2.length * value2 / 255, 10)
    const next = curr < catalog2.length ? curr + 1 : curr
    const value = Math.ceil(next / catalog2.length * 255)
    this.updateValue(2, value)
  }

  render() {
    const { value1, value2, catalog1, catalog2 } = this.state
    const nav1 = this.getCatalogItem(catalog1, value1)
    const nav2 = this.getCatalogItem(catalog2, value2)
    let name1 = (nav1 && nav1.name) || ''
    let name2 = (nav2 && nav2.name) || ''
    name1 = this.getName(name1)
    name2 = this.getName(name2)

    return (
      <div className="app">
        <div className="wrapper">
          <div className="channel">
            <div className="slider">
              <Roundy
                value={value1}
                allowclick={'true'}
                min={1}
                radius={240}
                max={255}
                arcSize={180}
                render={(state, props) => (
                  <div
                    className="slider-content"
                    style={{
                      width: 480,
                        height: 480,
                        transform: `rotate(${state.angle - 90}deg)`,
                        backgroundImage: `url('https://bookstore-public.oss-cn-hangzhou.aliyuncs.com/onoff_01.png')`
                      }}
                    />
                  )}
                onChange={value => this.updateValue(1, value)}
                onAfterChange={this.onAfterChangeChannel1}
              />  
            </div>
            <div className="catalog">
              <span style={{fontSize: this.getFontSize(name1)}}>
                {name1}
              </span>
            </div>
            <div className="next" onClick={this.getNextCatalog1} />
          </div>
          <div className="channel">
            <div className="slider" style={{ top: '210px', left: '70px' }}>
              <Roundy
                value={value2}
                allowclick={'true'}
                min={1}
                radius={240}
                max={255}
                arcSize={180}
                render={(state, props) => (
                  <div
                    className="slider-content"
                    style={{
                      width: 480,
                      height: 480,
                      transform: `rotate(${state.angle - 90}deg)`,
                      backgroundImage: `url('https://bookstore-public.oss-cn-hangzhou.aliyuncs.com/onoff_02.png')`,
                      backgroundSize: '96px 194px',
                      backgroundPosition: '195px 95px',
                    }}
                  />
                )}
                onChange={value => this.updateValue(2, value)}
                onAfterChange={this.onAfterChangeChannel2}
              />
            </div>
            <div className="catalog" style={{top: '270px'}}>
              <span style={{fontSize: this.getFontSize(name2)}}>
                {name2}
              </span>
            </div>
            <div className="next" onClick={this.getNextCatalog2} style={{top: '270px'}} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
