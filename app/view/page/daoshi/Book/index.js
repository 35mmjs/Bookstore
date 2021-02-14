import React from 'react'
import ReactDOM from 'react-dom'
import QRCode from 'qrcode.react'
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

  onLoad = () => {
    const image = ReactDOM.findDOMNode(this.image.current)
    if (!image) return
    const { clientWidth, clientHeight, naturalHeight, naturalWidth } = image
    const left = naturalWidth / naturalHeight * clientHeight / 2
    this.setState({
      left,
    })
  }

  handleShowPosition = (e, stockList) => {
    e.preventDefault()
    this.props.handleShowPosition && this.props.handleShowPosition(stockList)
  }

  handleClickBack = (e) => {
    e.preventDefault()
    this.props.handleClickBack && this.props.handleClickBack()
  }


  componentWillReceiveProps = nextProps => {
    if(nextProps.book){
      var container = document.getElementById("book_id");//获取元素
      container.scrollTop = 0;//滚动条回到顶部
    }
  }

  render() {
    const { book, className } = this.props
    const { orgId } = window.appData
    let bookShelf = ''

    if (book.stockList && book.stockList.length) {
      bookShelf = book.stockList[0].jwh
    }
    let noBookShelf = '详询服务台预定'
    if (orgId == 10015){
      noBookShelf = ('000000' + Math.floor(Math.random() * 999999)).slice(-6)
    }

    return (
      <div className={className}>
        <div id="book_id" className="book_detail_content">
          <div className="book_detail_info">
            <div className="book_detail_info_cover">
              { book.cover && (
                <img src={book.cover} onLoad={this.onLoad} ref={this.image} style={{marginLeft: `-${this.state.left}px`}}/>
              )}
            </div>
            <h3 className="book_detail_info_name">
              {book.name}
            </h3>
            { book.author &&
              <p className="book_detail_info_author">
                作者：{ book.author.replace('作者:', '')}
              </p>
            }
            <p className="book_detail_info_intro">
              {book.recommender}
            </p>
            {
              book.stockList && book.stockList.length > 0 &&
              <div className="book_detail_info_position" onClick={e => this.handleShowPosition(e, book.stockList)}>
                { bookShelf && '地图上显示此书位置' }
              </div>
            }
          </div>
          <div className="book_detail_more">
            <p className="book_detail_more_pricing">定价： <span>{book.pricing}</span> 元</p>
            <div className="book_detail_more_star">
                <div className="value">{book.score}</div>
                <div className="sta">
                  { getStarValues(book.score).map((value, index) => <Star value={value} key={index} />) }
                </div>
            </div>
            {book.qrcode &&
                <div className="book_detail_more_qr">
                  <div className="qrcode">
                    <QRCode value={book.qrcode} size={120} />
                  </div>
                </div>
            }
          </div>
          <div className="book_detail_info_meta">
            <p>
              <span>isbn：{book.isbn}</span>
              <span>书架号：{bookShelf || noBookShelf}</span>
            </p>
            <p>
              <span>开本：{book.pageType}</span>
              <span>出版社：{book.publish}</span>
            </p>
            <p>
              <span>页数：{book.pageNum}</span>
            </p>
            <p><span>{book.version}</span></p>
          </div>
          <div className="book_detail_info_title">
            <h3>内容简介</h3>
            <p>{book.intro}</p>
          </div>
          <div className="book_detail_info_title">
            <h3>作者简介</h3>
            <p>{book.authorInfo}</p>
          </div>
          <div className="book_detail_info_title">
            <h3>目录</h3>
            <p>{book.toc}</p>
          </div>
        </div>
      </div>
    )
  }
}
