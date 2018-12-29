import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import getStarValues from '../../util/getStarValues'
import Star from './Star'
import './index.less'

export default class Book extends React.Component {
  constructor(props) {
    super(props)

    this.image = React.createRef()
    this.state = {
      left: 0,
    }
  }


  onClick = (e) => {
    e.preventDefault()
    const { handleClickBook } =  this.props
    if (handleClickBook) {
      handleClickBook('id')
    }
  }

  onLoad = () => {
    const image = ReactDOM.findDOMNode(this.image.current)
    if (!image) return
    const { clientWidth, clientHeight, naturalHeight, naturalWidth } = image
    const left = naturalWidth / naturalHeight * clientHeight / 2
    this.setState({
      left,
    })
  }

  render() {
    const { type, cover, name, author, pricing, index } = this.props

    const bookCls = classNames({
      book: true,
      booknth: index % 2 === 0,
    })

    let score = this.props.score
     
    return (
      <div className={bookCls}>
        <a className='book_cover' onClick={this.onClick}>
          <img src={cover} onLoad={this.onLoad} ref={this.image} style={{marginLeft: `-${this.state.left}px`}} />
        </a>
        <div className='book_info'>
          <h2 className='book_info_name'>《{name}》</h2>
          <p className='book_info_author'>作者：{author.replace('作者:', '')}</p>
          <p className='book_info_price'>定价：<span className='book_info_price_value'>{pricing}</span> 元</p>
          <div className='book_info_score'>
            <div className='book_info_stars'>
              { getStarValues(score).map((value, i) => <Star value={value} key={i} />) }
            </div>
            <div className='book_info_score_value'>
              {score}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
