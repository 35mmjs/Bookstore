import React from 'react'
import Star from '../Star'
import getStarValues from '../../util/getStarValues'

class MiniBook extends React.Component {
  render() {
    const { book, onClick } = this.props
    return (
      <div className="book_mini" onClick={onClick}>
        <div className="book_mini_cover">
          <img src={book.cover} />
        </div>
        <div className="book_mini_info">
          <h5 className="book_mini_info_name">{book.name}</h5>
          <div className="book_mini_info_score">
            { getStarValues(book.score).map((value, index) => <Star type="m" value={value} key={index} />) }
          </div>
          <p>作者：{(book.author && book.author.replace('作者:', '')) || book.publish}</p>
          <p>定价：<span className="price">{book.price}</span> 元</p>
        </div>
      </div>
    )
  }
}

export default MiniBook
