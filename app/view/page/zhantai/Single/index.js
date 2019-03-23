import React from 'react'
import ReactDOM from 'react-dom'
import classNames from 'classnames'
import QRCode from 'qrcode.react'
import Score from '../Score'
import './index.less'

// eslint-disable-next-line react/prefer-stateless-function
class Single extends React.Component {
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

  render() {
    const { book, theme, mulity } = this.props

    const wrapperCls = classNames({
      wrapper: true,
      wrapper_default: theme !== 'theme1' && theme !== 'theme2',
      wrapper_theme1: theme === 'theme1',
      wrapper_theme2: theme === 'theme2',
      wrapper_mulity: mulity,
    })

    const infoCls = classNames({
      info: true,
      info_small: mulity,
    })

    const authorCls = classNames({
      info_author: true,
      info_author_small: mulity,
    })

    const publishCls = classNames({
      info_publish: true,
      info_publish_small: mulity,
    })

    const introCls = classNames({
      intro: true,
      intro_theme2: theme === 'theme2',
      intro_theme3: theme === 'theme3',
      intro_hidden: mulity,
    })

    return (
      <div className={wrapperCls}>
        <div className="cover">
          <img src={book.cover} onLoad={this.onLoad} ref={this.image} style={{marginLeft: `-${this.state.left}px`}} />
        </div>
        <div className={infoCls}>
          <h2 className="info_title">{book.name}</h2>
          <p className={authorCls}>
            作者：{(book.author && book.author.replace('作者:', '')) || book.publish}
          </p>
          {book.publish &&
            <p className={publishCls}>
              出版公司：{book.publish}
            </p>
          }
          <p className="info_price">定价：<span>{book.pricing}</span> 元</p>
        </div>
        {/* <Score value={book.score || Math.floor((Math.random() * (10 - 8) + 8) * 10) / 10 } mulity={mulity} /> */}
        <Score value={book.score || Math.floor((Math.random() * 0.3 + 9.7) * 10) / 10} mulity={mulity} />
        {
          book.qrcode && 
          <div className="info_qrcode">
            <QRCode value={book.qrcode} size={72} />
          </div>
        }
        <div className={introCls}>
          <p className="intor_content">
            {book.recommender || book.intro}
          </p>
        </div>
      </div>
    )
  }
}

export default Single
