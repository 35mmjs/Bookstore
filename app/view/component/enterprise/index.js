import React, { Fragment } from 'react'
import './index.less'
import moment from 'moment'
import {
  Card,
  Form,
  Input,
  Modal,
  Button,
  Divider,
  Table,
} from 'antd'
import useFormModal from '../../hook/useFormModal'
import { create } from './service'

export default function Enterprise() {
  const { modal, modalShow } = useFormModal({
    name: 'enterprise',
    handleSubmit: () => {
    },
  })
  const dataSource = [{
    name: '企业擦擦擦擦',
    created_at: Date.now(),
  }]
  const columns = [
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
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleModalVisible(true)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleRemove(record)}>删除</a>
        </Fragment>
      ),
    },
  ]
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => modalShow('新增企业')}>新增</Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
      {modal}
    </div>
  )
}
