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

  onSearchingStore = (data, type) => {
    console.log('aaaaaaaa', data)
    this.dispatch({ type: 'store/findAll', payload: data })
  }

  onChooseItem = data => {
    this.dispatch({ type: 'terminal/chooseSingleItem', payload: data })
  }

  render() {
    const { terminal, store } = this.props
    const { list, singleItem } = terminal
    const { list: storeList } = store
    return (
      <div>
        <div>Teminal</div>
        <div>
          <CreateButton onSearchingStore={this.onSearchingStore} storeList={storeList} onSubmit={data => this.onSubmit(data, 'create')} />
          <Filter onSubmit={data => this.onSubmit(data, 'findAll')} />
          <Table
            list={list}
            data={singleItem}
            onSubmit={data => this.onSubmit(data, 'update')}
            onSearchingConfig={data => this.onSearchingConfig(data, 'findAll')}
            onDelete={data => this.onSubmit(data, 'remove')}
          />
        </div>
      </div>
    )
  }
}
