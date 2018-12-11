import React, { Fragment } from 'react'
import { Table, Divider } from 'antd'
import { openHashLink } from '../../../common/native'

const columns = [
  {
    title: '终端ID',
    dataIndex: 'id',
    key: 'name',
    render: (value, record) => {
      return <a href={`#/terminal/manage/detail/${value}`}>{value}</a>
    },
  },
  {
    title: '终端类型',
    dataIndex: 'type',
    key: 'age',
  },
  {
    title: '门店',
    dataIndex: 'store',
    key: 'address',
  },
  {
    title: '区域备注',
    key: 'tags1',
    dataIndex: 'name',
  },
  {
    title: '状态',
    key: 'tags2',
    dataIndex: 'status',
  },
  {
    title: '录入人',
    key: 'tags3',
    dataIndex: 'tags',
  },
  {
    title: '录入时间',
    key: 'tags4',
    dataIndex: 'created_at',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Fragment>
        <a onClick={() => {}}>配置</a>
        <Divider type="vertical" />
        <a
          onClick={() => {
            openHashLink(`#/terminal/manage/detail/${record.id}/edit`)
          }}
        >
          更新
        </a>
        <Divider type="vertical" />
        <a onClick={() => {}}>删除</a>
      </Fragment>
    ),
  },
]

export default class Index extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return <Table columns={columns} dataSource={this.props.data} />
  }
}
