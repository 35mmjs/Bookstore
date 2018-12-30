import React, { Fragment, useState } from 'react'
import moment from 'moment'
import { Button, Divider, Table, Form, Input, Modal, Select } from 'antd'
import DescriptionList from '../../common/DescriptionList'
import { SUBMIT_FORM_LAYOUT, FORM_ITEM_LAYOUT } from '../../../common/constant'
import TerminalTypeSelect from '../../common/bizCommon/terminalTypeSelect'

const Search = Input.Search
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
      onSubmit({ ...data, ...fieldsValue })
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
        })(<TerminalTypeSelect />)}
      </FormItem>
    </Modal>
  )
})

const ConfigForm = Form.create()(props => {
  const {
    modalVisible,
    form,
    handleModalVisible,
    onSubmit,
    onSearchingConfig,
    data,
    tableData,
  } = props
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      onSearchingConfig({
        ...fieldsValue,
      })
    })
  }
  const onBindingTerminal = configItem => {
    const { id: configId } = configItem
    const { id: terminalId } = data
    console.log('aaaaaaaa', configId, terminalId)
    if (configId && terminalId) {
      onSubmit({ id: terminalId, view_config: configId })
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '配置备注',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: '配置类型',
      dataIndex: 'type',
      key: 'type',
      render: text => (
        <span>
          {text}
          {/* {VIEW_CONFIG_TYPE_MAP.find(item => item.value === text).label ||
            '暂无'} */}
        </span>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" onClick={() => onBindingTerminal(record)}>
            绑定
          </Button>
          <Divider type="vertical" />
        </span>
      ),
    },
  ]

  return (
    <Modal
      destroyOnClose
      title="配置终端内容"
      visible={modalVisible}
      onOk={() => handleModalVisible()}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('name', {
          rules: [
            {
              // required: true,
              // message: '请输入至少五个字符的规则描述！',
              min: 1,
            },
          ],
        })(<Search placeholder="输入配置名" enterButton onSearch={okHandle} />)}
      </FormItem>
      <Table columns={columns} dataSource={tableData} rowKey="id" />
    </Modal>
  )
})

const Comp = props => {
  const {
    list,
    onDelete,
    onSubmit,
    onSearchingConfig,
    configData,
    onChooseItem,
  } = props
  const [editFormVisible, setEditFormVisible] = useState(false)
  const [configFormVisible, setConfigFormVisible] = useState(false)
  const [viewFormVisible, setViewFormVisible] = useState(false)
  const [viewFormData, setViewFormData] = useState({})
  const [editFormData, setEditFormData] = useState({})

  const columns = [
    {
      title: '终端ID',
      dataIndex: 'id',
      key: 'id',
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
      title: '终端名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '终端类型',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '门店',
      dataIndex: 'store',
      key: 'store',
    },
    {
      title: '区域备注',
      key: 'note',
      dataIndex: 'note',
    },
    {
      title: '录入人',
      key: 'employee_id',
      dataIndex: 'employee_id',
    },
    {
      title: '录入时间',
      key: 'created_at',
      dataIndex: 'created_at',
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Fragment>
          <Button
            onClick={() => {
              setEditFormData(record)
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
    onSubmit: val => onSubmit(val),
    data: editFormData,
  }
  const configFormProps = {
    modalVisible: configFormVisible,
    handleModalVisible: () => setConfigFormVisible(false),
    onSearchingConfig: val => onSearchingConfig(val),
    onSubmit: val => onSubmit(val),
    tableData: configData,
    data: editFormData,
  }

  const viewFormProps = {
    modalVisible: viewFormVisible,
    handleModalVisible: () => setViewFormVisible(false),
    data: viewFormData,
  }

  return (
    <div>
      <Table columns={columns} dataSource={list} rowKey="id" />
      <EditForm {...editFormProps} />
      <ConfigForm {...configFormProps} />
      <ViewForm {...viewFormProps} />
    </div>
  )
}

export default Comp
