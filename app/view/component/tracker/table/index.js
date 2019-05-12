import React from 'react'
import { Table, Button } from 'antd'
import moment from 'moment'
import { bizTypeMap } from '../../common/bizCommon/bizTypeSelect'

export default class App extends React.Component {
  state = {
    filteredInfo: null,
    sortedInfo: null,
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter)
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    })
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state
    sortedInfo = sortedInfo || {}
    filteredInfo = filteredInfo || {}
    const columns = [
      {
        title: '终端名称',
        dataIndex: 'terminal_name',
        key: 'terminal_name',
      },
      {
        title: '埋点事件',
        dataIndex: 'act',
        key: 'act',
      },
      {
        title: '埋点类型',
        dataIndex: 'biz_type',
        key: 'biz_type',
        render: val => {
          const item = bizTypeMap.find(item => item.value === val) || {}
          return item.label || ''
        },
      },
      {
        title: '埋点类型数据',
        dataIndex: 'biz_data',
        key: 'biz_data',
        render: (val, record) => {
          const bizType = record.biz_type
          let label = ''
          switch (bizType) {
            case 'book_detail':
              label = `spbs或者isbn为${val}`
              if (val.length > 7) {
                label = `isbn: ${val}`
              } else {
                label = `spbs: ${val}`
              }
              break
            case 'search':
              label = `搜索字段: ${val}`
              break
            case 'map':
              label = `地图点击次数${val}`
              break
            case 'normal':
              label = `其他${val}`
              break
            default:
              break
          }
          return label
        },
      },
      {
        title: '埋点次数',
        dataIndex: 'value',
        key: 'value',
        sorter: (a, b) => a.value - b.value,
        sortOrder: sortedInfo.columnKey === 'value' && sortedInfo.order,
      },
      {
        title: '更新时间',
        dataIndex: 'updated_at',
        sorter: (a, b) => a.updated_at < b.updated_at,
        sortOrder: sortedInfo.columnKey === 'updated_at' && sortedInfo.order,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
    ]
    if (window.appData.loginUser.isAdmin) {
      columns.unshift({
        title: '门店',
        dataIndex: 'store_name',
        key: 'store_name',
      })
    }
    return (
      <div>
        <Table
          columns={columns}
          dataSource={this.props.list}
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
