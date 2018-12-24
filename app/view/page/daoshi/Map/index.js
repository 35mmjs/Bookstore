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

  getPosition = (n, x, y) => {
    const wrapper = ReactDOM.findDOMNode(this.refs.wrapper)
    const floor = ReactDOM.findDOMNode(this.refs[`floor_${n}`])
    const react = floor.getBoundingClientRect()
    const cx = react.width / 2 + react.left
    // 需要减去 point 节点外容器的高度位移
    const cy = react.height / 2 + react.top + window.scrollY - 210 + wrapper.scrollTop
    const fw = data.floor[data.floor.length - n].size[0]
    const rate = react.width / fw
    const left = cx + x * rate
    const top = cy - y * rate
    return { left, top }
  }

  onChange = (e, coordinate) => {
    e.preventDefault()
    const that = this
    this.props.onClick && this.props.onClick(() => {
      const position = that.getPosition(coordinate[2], coordinate[0], coordinate[1])
      that.setState({
        x: position.left,
        y: position.top,
        showPoint: true,
      })
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
        {data.floor.map((floor, index) => {
          return (
            <div className="floor" key={index} ref={`floor_${data.floor.length - index}`}>
              <img src={floor.image} />
            </div>
          )
        })}
        <div className="point" style={pointStyle} />
        <div className="location" style={locationStyle} />
        { !hideAreas && (
          <div className="areas">
            {
              data.areas.map((area, index) => {
                return (
                  <div className="area" key={index} onClick={e => this.onChange(e, area.coordinate)}>
                    <span className="color" style={{ background: `${area.color}` }} />
                    <span className="text">{area.name}</span>
                  </div>
                )
              })
            }
            <div className="area">
              <span className="here" />
              <span className="text">你所在的位置</span>
            </div>
            <div className="area">
              <span className="wc" />
              <span className="text"> 洗手间</span>
            </div>
          </div>
        )}
      </div>
    )
  }
}
