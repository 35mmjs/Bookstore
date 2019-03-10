import React from 'react'
import Slider from 'react-slick'
import classNames from 'classnames'

class MapSlider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    const settings = {
      infinite: true,
      slidesToShow: 1,
      autoplay: false,
      autoplaySpeed: 3000,
      variableWidth: true,
    }
    return (
      <div className="mapslider">
        <div className="mapslider-pages">
          <div className="mapslider-pages-prev"></div>
          <div className="mapslider-pages-next"></div>
        </div>
        <Slider ref={slider => (this.slider = slider)} {...settings}>
          <div className="mapslider-image">
            <img src="http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoumap01.png" />
          </div>
          <div className="mapslider-image">
            <img src="http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoumap02.png" />
          </div>
          <div className="mapslider-image">
            <img src="http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoumap03.png" />
          </div>
          <div className="mapslider-image">
            <img src="http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoumap04.png" />
          </div>
          <div className="mapslider-image">
            <img src="http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoumap05.png" />
          </div>
          <div className="mapslider-image">
            <img src="http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoumap06.png" />
          </div>
          <div className="mapslider-image">
            <img src="http://bookstore-public.oss-cn-hangzhou.aliyuncs.com/liuzhoumap07.png" />
          </div>
        </Slider>
      </div>
    )
  }
}

export default MapSlider
