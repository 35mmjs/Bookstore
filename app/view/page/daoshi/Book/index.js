import React from 'react'
import './index.less'

export default class Book extends React.Component {
  changeToPosition = () => {

  }

  handleClickBack = (e) => {
    e.preventDefault()
    this.props.handleClickBack && this.props.handleClickBack()
  }

  render() {
    const { book, className } = this.props

    return (
      <div className={className}>
        <div className="book_detail_back" onClick={this.handleClickBack} />
        <div className="book_detail_content">
          <div className="book_detail_info">
            <div className="book_detail_info_cover">
              <img src={book.cover} />
            </div>
            <h3 className="book_detail_info_name">
              {book.name}
            </h3>
            <p className="book_detail_info_author">
              作者：
              {book.author}
            </p>
            <p className="book_detail_info_intro">
              {book.recommender}
            </p>
            <div className="book_detail_info_position">
              地图上显示此书位置
            </div>
          </div>
          <div className="book_detail_more">
            <p className="book_detail_more_price">
售价：
              {' '}
              <span>{book.price}</span>
                        </p>
            <p className="book_detail_more_pricing">
定价：
              {book.pricing}
                        </p>
          </div>
          <div className="book_detail_info_meta">
            <p>
              <span>
isbn：
                {book.isbn}
                            </span>
              <span>
书架号：
                {book.bookShelf}
                            </span>
            </p>
            <p>
              <span>
开本：
                {book.pageType}
                            </span>
              <span>
出版社：
                {book.publish}
                            </span>
            </p>
            <p>
              <span>
页数：
                {book.pageNumber}
                            </span>
            </p>
            <p><span>book.version}</span></p>
          </div>
        </div>
      </div>
    )
  }
}
