import React from 'react'
import Slider from 'react-slick'
import Banner from '../Banner'
import Layer from '../Layer'
import Book from '../Book'
import config from '../data'
import BookDetail from '../Book/book'
import { getPubuData } from '../../util/services'
import './index.less'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      channels: config,
      book: {},
      activeBook: false,
    }

    this.timeout = null
  }

  componentDidMount() {
    this.getData()
    document.addEventListener('click', this.handleClick)
  }

  getData = () => {
    getPubuData().then(res => {
      console.log(res)
      this.setState({
        channels: res.data.data,
      })
    }).catch(err => {
      console.error(err)
    })
  }

  handleClick = () => {
    if (this.state.activeBook) return
    this.pause()
    this.autoplay()
  }

  handleClickBook = (id) => {
    const mock = {
      // {String} 图书 ID
      id: '',

      // {String} 图片 CDN 地址
      cover: 'http://pjirfnf0s.bkt.clouddn.com/book-cover.gif',

      // {String} 图书名称
      name: '想象力的科学空间',

      // {String} 作者信息
      author: '郭羽/刘波',

      // {Array} 推荐者
      recommender: ['吴晓波', '江南春', '格非', '黄晓明'],

      // {String} 售价
      price: 41.9, // 当前价格

      // {String} 定价
      pricing: 59.8,

      // {Number} 评分
      score: 9.5,

      // {Number} 评论
      commands: 146,

      // {String} 内容简介
      intro: '年度现象级小说，由郭羽、刘波著的《网络英雄传I:艾尔斯巨岩之约》续作——大型互联网创业小说《网络英雄传(Ⅱ引力场)》，展现了中国互联网公司面对国际竞争中迸发出的商业智慧，面对资本战争时不惧的勇气。',

      // {String} 作者简介
      authorInfo: '',

      // {String} 目录
      catalog: '',

      // {Number} ISBN
      isbn: '9787559421289',

      // {String} 开本
      pageType: '16开 平装',

      // {Number} 页数
      pageNumber: '448',

      // {String} 版本
      version: '2018-06-01 第1版',

      // {String} 出版社
      publish: '江苏文艺',

      // {String} 书架号
      bookshelf: '3043331',

      // {String} 二维码
      qrcode: '',
    }
    this.setState({
      book: mock,
      activeBook: true,
    })
  }

  handleCloseBook = (e) => {
    e.preventDefault()

    this.setState({
      activeBook: false,
    }, () => {
      this.autoplay()
    })
  }

  autoplay = () => {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(() => {
      if (this.state.activeBook) {
        this.autoplay()
        return
      }
      this.play()
    }, 5000)
  }

  play = () => {
    this.slider.slickPlay()
  }

  pause = () => {
    this.slider.slickPause()
  }

  render() {
    const { channels } = this.state
    const settings = {
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      vertical: true,
      verticalSwiping: true,
    }
    return (
      <div className="app">
        <div className="wrapper">
        <Slider ref={slider => (this.slider = slider)} {...settings}>
          { channels.map((channel, ix) => {
            return (
              <div key={ix}>
                <Banner src={channel.banner.src} />
                { channel.layers.map((layer, index) => {
                  return (
                  <Layer key={index}>
                    {
                      layer.books.map((book, i) => {
                        return (
                          <Book
                            cover={book.cover}
                            name={book.name}
                            author={book.author}
                            price={book.price}
                            score={book.score}
                            key={i}
                            index={index}
                            handleClickBook={this.handleClickBook}
                          />
                        )
                      })
                    }
                  </Layer>
                  )
                })}
              </div>
            )
          })}
          </Slider>
        </div>
        {
          this.state.activeBook
          && <BookDetail onClose={this.handleCloseBook} book={this.state.book} />
        }
      </div>
    )
  }
}

export default App
