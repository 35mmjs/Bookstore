import React, { Component } from 'react'
import Slider from 'react-slick'
import { getZhantaiData } from '../../util/services'
import Single from '../Single'
import data from '../data'
import './index.less'


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      handUp: false,
      books: data,
    }

    this.timeout = null
  }

  componentDidMount() {
    this.getData()
    const that = this;
    window.handleBookEvent = function (isbns) {
      that.handleBookEvent(isbns)
    }
  }

  handleBookEvent = (isbns) => {
    this.pause()
    this.setState({
      handUp: true,
      books: data.slice(0, isbns.length),
    }, () => {
      this.autoPlay()
    })
  }

  autoPlay = () => {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(() => {
      this.play()
      this.setState({
        handUp: false,
        books: data,
      })
    }, 5000)
  }

  getData = () => {
    getZhantaiData({ client: '1' })
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

  render() {
    const { books, handUp } = this.state
    const settings = {
      infinite: true,
      slidesToShow: handUp && books.length > 1 ? 2 : 1,
      slidesToScroll: handUp && books.length > 1 ? 2 : 1,
      autoplay: true,
      autoplaySpeed: 3000,
      variableWidth: true,
    }

    console.log('-->', books)
    return (
      <div className="app">
        <div className="warpper">
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            {books.map((book, index) => {
              const theme = index % 2 === 0 ? 'lightBlue' : ''
              return (
                <Single book={book} theme={theme} mulity={handUp && books.length > 1} key={book.id} />
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
