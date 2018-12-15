import React from 'react'
import { connect } from 'dva'
import './index.less'
import Filter from './filter'
import Table from './table'

@connect((state) => ({ ...state }))
export default class Index extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'terminal/findAll',
      payload: {},
    })
  }

  onSubmit = () => {
  }

  onDelete = () => {

  }

  render() {
    console.log('aaaaaaaa', this.props)
    const { terminal } = this.props
    const { list } = terminal
    return (
      <div>
        <div>Teminal</div>
        <div>
          <Filter onSubmit={this.onSubmit} />
          <Table list={list} />
        </div>
      </div>
    )
  }
}
