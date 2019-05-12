import React from 'react'
import { connect } from 'dva'
import './index.less'
import Filter from './filter'
import Table from './table'

@connect(state => ({ ...state }))
export default class Index extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch } = props
    this.dispatch = dispatch
    this.state = {
    }
  }

  componentDidMount() {
    this.dispatch({
      type: 'tracker/findAll',
      payload: {},
    })
  }

  onSubmit = (data, type) => {
    console.log('onSubmit', data, type)
    this.dispatch({ type: `tracker/${type}`, payload: data })
  }

  render() {
    const { tracker } = this.props
    const { list } = tracker
    return (
      <div>
        <h3 style={{ color: 'black' }}>最近一周埋点数据</h3>
        <div>
          {/* <Filter onSubmit={data => this.onSubmit(data, 'findAll')} /> */}
          <Table list={list} />
        </div>
      </div>
    )
  }
}
