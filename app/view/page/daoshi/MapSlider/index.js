import React from 'react'
import Slider from 'react-slick'
import classNames from 'classnames'
import './index.less'

class MapSlider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      slideIndex: 0,
    }
  }

  render() {
    const { onClick, zoom, hidden, data } = this.props
    const { floor = [], map = [] } = data

    if (!Array.isArray(map) || !Array.isArray(floor)) {
      return null
    }

    const cls = classNames({
      'mapslider': true,
      'mapslider-zoom': zoom,
      'mapslider-hide': hidden,
    })

    const settings = {
      infinite: true,
      slidesToShow: 1,
      autoplay: false,
      autoplaySpeed: 3000,
      variableWidth: true,
      beforeChange: (current, next) => this.setState({ slideIndex: next }),
    }

    return (
      <div className={cls}>
        <div className="mapslider-index">
          <img src={floor[this.state.slideIndex]} />
        </div>
        <div className="mapslider-content">
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            {
              map.map((item, index) => {
                return (
                  <div key={index} onClick={onClick}>
                    <div className="mapslider-image">
                      <img src={item} />
                    </div>
                  </div>
                )
              }) 
            }
          </Slider>
        </div>
      </div>
    )
  }
}

export default MapSlider
