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

  onSearchingConfig = (data, type) => {
    console.log('aaaaaaaa', data)
    this.dispatch({ type: `viewConfig/${type}`, payload: data })
  }

  onChooseItem = data => {
    this.dispatch({ type: 'terminal/chooseSingleItem', payload: data })
  }

  render() {
    const { terminal, viewConfig } = this.props
    const { list, singleItem } = terminal
    const { list: configData } = viewConfig
    return (
      <div>
        <div>Teminal</div>
        <div>
          <CreateButton onSubmit={data => this.onSubmit(data, 'create')} />
          <Filter onSubmit={data => this.onSubmit(data, 'findAll')} />
          <Table
            list={list}
            data={singleItem}
            configData={configData}
            onSubmit={data => this.onSubmit(data, 'update')}
            onSearchingConfig={data => this.onSearchingConfig(data, 'findAll')}
            onDelete={data => this.onSubmit(data, 'remove')}
          />
        </div>
      </div>
    )
  }
}
