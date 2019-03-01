import React from 'react'
import { getPaihangDetail } from '../../util/services'
import Cover from './cover'
import Detail from './detail'

import './index.less'

const book = {"cover":"https://bookstore-public.oss-cn-hangzhou.aliyuncs.com/book-cover.gif","isbn":"9787534184505","spbs":"4350571","score": "9.2","name":"2019年<己亥年>历书","author":"栈新","catalog":"天 文 学","toc":"来(21种正在改↵变世界的神奇科技)》植根《我是未来》节目，但不↵局限于《我是未来》节目，本书集结全球顶尖科技咖↵对全世界最前沿且与人类生活息息相关的21项科技进↵行汇总和分享，全景勾勒智慧时代的未来生活。↵","price":"3","pricing":"3","recommender":"","intro":"    我是未来节目组组编的《遇见未来(21种正在改↵变世界的神奇科技)》植根《我是未来》节目，但不↵局限于《我是未来》节目，本书集结全球顶尖科技咖↵对全世界最前沿且与人类生活息息相关的21项科技进↵行汇总和分享，全景勾勒智慧时代的未来生活。↵","pageType":"64开","pageNum":"64","publish":"浙江科学技术出版社","version":"","bookshelf":"","stockList":[],"qrcode":"http://wap.zxhsd.com/index/item.shtml?spbs=4350571&khbh=3300000000"}

console.log(book)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      book,
      showDetail: false,
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    const that = this
    this.timeout = setTimeout(() => {
      getPaihangDetail().then(res => {
        console.log(res)
        const { data } = res
        if (data.success) {
          that.setState({
            book: data.data,
          })
        }
        this.getData()
      })
    }, 3000)
  }

  toggleBook = (e) => {
    if (e) e.preventDefault()
    this.setState({
      showDetail: !this.state.showDetail,
    })
  }

  render() {
    const { book } = this.state
    return (
      <div className="app">
        <div className="wrapper">
          {!this.state.showDetail &&
            <Cover book={book} onClick={this.toggleBook} />
          }
          {this.state.showDetail &&
          <Detail book={book} onClose={this.toggleBook} />
          }
        </div>
      </div>
    )
  }
}

export default App
