import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import data from './data'
import './index.less'

export default class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      x: 0,
      y: 0,
      lx: 0,
      ly: 0,
    }
  }

  componentDidMount() {
    this.getFloors()
    const { location = 1 } = window.appData
    const place = data.floor[data.floor.length - location].location
    const here = this.getPosition(location, place[0], place[1])

    this.setState({
      // eslint-disable-next-line react/no-unused-state
      data,
      lx: here.left,
      ly: here.top,
    })
  }

  getPosition = (x, y) => {
    const wrapper = ReactDOM.findDOMNode(this.refs.wrapper)
    const map = ReactDOM.findDOMNode(this.refs.map)
    const react = map.getBoundingClientRect()
    console.log(react)
    const cx = react.left
    const cy = window.scrollY + 210 + wrapper.scrollTop
    const fw = data.map.size[0]
    const fh = data.map.size[1]
    const rateX = 1
    const rateY = 1 

    const left = cx + x * rateX
    const top = cy + y * rateY

    console.log(left, top)

    return { left, top }
  }

  onChange = (e, coordinate) => {
    e.preventDefault()
    const that = this
    this.props.onClick && this.props.onClick(() => {
      const position = that.getPosition(coordinate[0], coordinate[1])
      
      that.setState({
        x: position.left,
        y: position.top,
        showPoint: true,
      })
    })
  }

  getFloors = () => {
    const { floor } = data
    if (this.state.mapper) return this.state
    this.setState({
      mapper: floor.reverse()
    })
  }

  render() {
    const { zoom, hidden, hideAreas } = this.props
    const { x, y, lx, ly, showPoint } = this.state
    const pointStyle = {
      left: `${x}px`,
      top: `${y}px`,
      visibility: showPoint ? 'visible' : 'hidden',
      opacity: showPoint ? 1 : 0,
    }
    const locationStyle = {
      left: `${lx}px`,
      top: `${ly}px`,
    }

    const cls = classNames({
      map: true,
      map_zoom: zoom,
      map_hidden: hidden,
    })

    return (
      <div className={cls} ref={'wrapper'}>
        <div className="floor">
          <img src={data.map.src} ref={'map'}/>
          <div className="point" style={pointStyle} />
        </div>
        <div className="location" style={locationStyle} />
        { !hideAreas && (
          <div className="areas">
            {
              data.floor.map((floor, index) => {
                return (
                  <div className="layer">
                    <div className="layer-name">
                      {floor.name}
                    </div>
                    <div className="layer-catalog">
                      {floor.catalog.join(' ')}
                    </div>
                    <div className="layer-area">
                      {
                        floor.areas.map(area => {
                          return (
                            <div className="layer-area-item" key={area.key} onClick={e => this.onChange(e, area.coordinate)}>
                              <span className="color" style={{ background: `${area.color}` }}>
                                {area.key}
                              </span>
                              <span className="text">{area.name}</span>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                )
              })
            }
            <div className="info">
              <span className="icon icon-here" />
              <span className="text">你所在的位置</span>
            </div>
            <div className="info">
              <span className="icon icon-wc" />
              <span className="text"> 洗手间</span>
            </div>
          </div>
        )}
      </div>
    )
  }
}
