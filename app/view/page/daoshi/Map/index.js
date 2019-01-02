import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import data10001 from './data'
import data10002 from './10002'
import './index.less'

export default class Map extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      x: 0,
      y: 0,
      lx: 0,
      ly: 0,
      data: data10001,
    }
  }

  componentDidMount() {
    const { orgId } = window.appData
    let data = data10001

    if (orgId === '10002') {
      data = data10002
    }
    
    this.getFloors()
    this.setState({
      data,
    }, () => {
      this.getLocation()
    })
  }

  componentDidUpdate(props) {
    console.log(props.zoom !== this.props.zoom)
    
    if (props.zoom !== this.props.zoom) {
      setTimeout(() => {
        console.log('===> change location')
        this.getLocation()
      }, 300)
    }
  }

  getLocation = () => {
    const { location = 1 } = window.appData
    const { data } = this.state
    const place = data.floor[data.map.floorCount - location].location
    const here = this.getPosition(place[0], place[1])

    this.setState({
      // eslint-disable-next-line react/no-unused-state
      lx: here.left,
      ly: here.top,
    })
  }

  getPosition = (x, y) => {
    const { data } = this.state
    const wrapper = ReactDOM.findDOMNode(this.refs.wrapper)
    const map = ReactDOM.findDOMNode(this.refs.map)
    const react = map.getBoundingClientRect()
    const cx = 0
    const cy = window.scrollY - 50 + wrapper.scrollTop
    const fw = data.map.size[0]
    const fh = data.map.size[1]
    const rateX = react.width / fw
    const rateY = react.height / fh 

    const left = x * rateX
    const top = y * rateY - 50

    return { left, top }
  }

  onChange = (e, coordinate, floor) => {
    e.preventDefault()
    const that = this;
    const { data } = this.state;
    const map = ReactDOM.findDOMNode(this.refs.map);
    const mapParent = ReactDOM.findDOMNode(this.refs.wrapper);
    const react = map.getBoundingClientRect()
    const top = react.height / data.map.floorCount * (data.map.floorCount - floor)
    mapParent.scrollTop = top

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
    const { data } = this.state
    const { floor } = data
    if (this.state.mapper) return this.state
    this.setState({
      mapper: floor.reverse()
    })
  }

  render() {
    const { zoom, hidden, hideAreas } = this.props
    const { x, y, lx, ly, showPoint, data } = this.state
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
        <div className="floor" ref={'floor'}>
          <img src={data.map.src} ref={'map'}/>
          <div className="point" style={pointStyle} />
          <div className="location" style={locationStyle} />
        </div>
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
                            <div className="layer-area-item" key={area.key} onClick={e => this.onChange(e, area.coordinate, floor.key)}>
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
