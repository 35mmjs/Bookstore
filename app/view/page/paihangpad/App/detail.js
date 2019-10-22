import React from 'react'
import Slider from 'react-slick'
import QRCode from 'qrcode.react'
import Star from '../Star'
import getStarValues from '../../util/getStarValues' 
import { getBook, getRecommend } from '../../util/services'
import { message } from 'antd'
import MiniBook from './miniBook'

class Detail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      book: this.props.book,
      recommend: [], 
      loading: false,
    }
  }

  componentDidMount() {
    const { book } = this.props
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
        if (res.success) {
          this.setState({
            recommend: res.data.data,
            loading: false,
          })
        }
      })
      .catch(err => {
        console.error(err)
        this.setState({
          loading: false,
        })
      })
  }



  render() {
    const { onClose, isNewPad } = this.props
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
    const newPadStyle = { width: '1200px', height: '1920px'}
    const newImageSytle = { width: '1200px', height: '1780px'}

    return (
      <div className="detail" style={isNewPad ? newPadStyle : null}>
        <div className="detail-close" onClick={onClose} />
        <div className="detail-info" style={isNewPad ? newImageSytle : null}>
          <div className="detail-info-view">
            <div className="detail-info-meta">
              <h3 className="name">
                <span>《{book.name}》</span>
              </h3>
              <p>
                <span>作者：{(book.author && book.author.replace('作者:', '')) || book.publish}</span>
              </p>
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
              <p>
                <span>{book.version}</span>
                <span>
                {
                  book.qrcode &&
                  <div className="detail-info-meta_qr">
                    <div className="qrcode">
                      <QRCode value={book.qrcode} size={150} />
                    </div>
                  </div>
                }
                </span>
              </p>
            </div>
            { book.intro &&
              <div className="detail-info-det">
                <h4>内容简介：</h4>
                <p className="intro">{book.intro}</p>
              </div>
            }
            { book.authorInfo &&
              <div className="detail-info-det">
                <h4>作者简介：</h4>
                <p>{book.authorInfo}</p>
              </div>
            }
            { book.toc &&
              <div className="detail-info-det">
                <h4>目录：</h4>
                <div className="toc">{book.toc}</div>
              </div>
            }
          </div>
        </div>
        <div className="detail-recommand">
          <span className="detail-recommand-name">相关书籍：</span>
          <div className="detail-recommand-list">
            {
              !loading && recommend &&
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
              <div className="detail-recommand-loading">
                <img src="https://bookstore-public.oss-cn-hangzhou.aliyuncs.com/loading10.gif" />
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Detail
