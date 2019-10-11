import React from 'react'
import { connect } from 'dva'
import './index.less'
import Filter from './filter'
import Table from './table'

@connect(({ terminalControl, loading }) => ({ ...terminalControl, loading: loading.effects['terminalControl/findAll'] }))
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
    const params = this.getParams(this.state.currentType, 0)
    this.dispatch({
      type: 'terminalControl/findAll',
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
      type: 'terminalControl/findAll',
      payload: params,
    })
  }

  getParams = (type, page) => {
    let params = {
      '[]': {
        query: 2,
        page,
        count: 10,
        device_list: {
          '@schema': 'BOOKSTORE',
          delete: 0,
          store_id: window.appData.loginUser.store,
          '@order': 'type+',
        },
        // 'heart_connect[]': {
        //   query: 2,
        //   page: 0,
        //   count: 1,
        //   heart_connect: {
        //     '@schema': 'BOOKSTORE',
        //     '@order': 'gmt_create-',
        //     'device_id@': '/device_list/id',
        //     'client_id@': '[]/device_list/client_id',
        //     'store_id@': '[]/device_list/store_id',
        //   },
        // }
      },
      'total@': '/[]/total',
    };

    if (type > 0) {
      params['[]'].device_list.type = type
      params['[]']['device_list']['@order'] = 'gmt_create-'
    }
    return params    
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const params = this.getParams(this.state.currentType, pagination.current - 1)
    this.dispatch({
      type: 'terminalControl/findAll',
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
        device_id: data.id,
        '@schema': 'BOOKSTORE',
      },
      tag: 'task',
    };
    this.dispatch({ type: 'terminalControl/create', payload: params })
  }

  onDelete = data => {
    const params = {
      '@database': 'MYSQL',
      device_list: {
        id: data.id,
        delete: 1,
        '@schema': 'BOOKSTORE',
      },
      tag: 'device_list',
    };
    this.dispatch({ type:'terminalControl/remove', payload: params })
  }
  

  render() {
    // const { terminalControl } = this.props
    const { list, pagination, loading } = this.props
    return (
      <div>
        <div>
          <Filter onSubmit={data => this.onTypeChange(data)} />
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
