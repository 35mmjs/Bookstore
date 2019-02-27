import React from 'react'
import './index.less'


const DEGREE_IN_RADIANS = Math.PI / 180
class RoundSlider extends React.Component {
  constructor(props) {
    super(props)

    const { value, rotationOffset } = props
    this.state = {
      value,
      angle: this.valueToAngle(value),
    }

    if (rotationOffset < -180 || rotationOffset > 180) {
      console.warn('rotationOffset prop should be between -180 and 180.')
    }

    this.uniqueId = Math.floor(Math.random() * 100) + Date.now()
    this.allowChange = false
    this._wrapper = React.createRef()
    this._handle = React.createRef()
  }

  componentWillReceiveProps(props) {
    if (this.state.value !== props.value) {
      const value = props.value;
      this.setState({ 
        value,
        angle: this.valueToAngle(value)
      })
    }
  }

  componentDidMount() {
    document.addEventListener('mouseup', this.up)
    if (!this.props.allowClick && this._wrapper.current) {
      this._wrapper.current.style.pointerEvents = 'none'
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.up)
  }

  up = e => {
    if (!this.props.allowClick && this._wrapper.current) {
      this._wrapper.current.style.pointerEvents = 'none'
    }
    this.allowChange = false
    this.isDrag = false
    this.touches = [] // clear touches
    // e.preventDefault()
    e.stopPropagation()
    this.props.onAfterChange && this.props.onAfterChange(this.value, this.props)
  }

  getTouchMove = e => {
    // e.preventDefault()
    e.stopPropagation()
    if (this.allowChange || this.isDrag) {
      let idx = 0
      for (let index = 0; index < e.changedTouches.length; index++) {
        const t = e.changedTouches[index]
        if (t.identifier >= 0) {
          this.touches = [t]
          this.updateValue(this.touches[idx])
        }
      }
    }
  }

  down = e => {
    if (this._wrapper.current) {
      this._wrapper.current.style.pointerEvents = 'auto'
    }
    e.stopPropagation()
    // e.preventDefault()
    // we update first value, then we decide based on rotation
    if (!this.isDrag) {
      this.updateValue(e, true)
    }
    this.allowChange = true
    this.isDrag = true
    if (e.changedTouches) {
      this.touches.push(...e.changedTouches)
    }
  }

  getArc = (startAngle, endAngle) => {
    let { radius, strokeWidth } = this.props
    const pathRadius = radius - strokeWidth / 2
    const start = this.polarToCartesian({
      radius,
      pathRadius,
      angle: startAngle
    })
    const end = this.polarToCartesian({
      radius,
      pathRadius,
      angle: endAngle
    })
    const arcSweep = startAngle <= 180 ? 0 : 1

    return `M ${start} A ${pathRadius} ${pathRadius} 0 ${arcSweep} 0 ${end}`
  }

  polarToCartesian({ pathRadius, angle, radius }) {
    const angleInRadians = (angle - 180) * DEGREE_IN_RADIANS
    const x = radius + pathRadius * Math.cos(angleInRadians)
    const y = radius + pathRadius * Math.sin(angleInRadians)

    return x + ' ' + y
  }

  getCenter() {
    var rect = this._wrapper.current.getBoundingClientRect()
    return {
      top: rect.top + this.props.radius,
      left: rect.left + this.props.radius
    }
  }

  limitValue = value => {
    const { min, max } = this.props
    if (value < min) value = min
    if (value > max) value = max
    return value
  }

  radToDeg(rad) {
    return rad * (180 / Math.PI)
  }

  angle(y, x) {
    const { rotationOffset } = this.props
    let angle = this.radToDeg(Math.atan2(y, x)) + 180 - rotationOffset
    if (angle > 360) {
      angle = angle - 360
    }
    if (angle < 0) {
      angle = 360 + angle
    }
    return angle
  }

  angleToValue = angle => {
    const { min, max, arcSize } = this.props
    const v = (angle / arcSize) * (max - min) + min
    return v
  }

  valueToAngle = value => {
    const { max, min, arcSize } = this.props
    const angle = ((value - min) / (max - min)) * arcSize
    return angle
  }

  stepRounding(degree) {
    const { stepSize, steps, min, max, arcSize } = this.props
    const step = stepSize || (steps ? ((max - min) / steps) : 1)
    const { angle: oldAngle } = this.state
    let angToValue = min
    if (!this.isDrag) {
      angToValue = this.angleToValue(degree)
    } else {
      angToValue = this.angleToValue(
        oldAngle > arcSize - 20 && degree < arcSize / 4
          ? Math.max(degree, arcSize)
          : oldAngle < 20 && degree > arcSize - 20
          ? Math.min(degree, 0)
          : degree
      )
    }
    let value
    const remain = (angToValue - min) % step
    const currVal = angToValue - remain
    const nextVal = this.limitValue(currVal + step)
    const preVal = this.limitValue(currVal - step)
    if (angToValue >= currVal)
      value = angToValue - currVal < nextVal - angToValue ? currVal : nextVal
    else {
      value = currVal - angToValue > angToValue - preVal ? currVal : preVal
    }
    value = Math.round(value)
    const ang = this.valueToAngle(value)
    return { value, angle: ang }
  }

  updateValue = (event, forceSet) => {
    if (!this.isDrag && !forceSet) return
    let eX = 0,
      eY = 0
    const { clientX, clientY } = event
    eX = clientX
    eY = clientY
    const { left, top } = this.getCenter()
    const x = eX - left,
      y = eY - top
    const { value, angle } = this.stepRounding(this.angle(y, x))
    this.setState({ value, angle })
    this.props.onChange && this.props.onChange(value, this.props)
  }

  render() {
    const { rotationOffset } = this.props
    const steps = 10 
    const radius = 60

    const { angle } = this.state

    const segments =
      steps || (stepSize ? Math.floor((max - min) / stepSize) : 0)
    const maskName = `round_slider_${this.uniqueId}`
    const size = radius * 2
    const styleRotation = {
      transform: `rotate(${rotationOffset}deg)`,
      transformOrigin: '50% 50%'
    }

    return (
      <div
        className="round-slider"
        onMouseDown={this.down}
        onMouseUp={this.up}
        onMoseMove={this.move}
        ref={this._wrapper}
      >
      </div>
    )
  }
}

export default RoundSlider
