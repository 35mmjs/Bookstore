import React from 'react'
import './index.less'
import Table from './table'


export default class Index extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <Table />
      </div>
    )
  }
}

