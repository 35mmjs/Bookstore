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
import { findByEnterprise as findStoreList } from '../store/service'
import { composeAsync, removeConfirm } from '../../common/utils'

const enterprise = window.appData.loginUser.isEnterpriseUser ? window.appData.loginUser.enterprise : null

export default function User() {
  const [dataSource, reload] = useAsyncState(findAll, [])
  const [enterprises] = useAsyncState(findEnterpriseList, [])
  const [stores, reloadStores] = useAsyncState(findStoreList, [], false)
  const { modal, modalShow: storeModalShow } = useFormModal({
    name: 'user',
    schema: {
      enterprise: { type: 'enum', label: '所属企业', disabled: !!enterprise, default: enterprise, required: true, visible: record => !record || !record.is_admin, options: enterprises.map(item => ({ value: item.id, label: item.name })) },
      store: { type: 'enum', label: '所属门店', required: true, visible: record => !record || !record.is_admin, options: stores.map(item => ({ value: item.id, label: item.name })) },
      id: { type: 'hidden' }, // 编辑模式需要传入的字段
      is_admin: { type: 'hidden' },
    },
    handleSubmit: (data) => data.id !== undefined ? composeAsync(update, reload)(data) : composeAsync(create, reload)(data),
    onChange: ({ key, value, setValues }) => {
      if (key === 'enterprise') {
        setValues({ store: undefined })
        reloadStores({ enterprise: value })
      }
    },
  })
  const { modal: enterpriseModal, modalShow: enterpriseModalShow } = useFormModal({
    name: 'user',
    schema: {
      enterprise: { type: 'enum', label: '所属企业', required: true, disabled: !!enterprise, default: enterprise, visible: record => !record || !record.is_admin, options: enterprises.map(item => ({ value: item.id, label: item.name })) },
      id: { type: 'hidden' }, // 编辑模式需要传入的字段
      is_admin: { type: 'hidden' },
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
      title: '所属门店',
      dataIndex: 'store_name',
      render: (val) => <span>{val || '无'}</span>,
    },
    {
      title: '账号类型',
      dataIndex: 'is_admin',
      render: (val, record) => {
        let text
        if (record.is_admin) {
          text = '管理员'
        } else if (record.enterprise && !record.store) {
          text = '企业账号'
        } else {
          text = '门店账号'
        }
        return <span style={{ color: 'red' }}>{text}</span>
      },
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
          &nbsp;&nbsp;
          <a onClick={() => record.store_name ? storeModalShow('修改账号', record) : enterpriseModalShow('修改账号', record)}>修改</a>
        </Fragment>
      ),
    },
  ]
  return (
    <div>
      <Button.Group style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => storeModalShow('新增门店账号')}>新增门店账号</Button>
        &nbsp;&nbsp;
        <Button type="primary" onClick={() => enterpriseModalShow('新增企业账号')}>新增企业账号</Button>
      </Button.Group>
      <Table rowKey="id" dataSource={dataSource} columns={columns} />
      {modal}
      {enterpriseModal}
    </div>
  )
}
