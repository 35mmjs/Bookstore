import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import QRCode from 'qrcode.react'
import Slider from 'react-slick'
import Star from './Star'
import MiniBook from './miniBook'
import getStarValues from '../../util/getStarValues'
import { getBook, getRecommend } from '../../util/services'
import data from './data'

class BookDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      book: this.props.book,
      recommend: data,
      left: 0,
    }

    this.image = React.createRef()
  }

  componentDidMount() {
    const { book } = this.props
    console.log('==>', book)
    this.getBook(book.isbn)
    // this.getRecommend()
  }

  reGetData = (e, book) => {
    e.preventDefault()

    this.getBook(book.isbn)
    this.getRecommend(book.isbn)
  }

  getBook = (isbn) => {
    console.log(isbn)
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
    const { onClose } = this.props
    const { book, recommend } = this.state

    // Slider Setting
    const settings = {
      infinite: true,
      slidesToShow: 2,
      autoplay: true,
      autoplaySpeed: 3000,
      variableWidth: true,
    }

    return (
      <div className="book_detail">
        <div className="book_detail_content">
          <div className="book_detail_close" onClick={onClose} />
          <div className="book_detail_container">
            <div className="book_detail_container_intro">
              <div className="book_detail_container_cover">
                <img ref={this.image} src={book.cover} onLoad={this.onLoad} style={{marginLeft: `-${this.state.left}px`}}/>
              </div>
              <div className="book_detail_container_score">
                <div className="book_detail_container_value">
                  <div className="value">
                    <span className="title">评分</span>
                    <em className="value">{book.score}</em>
                  </div>
                </div>
                {/* <div className="book_detail_container_command">
                  评论 {book.commands} 条
                </div> */}
              </div>
              <div className="book_detail_container_bg">
                <h2 className="book_detail_container_title">
                  {book.name}
                </h2>
                <p className="book_detail_container_author">
                  作者：{book.author.replace('作者:', '')}
                </p>
                <p className="book_detail_container_recommand">
                  {book.recommend}
                </p>
                <p className="book_detail_container_price">
                  定价：<span className="price">{book.pricing} 元</span>
                </p>
                {/* <p className="book_detail_container_pring">
                  定价：<span className="price">{book.pricing} </span> 元
                </p> */}
              </div>
            </div>
            <div className="book_detail_container_info">
              <div className="book_detail_container_meta">
                <p>
                  <span>ISBN：{book.isbn}</span>
                  <span>出版社：{book.publish}</span>
                </p>
                <p>
                  <span>开 本：{book.pageType}</span>
                  <span>书架号：{book.bookshelf}</span>
                </p>
                <p>
                  <span>页 数：{book.pageNum}</span> 
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
                <p>{book.toc}</p>
              </div>
            </div>
          </div>
          <div className="book_detail_recommand">
            <h4>相关书籍</h4>
            <div className="book_detail_recommand_content">
              <Slider ref={slider => (this.slider = slider)} {...settings}>
                {
                  recommend.map((b, i) => {
                    return (
                      <MiniBook book={b} key={`${b.isbn}-${i}`} onClick={e => this.reGetData(e, b)} /> 
                    )
                  })
                }
              </Slider>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookDetail
