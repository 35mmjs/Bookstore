import React, { Fragment } from 'react'
import { Table, Divider } from 'antd'
import { openHashLink } from '../../../common/native'

const columns = [
  {
    title: '配置ID',
    dataIndex: 'id',
    key: 'id',
    render: (value, record) => {
      return <a href={`#/view-config/manage/detail/${value}/view`}>{value}</a>
    },
  },
  {
    title: '备注',
    dataIndex: 'note',
    key: 'note',
  },
  {
    title: '视图类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '配置内容',
    key: 'content',
    dataIndex: 'content',
  },
  // {
  //   title: '状态',
  //   key: 'status',
  //   dataIndex: 'status',
  // },
  {
    title: '录入人',
    key: 'recorder',
    dataIndex: 'recorder',
  },
  {
    title: '录入时间',
    key: 'created_at',
    dataIndex: 'created_at',
  },
  {
    title: '更新时间',
    key: 'updated_at',
    dataIndex: 'updated_at',
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <Fragment>
        <a
          onClick={() => {
            openHashLink(`#/view-config/manage/detail/${record.id}/edit`)
          }}
        >
          查看
        </a>
        <Divider type="vertical" />
        {/* <a
          onClick={() => {
            openHashLink(`#/view-config/manage/detail/${record.id}/edit`)
          }}
        >
          更新
        </a> */}
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
