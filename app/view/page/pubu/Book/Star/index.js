import React from 'react'
import classNames from 'classnames'
import './index.less'

class Star extends React.Component {
  render() {
    const { value, light } = this.props

    const starCls = classNames({
      star: true,
      startlight: light,
      starhalf: value === 1,
      starfull: value === 2,
    })
    return <div className={starCls} />
  }
}

export default Star
