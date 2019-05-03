import React, { Fragment } from 'react'
import './index.less'
import moment from 'moment'
import { Button, Divider, Table, Modal } from 'antd'
import useFormModal from '../../hook/useFormModal'
import useAsyncState from '../../hook/useAsyncState'
import { create, update, remove, findAll } from './service'
import { composeAsync, removeConfirm } from '../../common/utils'

export default function Enterprise() {
  const [dataSource, reload] = useAsyncState(findAll, [])
  const { modal, modalShow } = useFormModal({
    name: 'enterprise',
    schema: {
      id: { type: 'hidden' }, // 更新表单需要传入id, 所以为隐藏类型
    },
    handleSubmit: data =>
      data.id !== undefined
        ? composeAsync(update, reload)(data)
        : composeAsync(create, reload)(data),
  })
  const columns = [
    // {
    //   title: '企业ID',
    //   dataIndex: 'id',
    // },
    {
      title: '企业名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => modalShow('编辑企业', record)}>编辑</a>
          <Divider type="vertical" />
          <a
            onClick={() => composeAsync(removeConfirm, remove, reload)(record)}
          >
            删除
          </a>
        </Fragment>
      ),
    },
  ]
  return (
    <div>
      <Button.Group style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => modalShow('新增企业')}>
          新增企业
        </Button>
      </Button.Group>
      <Table
        rowKey="id"
        dataSource={dataSource}
        columns={columns}
        pagination={{
          pageSize: 25,
        }}
      />
      {modal}
    </div>
  )
}
