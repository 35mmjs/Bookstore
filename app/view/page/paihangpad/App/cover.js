import React from 'react'
import ReactDOM from 'react-dom'

import Star from '../Star'
import getStarValues from '../../util/getStarValues'

class Cover extends React.Component {
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
    const { book, isNewPad } = this.props
    const newPadStyle = { width: '1200px', height: '1920px'}
    const newImageSytle = { width: '1200px', height: '1780px'}
    return (
      <div className="cover" style={isNewPad ? newPadStyle : null} onClick={this.props.onClick}>
        <div className="cover-image" style={isNewPad ? newImageSytle : null}>
        { book.cover && (
          <img src={book.cover} onLoad={this.onLoad} ref={this.image} style={{marginLeft: `-${this.state.left}px`}} />
        )}
        </div>
        <div className="cover-info">
          <div className="cover-info-name">{book.name}</div>
          <div className="cover-info-star">
            { getStarValues(book.score).map((value, index) => <Star value={value} key={index} />) }
          </div>
          <div className="cover-info-score">
            {book.score}
          </div>
        </div>
      </div>
    )
  }
}

export default Cover
