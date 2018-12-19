import React, { Fragment, useState } from 'react'
import { Button, Divider, Table, Form, Input, Modal, Select } from 'antd'
import DescriptionList from '../../common/DescriptionList'
import {
  VIEW_CONFIG_TYPE_MAP,
  VIEW_CONFIG_ID,
  SUBMIT_FORM_LAYOUT,
  FORM_ITEM_LAYOUT,
} from '../../../common/constant'

const { Option } = Select
const FormItem = Form.Item
const confirm = Modal.confirm

const { Description } = DescriptionList

const ViewForm = props => {
  const { modalVisible, data, handleModalVisible } = props
  return (
    <Modal
      destroyOnClose
      title="查看"
      visible={modalVisible}
      onOk={() => handleModalVisible()}
      onCancel={() => handleModalVisible()}
    >
      <DescriptionList
        size="large"
        // title="退款申请"
        style={{ marginBottom: 32 }}
        layout="vertical"
        col={1}
      >
        {data &&
          Object.keys(data).map(key => {
            return (
              <Description key={key} term={key}>
                {data[key]}
              </Description>
            )
          })}
      </DescriptionList>
    </Modal>
  )
}

const EditForm = Form.create()(props => {
  const { modalVisible, form, handleModalVisible, onSubmit, data } = props
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      onSubmit(fieldsValue)
      handleModalVisible()
    })
  }
  return (
    <Modal
      destroyOnClose
      title="编辑终端"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem {...FORM_ITEM_LAYOUT} label="描述">
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
      <FormItem {...FORM_ITEM_LAYOUT} label="类型">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请选择视图类型！' }],
          initialValue: data.type,
        })(
          <Select placeholder="请选择" style={{ width: '100px' }}>
            {VIEW_CONFIG_TYPE_MAP &&
              VIEW_CONFIG_TYPE_MAP.map(item => {
                return (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                )
              })}
          </Select>,
        )}
      </FormItem>
    </Modal>
  )
})

const ConfigForm = Form.create()(props => {
  const { modalVisible, form, handleModalVisible, onSubmit } = props
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      const { des } = fieldsValue
      onSubmit({
        name: des,
      })
    })
  }
  return (
    <Modal
      destroyOnClose
      title="配置终端内容"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('des', {
          rules: [
            {
              required: true,
              message: '请输入至少五个字符的规则描述！',
              min: 1,
            },
          ],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  )
})

const Comp = props => {
  console.log('aaaaaaaa', props)
  const { list, onDelete, onSubmit } = props
  const [editFormVisible, setEditFormVisible] = useState(false)
  const [configFormVisible, setConfigFormVisible] = useState(false)
  const [viewFormVisible, setViewFormVisible] = useState(false)
  const [viewFormData, setViewFormData] = useState({})
  const [editFormData, setEditFormData] = useState({})

  const columns = [
    {
      title: '终端ID',
      dataIndex: 'id',
      key: 'name',
      render: (value, record) => {
        return (
          <a
            onClick={() => {
              setViewFormVisible(true)
              setViewFormData(record)
            }}
          >
            {value}
          </a>
        )
      },
    },
    {
      title: '终端类型',
      dataIndex: 'type',
      key: 'age',
    },
    {
      title: '门店',
      dataIndex: 'store',
      key: 'address',
    },
    {
      title: '区域备注',
      key: 'tags1',
      dataIndex: 'name',
    },
    {
      title: '状态',
      key: 'tags2',
      dataIndex: 'status',
    },
    {
      title: '录入人',
      key: 'tags3',
      dataIndex: 'tags',
    },
    {
      title: '录入时间',
      key: 'tags4',
      dataIndex: 'created_at',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Fragment>
          <Button
            onClick={() => {
              setConfigFormVisible(true)
            }}
          >
            配置视图
          </Button>
          <Divider type="vertical" />
          <Button
            onClick={() => {
              setEditFormData(record)
              setEditFormVisible(true)
            }}
          >
            编辑
          </Button>
          <Divider type="vertical" />
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
    onSubmit: val => onSubmit(val, 'edit'),
    data: editFormData,
  }
  const configFormProps = {
    modalVisible: configFormVisible,
    handleModalVisible: () => setConfigFormVisible(false),
    onSubmit: val => onSubmit(val, 'config'),
  }

  const viewFormProps = {
    modalVisible: viewFormVisible,
    handleModalVisible: () => setViewFormVisible(false),
    data: viewFormData,
  }

  return (
    <div>
      <Table columns={columns} dataSource={list} />
      <EditForm {...editFormProps} />
      <ConfigForm {...configFormProps} />
      <ViewForm {...viewFormProps} />
    </div>
  )
}

export default Comp
