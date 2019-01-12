import React, { Fragment } from 'react'
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
import { findAll as findEnterpriseList } from '../enterprise/service'
import { composeAsync, removeConfirm } from '../../common/utils'

export default function User() {
  const [dataSource, reload] = useAsyncState(findAll, [])
  const [enterprises] = useAsyncState(findEnterpriseList, [])
  const { modal, modalShow } = useFormModal({
    name: 'user',
    schema: {
      enterprise: { type: 'enum', label: '所属企业', required: true, options: enterprises.map(item => ({ value: item.id, label: item.name })) },
      id: { type: 'hidden' }, // 编辑模式需要传入的字段
    },
    handleSubmit: (data) => data.id !== undefined ? composeAsync(update, reload)(data) : composeAsync(create, reload)(data),
  })
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '所属企业',
      dataIndex: 'enterprise',
      render: (val) => <span>{(enterprises.find(item => item.id === val) || {}).name || '无'}</span>,
    },
    {
      title: '是否为管理员',
      dataIndex: 'is_admin',
      render: (val) => <span>{ val ? '是' : '否'}</span>,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => composeAsync(removeConfirm, remove, reload)(record)}>删除</a>
        </Fragment>
      ),
    },
  ]
  return (
    <div>
      <Button.Group style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => modalShow('新增企业用户')}>新增企业用户</Button>
      </Button.Group>
      <Table rowKey="id" dataSource={dataSource} columns={columns} />
      {modal}
    </div>
  )
}
