import React from 'react'
import { getPaihangDetail, tracker, getBook } from '../../util/services'
import Cover from './cover'
import Detail from './detail'

import NewDetail from './detail/detail'

import './index.less'

import { message } from 'antd'

const book = {"cover":"https://bookstore-public.oss-cn-hangzhou.aliyuncs.com/book-cover.gif","isbn":"9787534184505","spbs":"4350571","score": "9.2","name":"2019年<己亥年>历书","author":"栈新","catalog":"天 文 学","toc":"来(21种正在改↵变世界的神奇科技)》植根《我是未来》节目，但不↵局限于《我是未来》节目，本书集结全球顶尖科技咖↵对全世界最前沿且与人类生活息息相关的21项科技进↵行汇总和分享，全景勾勒智慧时代的未来生活。↵","price":"3","pricing":"3","recommender":"","intro":"    我是未来节目组组编的《遇见未来(21种正在改↵变世界的神奇科技)》植根《我是未来》节目，但不↵局限于《我是未来》节目，本书集结全球顶尖科技咖↵对全世界最前沿且与人类生活息息相关的21项科技进↵行汇总和分享，全景勾勒智慧时代的未来生活。↵","pageType":"64开","pageNum":"64","publish":"浙江科学技术出版社","version":"","bookshelf":"","stockList":[],"qrcode":"http://wap.zxhsd.com/index/item.shtml?spbs=4350571&khbh=3300000000"}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      book,
      showDetail: false,
      networkError: false,
    }
    this.timeout = null
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const that = this
    this.timeout = setTimeout(() => {
      getPaihangDetail().then(res => {
        const { data } = res
        if (data.success) {
          if (this.state.book.isbn !== data.data.isbn) {
            that.setState({
              book: data.data,
              showDetail: false,
              networkError: false,
            })
          } else {
            that.setState({
              networkError: false,
            })
          }
        } else {
          this.setState({ networkError: true })
        }
        this.getData()
      }).catch( error => {
        this.setState({ networkError: true })
      })
    }, 3000)
  }

  toggleBook = (e) => {
    if (e) e.preventDefault()
    // const that = this
    const { networkError, book } = this.state
    this.getBook(book.spbs)
  }

  showDetail = () => {
  // 清除缓存
    const { showDetail } = this.state
    clearTimeout(this.timeout)
    this.setState({
      showDetail: !showDetail,
    }, () => {
      if (showDetail) {
        this.getData()
      } else {
        setTimeout(() => {
          this.setState({
            showDetail: false,
          }, () => {
            this.getData()
          })
        }, 30 * 1000)
      }
      tracker({
        act: 'click',
        biz_type: 'book_detail',
        biz_data: book.isbn || book.spbs,
      })
    })
  }

  getBook = (spbs) => {
    getBook({ spbs })
      .then(res => {
        const { data } = res
        if (data.success) {
          this.setState({
            book: Object.assign({}, this.state.book, data.data)
          })
          this.showDetail()
        } else {
          message.info('网络开小差了')
        }
      })
      .catch(err => {
        message.info('网络开小差了')
        console.error(err)
      })
  }

  render() {
    const { book } = this.state
    const { orgId } = window.appData
    const newPadStyle = { width: '1200px', height: '1920px'}
    let isNewPad = !(orgId == 10010)
    return (
      <div className="app" style={isNewPad ? newPadStyle : null}>
        <div className="wrapper">
          {!this.state.showDetail &&
            <Cover book={book} isNewPad={isNewPad} onClick={this.toggleBook} />
          }
          {this.state.showDetail && ( isNewPad ?
            <NewDetail book={book} onClose={this.toggleBook} />
            : <Detail book={book} isNewPad={isNewPad} onClose={this.toggleBook} />
          )
          }
        </div>
      </div>
    )
  }
}

export default App
