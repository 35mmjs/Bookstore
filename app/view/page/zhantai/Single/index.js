import React from 'react'
import classNames from 'classnames'
import QRCode from 'qrcode.react'
import Score from '../Score'
import './index.less'

// eslint-disable-next-line react/prefer-stateless-function
class Single extends React.Component {
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
          <img src={book.cover} />
        </div>
        <div className={infoCls}>
          <h2 className="info_title">{book.name}</h2>
          <p className={authorCls}>作者：{book.author.replace('作者:', '')}</p>
          <p className="info_price">售价：<span>{book.price}</span> 元</p>
          {book.pricing &&
            <p className="info_pricing">定价：{book.pricing} 元</p>
          }
        </div>
        <Score value={book.score || '10.0'} mulity={mulity} />
        {
          book.qrcode && !mulity &&
          <div className="info_qrcode">
            <QRCode value={book.qrcode} size={100} />
          </div>
        }
        <div className={introCls}></div>
      </div>
    )
  }
}

export default Single
