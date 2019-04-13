import React, { Component } from 'react'
import Slider from 'react-slick'
import uniqBy from 'lodash.uniqby'
import { message } from 'antd'
import { getZhantaiData, tracker } from '../../util/services'
import Single from '../Single'
import data from '../data'
import './index.less'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      handUp: false,
      books: data,
      handBooks: [],
    }

    this.timeout = null
  }

  componentDidMount() {
    this.getData()
    const that = this

    // 拿起书的事件，触发书的展示逻辑
    window.handleBookEvent = function (isbns) {
      that.handleBookEvent(isbns)
    }

    // 触发自动轮播
    window.handleBookAutoPlay = function () {
      that.autoPlay(true)
    }
  }

  handleBookEvent = (isbns) => {
    if (typeof isbns === 'string') {
      isbns = JSON.parse(isbns)
    }

    const { books } = this.state
    const handBooks = uniqBy(books.filter(book => {
      return isbns.indexOf(book.isbn) >= 0
    }), 'isbn')

    this.setState({
      handUp: true,
      handBooks,
    }, () => {
      // message.info(`您拿起了 ${isbns.length} 本书, 展台显示 ${handBooks.length} 本`)
      this.pause()
      this.autoPlay()
    })

    handBooks.forEach(bk => {
      tracker({
        act: 'click',
        biz_type: 'book_detail',
        biz_data: bk.isbn
      })
    })
  }

  autoPlay = (force) => {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    const timeout = force ? 0 : 50000

    this.timeout = setTimeout(() => {
      this.play()
      this.setState({
        handUp: false,
      })
    }, timeout)
  }

  getData = () => {
    const { client } = window.appData
    getZhantaiData({ client })
      .then(res => {
        if (res.data.success) {
          console.log(res.data.data.books)
          this.setState({
            books: res.data.data.books,
            handUp: false,
          })
        }
      })
      .catch(err => {
        console.error(err)
      })
  }

  play = () => {
    this.slider.slickPlay()
  }

  pause = () => {
    this.slider.slickPause()
  }

  reload = () => {
    window.location.reload()
  }

  getTheme = (index) => {
    const themes = ['default', 'theme1', 'theme2']
    return themes[index % 3]
  }

  render() {
    const { books, handBooks, handUp } = this.state

    // Change Books
    let sliderBooks = books
    if (handUp && handBooks.length > 0) {
      sliderBooks = handBooks
    }

    // Slider Setting
    const settings = {
      infinite: true,
      slidesToShow: handUp && sliderBooks.length > 1 ? 2 : 1,
      slidesToScroll: handUp && sliderBooks.length > 1 ? 2 : 1,
      autoplay: true,
      autoplaySpeed: 5000,
      variableWidth: true,
    }
    return (
      <div className="app">
        <div className="warpper">
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            {sliderBooks.map((book, index) => {
              const theme = this.getTheme(index)
              return (
                <Single book={book} theme={theme} mulity={handUp && sliderBooks.length > 1} key={book.id} />
              )
            })}
          </Slider>
        </div>
        <div style={{ textAlign: 'center' }}>
          <button className="button" onClick={this.play}>Play</button>
          <button className="button" onClick={this.pause}>Pause</button>
          <button className="button" onClick={this.reload}>Reload</button>
        </div>
      </div>
    )
  }
}

export default App
