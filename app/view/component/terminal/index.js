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
    console.log('onSubmit', data)
    this.dispatch({
      type: 'terminal/findAll',
      payload: {},
    })
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
          {/* <CreateButton /> */}
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
