import React from 'react'
import ReactDOM from 'react-dom'

class Cover extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      left: 0,
    }
    this.image = React.createRef()
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
    const { left } = this.state
    const style = {
      marginLeft: `-${left}px`,
    }
    return (
      <React.Fragment>
        <img src={this.props.src} onLoad={this.onLoad} ref={this.image} style={style} />

        <span className="qrcode">我就是喜人</span>
      </React.Fragment>

    )
  }
}

export default Cover;
