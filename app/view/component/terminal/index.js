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
    this.state = {
      currentType :1
    }
  }

  componentDidMount() {
    this.dispatch({
      type: 'terminal/findAll',
      payload: {},
    })
    this.dispatch({ type: 'viewConfig/findAll', payload: {} })
  }

  onTypeChange(type){
    this.setState({
      currentType:type
    })
  }

  onSubmit = (data, type) => {
    console.log('onSubmit', data, type)
    // 针对config json序列化
    if (data.config) {
      try {
        data.config = JSON.parse(data.config)
      } catch (e) {
        console.error(e)
        data.config = {}
      }
    }
    data.config = JSON.stringify(data.config)
    this.dispatch({ type: `terminal/${type}`, payload: data })
  }

  onSearchingConfig = (data, type) => {
    this.dispatch({ type: 'viewConfig/findAll', payload: data })
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
        <div>
          <CreateButton onSubmit={data => this.onSubmit(data, 'create')} 
          onTypeChange={type => this.onTypeChange(type)}/>
          <Filter onSubmit={data => this.onSubmit(data, 'findAll')} />
          <Table
            list={list}
            data={singleItem}
            configData={configData}
            currentType={this.state.currentType}
            onSubmit={data => this.onSubmit(data, 'update')}
            onSearchingConfig={data => this.onSearchingConfig(data, 'findAll')}
            onDelete={data => this.onSubmit(data, 'remove')}
          />
        </div>
      </div>
    )
  }
}
