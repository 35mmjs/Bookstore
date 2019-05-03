import React, { Fragment } from 'react'
import moment from 'moment'
import { Table, Divider, Button, Popconfirm, Pagination } from 'antd'
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
        // render: (value, record) => {
        //   return (
        //     <Link to={`/view-config/manage/detail/${value}/view`}>{value}</Link>
        //   )
        // },
      },
      // {
      //   title: '名称',
      //   dataIndex: 'name',
      //   key: 'name',
      // },
      {
        title: '备注',
        dataIndex: 'note',
        key: 'note',
      },
      {
        title: '视图类型',
        dataIndex: 'view_configs_type',
        key: 'view_configs_type',
      },
      {
        title: '录入时间',
        key: 'created_at',
        dataIndex: 'created_at',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '更新时间',
        key: 'updated_at',
        dataIndex: 'updated_at',
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Fragment>
            <Link to={`/view-config/manage/detail/${record.id}/view`}>
              查看 |{' '}
            </Link>
            <Link to={`/view-config/manage/detail/${record.id}/edit`}>
              编辑 |{' '}
            </Link>
            <Popconfirm
              title="是否要删除此行？"
              onConfirm={() => {
                this.props.onDelete(record)
              }}
            >
              <a>删除</a>
            </Popconfirm>
          </Fragment>
        ),
      },
    ]
  }

  render() {
    return (
      <Table
        columns={this.columns}
        dataSource={this.props.data}
        rowKey="id"
        pagination={{
          pageSize: 25,
        }}
      />
    )
  }
}
