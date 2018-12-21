import React from 'react'
import { connect } from 'dva'
import './index.less'
import Filter from './filter'
import Table from './table'
import CreateButton from './createButton'

@connect(state => ({ ...state }))
export default class Index extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch } = props
    this.dispatch = dispatch
    this.state = {}
  }

  componentDidMount() {
    this.dispatch({
      type: 'terminal/findAll',
      payload: {},
    })
  }

  onSubmit = (data, type) => {
    console.log('onSubmit', data, type)
    this.dispatch({ type: `terminal/${type}`, payload: data })
  }

  render() {
    const { terminal } = this.props
    const { list, singleItem } = terminal
    return (
      <div>
        <div>Teminal</div>
        <div>
          <CreateButton onSubmit={data => this.onSubmit(data, 'create')} />
          <Filter onSubmit={data => this.onSubmit(data, 'findAll')} />
          <Table
            list={list}
            data={singleItem}
            onChooseItem={data => this.onSubmit(data, 'findOne')}
            onSubmit={data => this.onSubmit(data, 'update')}
            onDelete={data => this.onSubmit(data, 'remove')}
          />
        </div>
      </div>
    )
  }
}
