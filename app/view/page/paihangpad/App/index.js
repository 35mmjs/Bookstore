import React from 'react'
import { getPaihangDetail, tracker } from '../../util/services'
import Cover from './cover'
import Detail from './detail'

import './index.less'

const book = {"cover":"https://bookstore-public.oss-cn-hangzhou.aliyuncs.com/book-cover.gif","isbn":"9787534184505","spbs":"4350571","score": "9.2","name":"2019年<己亥年>历书","author":"栈新","catalog":"天 文 学","toc":"来(21种正在改↵变世界的神奇科技)》植根《我是未来》节目，但不↵局限于《我是未来》节目，本书集结全球顶尖科技咖↵对全世界最前沿且与人类生活息息相关的21项科技进↵行汇总和分享，全景勾勒智慧时代的未来生活。↵","price":"3","pricing":"3","recommender":"","intro":"    我是未来节目组组编的《遇见未来(21种正在改↵变世界的神奇科技)》植根《我是未来》节目，但不↵局限于《我是未来》节目，本书集结全球顶尖科技咖↵对全世界最前沿且与人类生活息息相关的21项科技进↵行汇总和分享，全景勾勒智慧时代的未来生活。↵","pageType":"64开","pageNum":"64","publish":"浙江科学技术出版社","version":"","bookshelf":"","stockList":[],"qrcode":"http://wap.zxhsd.com/index/item.shtml?spbs=4350571&khbh=3300000000"}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      book,
      showDetail: false,
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
        if (data.success && this.state.book.isbn !== data.data.isbn) {
          console.log('change ==>', data.data)
          that.setState({
            book: data.data,
            showDetail: false,
          })
        }
        this.getData()
      })
    }, 3000)
  }

  toggleBook = (e) => {
    if (e) e.preventDefault()
    const that = this
    const { showDetail, book } = this.state

    // 清除缓存
    clearTimeout(this.timeout)

    this.setState({
      showDetail: !showDetail,
    }, () => {
      if (showDetail) {
        this.getData()
      } else {
        setTimeout(() => {
          that.setState({
            showDetail: false,
          }, () => {
            that.getData()
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
          {this.state.showDetail &&
          <Detail book={book} isNewPad={isNewPad} onClose={this.toggleBook} />
          }
        </div>
      </div>
    )
  }
}

export default App
