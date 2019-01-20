import React, { Fragment } from 'react'
import { Table, Divider, Button } from 'antd'
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
        title: '名称',
        dataIndex: 'name',
        key: 'name',
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
      // {
      //   title: '录入人',
      //   key: 'recorder',
      //   dataIndex: 'recorder',
      // },
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
            {/* <Link to={`/view-config/manage/detail/${record.id}/edit`}>
              编辑
            </Link> */}
            <Link
              to=""
              onClick={(e) => {
                e.preventDefault()
                this.props.onDelete(record)
              }}
            >
              删除
            </Link>
          </Fragment>
        ),
      },
    ]
  }

  render() {
    return <Table expandedRowRender={record => <div>{record.content}</div>} columns={this.columns} dataSource={this.props.data} rowKey="id" />
  }
}
