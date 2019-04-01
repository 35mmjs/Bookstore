import React from 'react'
import classNames from 'classnames'
import getStarValues from '../../util/getStarValues'
import Star from './Star'
import './index.less'

// eslint-disable-next-line react/prefer-stateless-function
class Score extends React.Component {
  render() {
    const { value, mulity, isFromZj } = this.props
    const v = getStarValues(value)
    const scoleCls = classNames({
      score: true,
      score_yiyun: isFromZj === 'false',
      score_small: mulity,
    })

    const cls = classNames({
      arrow: true,
      arrow_1: value > 0 && value <= 2,
      arrow_2: value > 2 && value <= 4,
      arrow_3: value > 4 && value <= 6,
      arrow_4: value > 6 && value <= 8,
      arrow_5: value > 8,
    })

    return (
      <div className={scoleCls}>
        <span className="value">
          {this.props.value}
        </span>
      </div>
    )
  }
}

export default Score
