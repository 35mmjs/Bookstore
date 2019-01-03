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
      wrapper_lightBlue: theme === 'lightBlue',
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

    const introCls = classNames({
      intro: true,
      intro_lightBlue: theme === 'lightBlue',
      intro_hidden: mulity,
    })

    return (
      <div className={wrapperCls}>
        <div className="cover">
          <img src={book.cover} onLoad={this.onLoad} ref={this.image} style={{marginLeft: `-${this.state.left}px`}} />
        </div>
        <div className={infoCls}>
          <h2 className="info_title">{book.name}</h2>
          <p className={authorCls}>作者：{book.author.replace('作者:', '')}</p>
          <p className="info_price">定价：<span>{book.pricing}</span> 元</p>
        </div>
        <Score value={book.score || Math.floor((Math.random() * (10 - 8) + 8) * 10) / 10 } mulity={mulity} />
        {
          book.qrcode && !mulity &&
          <div className="info_qrcode">
            <QRCode value={book.qrcode} size={100} />
          </div>
        }
        <div className={introCls}>
          <p className="intor_content">
            {book.recommender}
          </p>
        </div>
      </div>
    )
  }
}

export default Single
