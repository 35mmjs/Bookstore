import React from 'react'
import Slider from 'react-slick'
import classNames from 'classnames'
import './index.less'

class MapSlider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      slideIndex: 0,
      updateCount: 0,
    }
  }

  render() {
    const { onClick, zoom, hidden } = this.props

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

    const floors = [
      'http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoufloor01.png',
      'http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoufloor02.png',
      'http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoufloor03.png',
      'http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoufloor05.png',
      'http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoufloor06.png',
      'http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoufloor07.png',
    ]

    const maps = [
      'http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoumap01.png',
      'http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoumap02.png',
      'http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoumap03.png',
      'http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoumap05.png',
      'http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoumap06.png',
      'http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoumap07.png',
    ]
    return (
      <div className={cls}>
        <div className="mapslider-index">
          <img src={floors[this.state.slideIndex]} />
        </div>
        <div className="mapslider-content">
          <Slider ref={slider => (this.slider = slider)} {...settings}>
            {
              maps.map((item, index) => {
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
