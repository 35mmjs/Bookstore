import React from 'react'
import classNames from 'classnames'
import './index.less'

// eslint-disable-next-line react/prefer-stateless-function
export default class Star extends React.Component {
  render() {
    const { value } = this.props

    const starCls = classNames({
      star: true,
      starhalf: value === 1,
      starfull: value === 2,
    })

    return <div className={starCls} />
  }
}
