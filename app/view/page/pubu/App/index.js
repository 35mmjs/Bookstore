import React from 'react'
import ReactDOM from 'react-dom'
import { message } from 'antd'
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
      current: 0,
    }

    this.timeout = null
    this.wrapper = React.createRef()
    this.banner = React.createRef()
    this.content = React.createRef()
    this.content2 = React.createRef()
    this.content3 = React.createRef()

    this.scale = []
    this.current = 0
  }

  componentDidMount() {
    this.getData()
    this.init()
    document.addEventListener('click', this.handleClick)
  }

  init = () => {
    const wrapper = ReactDOM.findDOMNode(this.wrapper.current)
    const content = ReactDOM.findDOMNode(this.content.current)
    const height = content.offsetHeight > 3220 ? content.offsetHeight : 3220

    wrapper.style.height = height + 'px'
    wrapper.scrollTop = height
  }

  marquee = () => {
    const wrapper = ReactDOM.findDOMNode(this.wrapper.current)
    const content = ReactDOM.findDOMNode(this.content.current)

    if (wrapper.scrollTop === 0) {
      wrapper.scrollTop += content.offsetHeight
    }
    wrapper.scrollTop -= 2 
  }

  getData = () => {
    const loading = message.loading('正在获取数据...', 0)
    getPubuData().then(res => {
      if (!res.data.success) {
        loading()
        console.log('==>', res)
        message.error((res.data && res.data.error) || '获取数据失败')
        return
      }
      const data = res.data.data.map(channel => {
        const layers = channel.books.reduce((acc, book, index) => {
          if (index % 2 === 0) {
            acc.push({
              books: [book],
            })
          } else {
            acc[acc.length - 1].books.push(book)
          }
          return acc
        }, [])
        return {
          banner: channel.banner,
          layers,
        }
      })

      loading()
      message.success('获取数据成功')

      console.log(data)

      this.setState({
        channels: data,
      }, () => {
        const scale = []
        for (let j = 0; j < data.length; j ++) {
          const item = document.getElementById(`0-${j}`)
          scale.push(item.offsetTop)
        }

        this.scale = scale
        this.autoplay()
      })
    }).catch(err => {
      loading()
      message.error('获取数据失败')
      console.error(err)
    })
  }

  handleClick = (e) => {
    e.preventDefault()
    if (!this.state.activeBook) return
    this.pause()
  }

  handleClickBook = (e, book) => {
    this.setState({
      book,
      activeBook: true,
    })
  }

  handleCloseBook = (e) => {
    e.preventDefault()
    e.stopPropagation()

    this.setState({
      activeBook: false,
    }, () => {
      this.autoplay()
    })
  }

  autoplay = () => {
    if (this.timeout) {
      clearInterval(this.timeout)
    }
    this.timeout = setInterval(() => {
      this.marquee()
    }, 20)
  }

  pause = () => {
    clearInterval(this.timeout)
  }

  onScroll = () => {
    const wrapper = ReactDOM.findDOMNode(this.wrapper.current)
    const { scrollTop } = wrapper

    let current = 0
    for (let i = 0; i < this.scale.length; i ++) {
      if (i === 0 && scrollTop <= this.scale[0]) {
        current = 0
        break
      } else if (i < this.scale.length && this.scale[i] < scrollTop && scrollTop < this.scale[i + 1]) {
        current = i + 1
        break
      }
    }

    if (current !== this.current) {
      this.current = current
      this.setState({
        current,
      })
    }
  }

  renderContent = (id) => {
    const { channels } = this.state

    return (
      <div className="content">
        { channels.map((channel, ix) => {
          return (
            <div key={ix}>
              { channel.layers.map((layer, index) => {
                return (
                <Layer key={index}>
                  {
                    layer.books.map((book, i) => {
                      if (!book.score) {
                        book.score = Math.floor((Math.random() * (10 - 8) + 8) * 10) / 10
                      }
                      return (
                        <Book
                          cover={book.cover}
                          name={book.name}
                          author={book.author}
                          pricing={book.pricing}
                          score={book.score}
                          key={i}
                          index={index}
                          handleClickBook={e => this.handleClickBook(e, book)}
                        />
                      )
                    })
                  }
                </Layer>
                )
              })}
              <div id={`${id}-${ix}`}></div>
            </div>
          )
        })}
      </div>
    )
  }

  renderBanner = () => {
    const { channels, current } = this.state
    const x = current * 1080
    const y = 0
    const wrapperStyle = {
      width: `${channels.length * 1080}px`,
      transform: `translate(${-x}px, ${y}px)`
    }
    return (
      <div className="banner-wrapper" style={wrapperStyle}>
        { channels.map((channel, ix) => {
          return (
            <div className="banner-list" key={ix}>
              <Banner src={channel.banner.src} />
            </div>
          )
        })}
      </div>
    )
  }

  render() {
    const { channels } = this.state
    return (
      <div className="app">
        <div className="banner" ref={this.banner}>
          {this.renderBanner()}
        </div>
        <div className="wrapper" ref={this.wrapper} onScroll={this.onScroll}>
          <div ref={this.content}>
            {this.renderContent(0)}
          </div>
          <div ref={this.content2}>
            {this.renderContent(1)}
          </div>
          <div ref={this.content3}>
            {this.renderContent(2)}
          </div>
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
