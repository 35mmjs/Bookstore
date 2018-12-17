import React from 'react';
import './index.less'

export default class Banner extends React.Component {
  render() {
    const { src } = this.props;
    return (
      <div className='banner' >
        <img src={src} />
      </div>
    )
  }
}
