import React from 'react'
import './index.less'
import TableList from './tableList'
import Filter from './filter'
import { findAll } from './service'

export default class Index extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    findAll().then(res => {
      console.log('aaaaaaaa', res)
      this.setState({
        list: res.items,
      })
    })
  }
  render() {
    return (
      <div>
        <div>Teminal</div>
        <div>
          <Filter />
          <TableList data={this.state.list} />
        </div>
      </div>
    )
  }
}
