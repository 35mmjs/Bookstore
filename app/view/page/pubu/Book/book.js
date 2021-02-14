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
import { message } from 'antd';

class BookDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      book: this.props.book,
      recommend: data,
      left: 0,
      loading: false,
    }

    this.image = React.createRef()
  }

  componentDidMount() {
    const { book } = this.props
    console.log('==>', book)
    this.getBook(book.spbs)
    this.getRecommend(book.spbs)
  }

  reGetData = (e, book) => {
    e.preventDefault()

    this.getBook(book.spbs)
    this.getRecommend(book.spbs)
  }

  getBook = (spbs) => {
    getBook({ spbs })
      .then(res => {
        const { data } = res
        if (!data.success) {
          message.error(data.error || '获取详情失败')
          return
        }
        console.log(data)
        message.success('获取详情成功')
        if (data.data.spbs === this.state.book.spbs) {
          this.setState({
            book: Object.assign({}, this.state.book, data.data)
          })
        } else {
          let score = data.data.score
          if (!score) {
            score = Math.floor((Math.random() * (10 - 8) + 8) * 10) / 10
          }

          this.setState({
            book: Object.assign({}, data.data, {
              score,
            })
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  getRecommend = (spbs) => {
    this.setState({
      loading: true,
    })
    getRecommend({ spbs })
      .then(res => {
        const { data } = res
        if (!data.success) {
          message.error(data.error || '获取相关书籍失败')
          return
        }
        console.log(res.data.data)
        message.success('获取相关书籍成功')
        this.setState({
          recommend: res.data.data,
          loading: false,
        })
      })
      .catch(err => {
        console.error(err)
        this.setState({
          loading: false,
        })
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
    const { book, recommend, loading } = this.state

    // Slider Setting
    const settings = {
      infinite: true,
      slidesToShow: 2,
      autoplay: true,
      autoplaySpeed: 3000,
      variableWidth: true,
    }

    let bookShelf = ''

    if (book.stockList && book.stockList.length) {
      bookShelf = book.stockList[0].jwh
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
                <div className="book_detail_container_star">
                  { getStarValues(book.score).map((value, index) => <Star light={true} value={value} key={index} />) }
                </div>

                {/* <div className="book_detail_container_command">
                  评论 {book.commands} 条
                </div> */}
              </div>
              <div className="book_detail_container_bg">
                <h2 className="book_detail_container_title">
                  {book.name}
                </h2>
                { book.author &&
                  <p className="book_detail_container_author">
                    作者：{book.author.replace('作者:', '')}
                  </p>
                }
                <p className="book_detail_container_recommand">
                  {book.recommender}
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
                  <span>书架号：{bookShelf || '详询服务台预定'}</span>
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
              { book.intro &&
                <div className="book_detail_container_det">
                  <h4>内容简介：</h4>
                  <p className="intro">{book.intro}</p>
                </div>
              }
              { book.authorInfo &&
                <div className="book_detail_container_det">
                  <h4>作者简介：</h4>
                  <p>{book.authorInfo}</p>
                </div>
              }
              { book.toc &&
                <div className="book_detail_container_det">
                  <h4>目录：</h4>
                  <div className="toc">{book.toc}</div>
                </div>
              }
            </div>
          </div>
          <div className="book_detail_recommand">
            <h4>相关书籍</h4>
            <div className="book_detail_recommand_content">
              { !loading &&
              <Slider ref={slider => (this.slider = slider)} {...settings}>
                {
                  recommend.map((b, i) => {
                    return (
                      <MiniBook book={b} key={`${b.isbn}-${i}`} onClick={e => this.reGetData(e, b)} /> 
                    )
                  })
                }
              </Slider>
              }
              { loading &&
                <div className="book_detail_recommand_loading">
                  <img src="https://bookstore-public.oss-cn-hangzhou.aliyuncs.com/loading10.gif" />
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookDetail
