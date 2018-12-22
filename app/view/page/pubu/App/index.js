import React from 'react'
import ReactDOM from 'react-dom'
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
    this.wrapper = React.createRef()
    this.content = React.createRef()
    this.content2 = React.createRef()
    this.content3 = React.createRef()
  }

  componentDidMount() {
    this.getData()
    this.init()
    document.addEventListener('click', this.handleClick)
  }

  init = () => {
    const wrapper = ReactDOM.findDOMNode(this.wrapper.current)
    const content = ReactDOM.findDOMNode(this.content.current)
    const height = content.offsetHeight > 3840 ? content.offsetHeight : 3840

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
    getPubuData().then(res => {
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

      console.log(data)

      this.setState({
        channels: data,
      }, () => {
        this.autoplay()
      })
    }).catch(err => {
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

  renderContent = () => {
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
                      return (
                        <Book
                          cover={book.cover}
                          name={book.name}
                          author={book.author}
                          price={book.price}
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
        <div className="wrapper" ref={this.wrapper}>
          <div ref={this.content}>
            {this.renderContent()}
          </div>
          <div ref={this.content2}>
            {this.renderContent()}
          </div>
          <div ref={this.content3}>
            {this.renderContent()}
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
