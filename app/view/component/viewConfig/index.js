import React from 'react'
import { connect } from 'dva'
import './index.less'
import TableList from './tableList'
import Filter from './filter'

@connect(state => ({ ...state }))
class Index extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch } = props
    this.state = {}
    this.dispatch = dispatch
  }

  componentDidMount() {
    this.dispatch({
      type: 'viewConfig/findAll',
      payload: {},
    })
  }

  handleDelete = val => {
    console.log('handleDelete', val)
    const { id } = val
    const { dispatch } = this.props
    dispatch({
      type: 'viewConfig/remove',
      payload: { id },
    })
  }

  handleSubmit = value => {
    console.log('handleSubmit', value)
    this.dispatch({
      type: 'viewConfig/findAll',
      payload: value,
    })
  }

  render() {
    const { viewConfig } = this.props
    const { list } = viewConfig
    return (
      <div>
        <div>
          <Filter onSubmit={this.handleSubmit} />
          <TableList data={list} onDelete={this.handleDelete} />
        </div>
      </div>
    )
  }
}

export default Index
