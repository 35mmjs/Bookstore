import React from 'react'
import classNames from 'classnames'
import QRCode from 'qrcode.react'
import Star from './Star'
import getStarValues from '../../util/getStarValues'
import { getBook, getRecommend } from '../../util/services'
import data from './data'

class BookDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      book: this.props.book,
      recommend: data,
    }
  }

  componentDidMount() {
    // this.getRecommend()
  }

  reGetData = (e, isbn) => {
    e.preventDefault()

    this.getBook(isbn)
    this.getRecommend(isbn)
  }

  getBook = (isbn) => {
    getBook({ isbn })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getRecommend = (isbn) => {
    getRecommend({ isbn })
      .then(res => {
        console.log(res.data.data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    const { onClose } = this.props
    const { book, recommend } = this.state

    return (
      <div className="book_detail">
        <div className="book_detail_content">
          <div className="book_detail_close" onClick={onClose} />
          <div className="book_detail_container">
            <div className="book_detail_container_intro">
              <div className="book_detail_container_cover">
                <img src={book.cover} />
              </div>
              <div className="book_detail_container_score">
                <div className="book_detail_container_value">
                  <div className="value">
                    <span className="title">评分</span>
                    <em className="value">{book.score}</em>
                  </div>
                </div>
                <div className="book_detail_container_command">
                  评论 {book.commands} 条
                </div>
              </div>
              <div className="book_detail_container_bg">
                <h2 className="book_detail_container_title">
                  {book.name}
                </h2>
                <p className="book_detail_container_author">
                  作者：{book.author}
                </p>
                <p className="book_detail_container_recommand">
                </p>
                <p className="book_detail_container_price">
                  售价：<span className="price">{book.price} 元</span>
                </p>
                <p className="book_detail_container_pring">
                  定价：<span className="price">{book.pricing} 元</span>
                </p>
              </div>
            </div>
            <div className="book_detail_container_info">
              <div className="book_detail_container_meta">
                <p>
                  <span>ISBN：{book.isbn}</span>
                  <span>出版社：{book.publish}</span>
                </p>
                <p>
                  <span>{book.pageType}</span>
                  <span>书架号：{book.bookshelf}</span>
                </p>
                <p>
                  <span>页 数：{book.pageNumber}</span> 
                </p>
                <p><span>{book.version}</span></p>
                {
                  book.qrcode &&
                  <div className="book_detail_container_meta_qr">
                    <div className="qrcode">
                      <QRCode value={book.qrcode} size={100} />
                    </div>
                  </div>
                }
              </div>
              <div className="book_detail_container_det">
                <h4>内容简介：</h4>
                <p>{book.intro}</p>
              </div>
              <div className="book_detail_container_det">
                <h4>作者简介：</h4>
                <p>{book.authorInfo}</p>
              </div>
              <div className="book_detail_container_det">
                <h4>目录：</h4>
                <p>{book.catalog}</p>
              </div>
            </div>
          </div>
          <div className="book_detail_recommand">
            <h4>相关书籍</h4>
            <div className="book_detail_recommand_content">
              {
                recommend.map((b, i) => {
                  return (
                    <div className="book_mini" onClick={e => this.reGetData(e, b.isbn)} key={i}>
                      <div className="book_mini_cover">
                        <img src={b.cover} />
                      </div>
                      <div className="book_mini_info">
                        <h5 className="book_mini_info_name">{b.name}</h5>
                        <div className="book_mini_info_score">
                          { getStarValues(b.score).map((value, index) => <Star value={value} key={index} />) }
                        </div>
                        <p>作者：{b.author}</p>
                        <p>售价：<span className="price">{b.price}</span></p>
                        <p className="pricing">定价：{b.pricing}</p>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookDetail
