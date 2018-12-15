import React, { Fragment, useState } from 'react'
import {
  Button, Divider, Table, Form, Input, Modal,
} from 'antd'

const FormItem = Form.Item
const confirm = Modal.confirm

const ViewForm = Form.create()(props => {
  const {
    modalVisible, form, handleModalVisible, onSubmit,
  } = props
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
      title="编辑终端"
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


const EditForm = Form.create()(props => {
  const {
    modalVisible, form, handleModalVisible, onSubmit,
  } = props
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
      title="编辑终端"
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

const ConfigForm = Form.create()(props => {
  const {
    modalVisible, form, handleModalVisible, onSubmit,
  } = props
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

const Comp = ({ list, onDelete, onSubmit }) => {
  const [editFormVisible, setEditFormVisible] = useState(false)
  const [configFormVisible, setConfigFormVisible] = useState(false)
  const [viewFormVisible, setViewFormVisible] = useState(false)

  const columns = [
    {
      title: '终端ID',
      dataIndex: 'id',
      key: 'name',
      render: (value, record) => {
        return <a onClick={() => setViewFormVisible(true)}>{value}</a>
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
          <Button onClick={() => setConfigFormVisible(true)}>配置</Button>
          <Divider type="vertical" />
          <Button onClick={() => setEditFormVisible(true)}>更新</Button>
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
                  onDelete()
                },
                onCancel() {
                },
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
  }
  const configFormProps = {
    modalVisible: configFormVisible,
    handleModalVisible: () => setConfigFormVisible(false),
    onSubmit: val => onSubmit(val, 'config'),
  }

  const viewFormProps = {
    modalVisible: viewFormVisible,
    handleModalVisible: () => setViewFormVisible(false),
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
