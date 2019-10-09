import React, { Fragment, useState, iframe } from 'react'
import moment from 'moment'
import { Link } from 'dva/router'
import { Button, Divider, Table, Form, Input, Modal, TimePicker } from 'antd'
import DescriptionList from '../../common/DescriptionList'
import { SUBMIT_FORM_LAYOUT, FORM_ITEM_LAYOUT } from '../../../common/constant'
import useAsyncState from '../../../hook/useAsyncState'
import { findTerminalType } from '../../../common/service'
import TerminalTypeSelect from '../../common/bizCommon/terminalTypeSelect'
import { openTimeStr } from '../utils'

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
      onSubmit({ id: data.id, action: data.actionType, ...fieldsValue })
      handleModalVisible()
    })
  }
  const format = 'HH:mm';
  return (
    <Modal
      destroyOnClose
      title="任务下发"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
      okText="确认"
      cancelText="取消"
    >
      { data.actionType === 'installApp' && 
        <FormItem {...FORM_ITEM_LAYOUT} label="安装程序">
          {form.getFieldDecorator('app_url', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '请输入安装文件url',
                min: 3,
              },
            ],
          })(<Input placeholder="请输入安装文件url" />)}
      </FormItem>}

      { data.actionType === 'openAutoShutdown' && 
          <FormItem {...FORM_ITEM_LAYOUT} label="设备备注">
          {form.getFieldDecorator('auto_shutdown_time', {
            initialValue: '',
            rules: [],
          })(<TimePicker
              defaultValue={moment('00:00', format)}
              format={format}
          />)}
      </FormItem>}
      <p>{data.modalText}</p>
    </Modal>
  )
})

const Comp = props => {
  const {
    list,
    pagination,
    loading,
    onChange,
    onDelete,
    onSubmit,
  } = props
  const [editFormVisible, setEditFormVisible] = useState(false)
  const [editFormData, setEditFormData] = useState({})
  const [terminalTypeList, reload] = useAsyncState(findTerminalType, {})

  const columns = [
    {
      title: '门店ID',
      dataIndex: 'store_id',
      key: 'store_id',
      sorter: true,
      width: 100,
    },
    {
      title: '设备ID',
      dataIndex: 'client_id',
      key: 'client_id',
      sorter: true,
      width: 80,
    },
    {
      title: '终端名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '备注',
      dataIndex: 'note',
      key: 'note',
    },
    {
      title: '类型',
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
      title: '在线总时长',
      dataIndex: 'gmt_create',
      key: 'gmt_create',
      width: 120,
      render: (value, recode) => {
        return (<div>{openTimeStr(value)}</div>)
      },
    },
    {
      title: '运行状态',
      dataIndex: 'open_status',
      key: 'open_status',
      render: (value, record, index) => {
        let str;
        if (value == 1) {
          str = '开机中';
          return <div style={{ textAlign: 'center', color: '#00ee11' }}>{str}</div>;
        } 
        str = '关机中  ' + record.gmt_last;
        return <div style={{ color: '#ee1100' }}>{str}</div>;
      },
      width: 150,
    },
    {
      title: '任务操作',
      render: (value, record) => {
        let style = {}
        let guanji = <a/>;
        let divider = <view/>;
        if (record.open_status == 0) {
          style = { color: '#aaaaaa' };
        }
        let editData = record
        if (record.type > 1) {
          guanji = (
            <a
              style={style}
              onClick={() => {
                if (record.open_status == 1) {
                  editData.actionType = 'shutdown'
                  editData.modalText = '确认向设备下发关机任务吗？'
                  editData.comment = '关机'
                  setEditFormData(editData)
                  setEditFormVisible(true)
                }
              }}
            >
              关机
            </a>
          );
          divider = <Divider type="vertical" />;
        }
        return (
          <Fragment>
            {guanji}
            {divider}
            <a
              style={style}
              onClick={() => {
                if (record.open_status == 1) {
                  editData.actionType = 'reboot'
                  editData.modalText = '确认向设备下发重启任务吗？'
                  editData.comment = '重启'
                  setEditFormData(editData)
                  setEditFormVisible(true)
                }
              }}
            >
              重启
            </a>

            <Divider type="vertical" />
            <a
              style={style}
              onClick={() => {
                if (record.open_status == 1) {
                  editData.actionType = 'captureScreen'
                  editData.modalText = '确认向设备下发截屏任务吗？'
                  editData.comment = '截屏'
                  setEditFormData(editData)
                  setEditFormVisible(true)
                }
              }}
            >
              截屏
            </a>
            <Divider type="vertical" />
            <a
              style={style}
              onClick={() => {
                if (record.open_status == 1) {
                  editData.actionType = 'openAutoShutdown'
                  editData.modalText = '确认向设备下发定时关机任务吗？'
                  editData.comment = '开启定时关机'
                  setEditFormData(editData)
                  setEditFormVisible(true)
                }
              }}
            >
              开启定时关机
            </a>
            <Divider type="vertical" />
            <a
              style={style}
              onClick={() => {
                if (record.open_status == 1) {
                  editData.actionType = 'closeAutoShutdown'
                  editData.modalText = '确认向设备下发关闭定时关机任务吗？'
                  editData.comment = '关闭定时关机'
                  setEditFormData(editData)
                  setEditFormVisible(true)
                }
              }}
            >
              关闭定时关机
            </a>
            <Divider type="vertical" />
            <a
              style={style}
              onClick={() => {
                if (record.open_status == 1) {
                  editData.actionType = 'installApp'
                  editData.comment = '安装程序'
                  setEditFormData(editData)
                  setEditFormVisible(true)
                }
              }}
            >
              安装程序
            </a>
          </Fragment>
        )
      },
    },
    {
      title: '删除设备',
      // fixed: 'right',
      render: (text, record) => (
        <Fragment>
          <a
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
            删除设备
          </a>
        </Fragment>
      ),
      width: 100,
    },
  ]
  const editFormProps = {
    modalVisible: editFormVisible,
    handleModalVisible: () => setEditFormVisible(false),
    onSubmit: val => onSubmit(val),
    data: editFormData,
  }
  
  return (
    <div>
      <Table
        columns={columns}
        dataSource={list}
        loading={loading}
        rowKey="id"
        pagination={pagination}
        onChange={onChange}
      />
      <EditForm {...editFormProps} />
    </div>
  )
}

export default Comp
