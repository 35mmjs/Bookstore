import React from 'react'
import { connect } from 'dva'
import './index.less'
import TableList from './tableList'
import Filter from './filter'
import model from './model'

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
    console.log('aaaaaaaa', id)
  }

  handleSubmit = () => {

  }

  render() {
    const { viewConfig } = this.props
    const { list } = viewConfig
    return (
      <div>
        <div>View Config</div>
        <div>
          <Filter onSubmit={this.handleSubmit} />
          <TableList data={list} onDelete={this.handleDelete} />
        </div>
      </div>
    )
  }
}

export default Index
