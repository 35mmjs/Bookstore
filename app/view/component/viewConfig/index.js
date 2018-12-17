import React from 'react'
import { connect } from 'dva'
import './index.less'
import TableList from './tableList'
import Filter from './filter'

@connect((state) => ({ ...state }))
class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'viewConfig/findAll',
      payload: {},
    })
  }

  handleDelete = (id) => {
    console.log('handleDelete', id)
  }

  handleSubmit = (value) => {
    console.log('handleSubmit', value)
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
