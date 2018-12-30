import React from 'react'
import { connect } from 'dva'
import './index.less'
import Filter from './filter'
import Table from './table'
import CreateButton from './createButton'

const model = 'store'

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
      type: `${model}/findAll`,
      payload: {},
    })
  }

  onSubmit = (data, type) => {
    console.log('onSubmit', data, type)
    this.dispatch({ type: `${model}/${type}`, payload: data })
  }

  onChooseItem = data => {
    this.dispatch({ type: `${model}/chooseSingleItem`, payload: data })
  }

  render() {
    const { store } = this.props
    const { list = [], singleItem } = store
    return (
      <div>
        <div>
          <CreateButton onSubmit={data => this.onSubmit(data, 'create')} />
          <Filter onSubmit={data => this.onSubmit(data, 'findAll')} />
          <Table
            list={list}
            data={singleItem}
            onSubmit={data => this.onSubmit(data, 'update')}
            onDelete={data => this.onSubmit(data, 'remove')}
          />
        </div>
      </div>
    )
  }
}
