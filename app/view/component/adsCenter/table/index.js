import React, { Fragment, useState, iframe } from 'react'
import moment from 'moment'
import { Link } from 'dva/router'
import { Button, Divider, Table, Form, Input, Modal, message } from 'antd'
import DescriptionList from '../../common/DescriptionList'
import { SUBMIT_FORM_LAYOUT, FORM_ITEM_LAYOUT } from '../../../common/constant'
import useAsyncState from '../../../hook/useAsyncState'
import { findTerminalType } from '../../../common/service'
import TerminalTypeSelect from '../../common/bizCommon/terminalTypeSelect'
import Enterprise from '../../enterprise/index';

const Search = Input.Search
const FormItem = Form.Item
const confirm = Modal.confirm

const { Description } = DescriptionList

const TYPE_MAP = [
  {
    label: 'pubu',
    value: 1,
  },
  {
    label: 'zhantai',
    value: 2,
  },
  {
    label: 'daoshi',
    value: 3,
  },
  {
    label: 'paihang',
    value: 4,
  },
  {
    label: 'paihangbang',
    value: 5,
  },
]

const EditForm = Form.create()(props => {
  const { modalVisible, form, handleModalVisible, onSubmit, data } = props
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      onSubmit({ id: data.id, ...fieldsValue })
      handleModalVisible()
    })
  }
  return (
    <Modal
      destroyOnClose
      title="编辑广告"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem {...FORM_ITEM_LAYOUT} label="设备名称">
        {form.getFieldDecorator('name', {
          initialValue: data.name,
          rules: [
            {
              required: true,
              message: '请输入至少3个字符的规则描述！',
              min: 3,
            },
          ],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...FORM_ITEM_LAYOUT} label="设备备注">
        {form.getFieldDecorator('note', {
          initialValue: data.note,
          rules: [
            {
              required: true,
              message: '请输入至少3个字符的规则描述！',
              min: 3,
            },
          ],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...FORM_ITEM_LAYOUT} label="元数据配置">
        {form.getFieldDecorator('config', {
          initialValue: data.config,
          rules: [
            {
              message: '请输入规则描述！',
            },
          ],
        })(<Input.TextArea placeholder="请输入" rows={6} />)}
      </FormItem>
      <FormItem {...FORM_ITEM_LAYOUT} label="类型">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请选择视图类型！' }],
          initialValue: data.type,
        })(<TerminalTypeSelect />)}
      </FormItem>
    </Modal>
  )
})

const Comp = props => {
  const {
    list,
    onDelete,
    onSubmit,
    onUpdateAds,
    currentType,
  } = props
  const [editFormVisible, setEditFormVisible] = useState(false)
  const [editFormData, setEditFormData] = useState({})
  const [terminalTypeList, reload] = useAsyncState(findTerminalType, {})

  const getEAdsIsOpen = (record) => {
    const loginUser = window.appData.loginUser
    if (loginUser.store && record.enterprise > 0) {
      let storeList = record.store_list || ''
      let listArr = storeList.split(',')
      let isOpen = true
      for (let i = 0; i<listArr.length ; i++) {
        if (listArr[i] == loginUser.store) {
          isOpen = false
        }
      }
      return (
        <Fragment>
          <Button
            onClick={() => onUpdateAds(!isOpen, record)}>
              { isOpen ? '停用此广告' : '启用此广告' }
          </Button>
          <Divider type="vertical" />
        </Fragment>
      )
    } else {
      return ("")
    }

  }

  const columns = [
    {
      title: '广告ID',
      dataIndex: 'id',
      key: 'id',
      render: (value, record) => {
        return (
          <div>
            {value}
          </div>
        )
      },
    },
    {
      title: '广告备注',
      key: 'note',
      dataIndex: 'note',
    },
    {
      title: '广告类型',
      key: 'ad_type',
      dataIndex: 'ad_type',
      render: (value,record) => {
        let res = value
        if (value == 1) {
          res = '图片'
        } else if (value == 2) {
          res = '视频'
        } else if (value == 3) {
          res = '网址'
        }
        return <div>{res}</div>
      },
    },
    {
      title: '广告创建者',
      key: 'type',
      dataIndex: 'type',
      render: (value, record) => {
        // const { view_config } = record
        return (
          <div>
            {record.enterprise > 0 ? '企业创建' : '门店创建' }
          </div>
        )
      },
    },
    {
      title: '设备类型',
      dataIndex: 'type',
      key: 'type',
      render: value => {
        let res = value
        if (terminalTypeList && terminalTypeList.items) {
          const items = terminalTypeList.items
          const item = items.find(i => i.id === value)
          res = item && item.name
        }
        return <div>{res}</div>
      },
    },
    {
      title: '广告地址',
      dataIndex: 'url',
      key: 'url',
      render: (value, record) => {
        // const { view_config } = record
        return (
          <div>
            {record.ad_type < 3 ? (record.ad_type == 1 ? <img src={value}/> : <video src={value}/>) :
            <a href={value} target="_blank" rel="noopener noreferrer">
              {value}
            </a>}
          </div>
        )
      },
    },
    {
      title: '创建时间',
      key: 'gmt_create',
      dataIndex: 'gmt_create',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Fragment>   
          {getEAdsIsOpen(record)}      
          {/* <Button
            onClick={() => {
              setEditFormData(record)
              setEditFormVisible(true)
            }}
          >
            编辑
          </Button>
          <Divider type="vertical" /> */}
          <Button
            type="danger"
            onClick={() => {
              confirm({
                title: '确定删除吗?',
                content: '',
                okText: '确认',
                okType: 'danger',
                cancelText: '取消',
                onOk() {
                  onDelete(record)
                },
                onCancel() {},
              })
            }}
          >
            删除
          </Button>
        </Fragment>
      ),
    },
  ]
  const editFormProps = {
    modalVisible: editFormVisible,
    handleModalVisible: () => setEditFormVisible(false),
    onSubmit: val => onSubmit(val),
    data: editFormData,
  }

  let deviceManager = <view />
  let editM = <view />
  deviceManager = (
    <Table
      columns={columns}
      dataSource={list}
      rowKey="id"
      pagination={{
        pageSize: 25,
      }}
    />
  )
  editM = <EditForm {...editFormProps} />
  return (
    <div>
      {deviceManager}
      {editM}
    </div>
  )
}

export default Comp
