import React from 'react';
import './index.less'

export default class Layer extends React.Component {
  render() {
    const { src, children } = this.props;
    return (
      <div className="layer" >
      {children}
      </div>
    )
  }
}
