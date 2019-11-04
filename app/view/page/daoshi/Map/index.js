import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
// import data10001 from './10001'
// import data10002 from './10002'
import './index.less'

export default class Map extends React.Component {
  constructor(props) {
    super(props)
    
    const { map = {}, floor = [] } = props.data

    this.state = {
      x: 0,
      y: 0,
      lx: 0,
      ly: 0,
      mapData: map,
      floorData: props.data.floor.reverse() || [],
    }
  }

  componentDidMount() {
    this.getLocation()
  }

  componentDidUpdate(props) {
    if (props.zoom !== this.props.zoom) {
      setTimeout(() => {
        this.getLocation()
      }, 300)
    }
    if (props.current !== this.props.current) {
      setTimeout(() => {
        this.onChange(null, this.props.current.coordinate, this.props.current.floor, false)
      }, 300)
    }
  }

  getLocation = () => {
    const { location = 1 } = window.appData
    const { floorData, mapData } = this.state
    const place = floorData[mapData.floorCount - location].location
    const here = this.getPosition(place[0], place[1])

    this.setState({
      // eslint-disable-next-line react/no-unused-state
      lx: here.left,
      ly: here.top,
    })
  }

  getPosition = (x, y) => {
    const { mapData } = this.state
    const { zoom } = this.props
    const max = zoom ? 50 : 35
    const wrapper = ReactDOM.findDOMNode(this.refs.wrapper)
    const map = ReactDOM.findDOMNode(this.refs.map)
    const react = map.getBoundingClientRect()
    const cx = 0
    const cy = window.scrollY - max + wrapper.scrollTop
    const fw = mapData.size[0]
    const fh = mapData.size[1]
    const rateX = react.width / fw
    const rateY = react.height / fh 

    const left = x * rateX
    const top = y * rateY - max 

    return { left, top }
  }

  onChange = (e, coordinate, floor, zoom = true) => {
    if (e) {
      e.preventDefault()
    }
    if (floor === 0 && coordinate[0] === 0 && coordinate[1] === 0) {
      this.setState({
        showPoint: false
      })
      return
    }

    const that = this;
    const { mapData } = this.state;
    const map = ReactDOM.findDOMNode(this.refs.map);
    const mapParent = ReactDOM.findDOMNode(this.refs.wrapper);
    const react = map.getBoundingClientRect()
    const top = react.height / mapData.floorCount * (mapData.floorCount - floor)
    mapParent.scrollTop = top

    const position = that.getPosition(coordinate[0], coordinate[1])

    if (zoom) {
      this.props.onClick && this.props.onClick(() => {
        that.setState({
          x: position.left,
          y: position.top,
          showPoint: true,
        })
      })
    } else {
      that.setState({
        x: position.left,
        y: position.top,
        showPoint: true,
      })
    }
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
    const { x, y, lx, ly, showPoint, mapData, floorData } = this.state
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
          <img src={mapData.src} ref={'map'}/>
          <div className="point" style={pointStyle} />
          <div className="location" style={locationStyle} />
        </div>
        { !hideAreas && (
          <div className="areas">
            {
              floorData.map((floor, index) => {
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
                            <div className="layer-area-item" key={area.key} onClick={e => this.onChange(e, area.coordinate, floor.key, false)}>
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
