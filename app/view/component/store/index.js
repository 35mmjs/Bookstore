import React, { Fragment } from 'react'
import './index.less'
import moment from 'moment'
import {
  Button,
  Divider,
  Table,
  Modal,
} from 'antd'
import useFormModal from '../../hook/useFormModal'
import useAsyncState from '../../hook/useAsyncState'
import { create, update, remove, findAll } from './service'
import { composeAsync, removeConfirm } from '../../common/utils'

export default function Store() {
  const [dataSource, reload] = useAsyncState(findAll, [])
  console.log(dataSource)

  const { modal, modalShow } = useFormModal({
    name: 'store',
    schema: {
      id: { type: 'hidden' }, // 更新表单需要传入id, 所以为隐藏类型
    },
    handleSubmit: (data) => data.id !== undefined ? composeAsync(update, reload)(data) : composeAsync(create, reload)(data),
  })
  const columns = [
    {
      title: '门店ID',
      dataIndex: 'id',
    },
    {
      title: '门店编号',
      dataIndex: 'store_code',
    },
    {
      title: '门店名称',
      dataIndex: 'name',
    },
    {
      title: '门店地址',
      dataIndex: 'addr',
    },
    {
      title: '配置信息',
      dataIndex: 'config',
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
          <a onClick={() => modalShow('编辑门店', record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => composeAsync(removeConfirm, remove, reload)(record)}>删除</a>
        </Fragment>
      ),
    },
  ]
  return (
    <div>
      <Button.Group style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => modalShow('新增门店')}>新增门店</Button>
      </Button.Group>
      <Table rowKey="id" dataSource={dataSource} columns={columns} />
      {modal}
    </div>
  )
}
