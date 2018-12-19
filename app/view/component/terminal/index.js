import React from 'react'
import { connect } from 'dva'
import './index.less'
import Filter from './filter'
import Table from './table'
import CreateButton from './createButton'

@connect(state => ({ ...state }))
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

  onSubmit = val => {
    console.log('onSubmit', val)
  }

  onDelete = val => {
    console.log('onDelete', val)
  }

  onChooseItem = val => {
    console.log('onChoose', val)
  }

  render() {
    console.log('aaaaaaaa', this.props)
    const { terminal } = this.props
    const { list, singleItem } = terminal
    return (
      <div>
        <div>Teminal</div>
        <div>
          <CreateButton />
          <Filter onSubmit={this.onSubmit} />
          <Table
            list={list}
            data={singleItem}
            onChooseItem={this.onChooseItem}
            onSubmit={this.onSubmit}
            onDelete={this.onDelete}
          />
        </div>
      </div>
    )
  }
}
