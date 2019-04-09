import React, { Fragment, useState } from 'react'
import moment from 'moment'
import { Link } from 'dva/router'
import { Button, Divider, Table, Form, Input, Modal, message } from 'antd'
import DescriptionList from '../../common/DescriptionList'
import { SUBMIT_FORM_LAYOUT, FORM_ITEM_LAYOUT } from '../../../common/constant'
import useAsyncState from '../../../hook/useAsyncState'
import { findTerminalType } from '../../../common/service'
import TerminalTypeSelect from '../../common/bizCommon/terminalTypeSelect'

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
]
const ViewForm = props => {
  const { modalVisible, data, handleModalVisible } = props
  const { name, type, store, created_at, updated_at, note, view_config } = data
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
        <Description term="终端名">{name}</Description>
        <Description term="类型">{type}</Description>
        <Description term="配置">{view_config}</Description>
        <Description term="门店">{store}</Description>
        <Description term="备注">{note}</Description>
        <Description term="更新时间">{updated_at}</Description>
        <Description term="创建时间">{created_at}</Description>
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
      onSubmit({ id: data.id, ...fieldsValue })
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
  const matchedViewConfigData =
    tableData && tableData.filter(item => item.type === data.type)
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
    if (configId && terminalId) {
      message.success('绑定成功', 1)
      onSubmit({ id: terminalId, view_config: configId })
      handleModalVisible()
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
      dataIndex: 'view_configs_type',
      key: 'view_configs_type',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => {
        return (
          <span>
            {data.view_config && data.view_config === record.id ? (
              <Button
                disabled
                type="primary"
                onClick={() => onBindingTerminal(record)}
              >
                绑定成功
              </Button>
            ) : (
              <Button type="primary" onClick={() => onBindingTerminal(record)}>
                绑定
              </Button>
            )}
          </span>
        )
      },
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
      <Table columns={columns} dataSource={matchedViewConfigData} rowKey="id" />
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
  const [terminalTypeList, reload] = useAsyncState(findTerminalType, {})

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
      title: '视图配置',
      dataIndex: 'view_configs_note',
      key: 'view_configs_note',
      render: (value, record) => {
        const { view_config } = record
        return (
          <div>
            <Link to={`/view-config/manage/detail/${view_config}/view`}>
              {value}
            </Link>
          </div>
        )
      },
    },
    {
      title: '区域备注',
      key: 'note',
      dataIndex: 'note',
    },
    {
      title: '生成地址',
      key: 'created_url',
      dataIndex: 'created_url',
      width: '20%',
      render: (text, record) => {
        const type =
          TYPE_MAP.find(item => item.value === record.type).label || ''
        const url = `http://${window.location.host}/page/${type}?orgId=${
          record.store
        }&clientId=${record.id}`
        if (type === 'paihang') {
          const padUrl = `http://${
            window.location.host
          }/page/paihangpad?orgId=${record.store}&clientId=${
            record.id
          }&navId=1&rankId=1`
          return (
            <div>
              排行选择页面
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
              <br />
              排行pad页面(rankId为排行序列, navId=1为左栏上部对应的排行,
              2为下步对应的排行)
              <a href={padUrl} target="_blank" rel="noopener noreferrer">
                {padUrl}
              </a>
            </div>
          )
        }
        return (
          <div>
            {record.view_config ? (
              <a href={url} target="_blank" rel="noopener noreferrer">
                {url}
              </a>
            ) : (
              '未配置视图'
            )}
          </div>
        )
      },
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
