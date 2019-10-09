import React from 'react'
import { connect } from 'dva'
import './index.less'
import Filter from './filter'
import Table from './table'

@connect(({terminalTask, loading}) => ({ ...terminalTask, loading: loading.effects['terminalTask/findAll'] }))
export default class Index extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch } = props
    this.dispatch = dispatch
    this.state = {
      currentType: 0,
    }
  }

  componentDidMount() {
    const params = this.getParams(0)
    this.dispatch({
      type: 'terminalTask/findAll',
      payload: params,
    })
    // this.dispatch({ type: 'viewConfig/findAll', payload: {} })
  }

  onTypeChange(data) {
    this.setState({
      currentType: data.type,
    })
    const params = this.getParams(data.type, 0)
    this.dispatch({
      type: 'terminalTask/findAll',
      payload: params,
    })
  }

  getParams = (page) => {  
    const params = {
      "[]": {
        query: 2,
        page,
        count: 10,
        task: {
          '@schema': 'BOOKSTORE',
          store_id: window.appData.loginUser.store,
          '@order': 'gmt_create-,id-'
        },
        image_upload: {
          '@schema': 'BOOKSTORE',
          '@order': 'gmt_create-',
          'task_id@': '/task/id',
        }
      },
      'total@': '/[]/total'
    }
    return params    
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const params = this.getParams(pagination.current - 1)
    this.dispatch({
      type: 'terminalTask/findAll',
      payload: params,
    });
  };

  onSubmit = data => {
    const params = {
      '@database': 'MYSQL',
      task: {
        store_id: window.appData.loginUser.store,
        status: 0,
        action: data.action,
        comment: data.comment,
        auto_shutdown_time: data.auto_shutdown_time,
        app_url: data.app_url,
        client_id: data.client_id,
        '@schema': 'BOOKSTORE',
      },
      tag: 'task',
    };
    this.dispatch({ type: 'terminalTask/create', payload: params })
  }

  render() {
    // const { terminalTask } = this.props
    const { list, pagination,loading } = this.props
    return (
      <div>
        <div>
          {/* <Filter onSubmit={data => this.onTypeChange(data)} /> */}
          <Table
            list={list}
            pagination={pagination}
            loading={loading}
            onSubmit={data => this.onSubmit(data)}
            onDelete={data => this.onDelete(data)}
            onChange={this.handleStandardTableChange}
          />
        </div>
      </div>
    )
  }
}
