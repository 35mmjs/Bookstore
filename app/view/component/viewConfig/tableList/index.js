import React, { Fragment } from 'react'
import { Table, Divider } from 'antd'
import { Link } from 'dva/router'

export default class Index extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.columns = [
      {
        title: '配置ID',
        dataIndex: 'id',
        key: 'id',
        render: (value, record) => {
          return (
            <Link to={`/view-config/manage/detail/${value}/view`}>{value}</Link>
          )
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
            <Link to={`/view-config/manage/detail/${record.id}/edit`}>
              编辑
            </Link>
            <Divider type="vertical" />
            <a
              onClick={() => {
                this.props.onDelete(record)
              }}
            >
              删除
            </a>
          </Fragment>
        ),
      },
    ]
  }

  render() {
    console.log('aaaaaaaa', this.props)
    return <Table columns={this.columns} dataSource={this.props.data} />
  }
}
