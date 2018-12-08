import React from 'react'
import './index.less'
// import Table from './table'
import Form from './form'


export default class Index extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div>
        <div>Store</div>
        <Form />
      </div>
    )
  }
}

