import React, { Fragment, useState } from 'react'
import { Button, Upload,Divider, Table,Icon, Form, Input, Modal, Select } from 'antd'
import {
  VIEW_CONFIG_TYPE_MAP,
  VIEW_CONFIG_ID,
  SUBMIT_FORM_LAYOUT,
  FORM_ITEM_LAYOUT,
  FORM_ITEM_LAYOUT_MODAL,
} from '../../../common/constant'
import TerminalTypeSelect from '../../common/bizCommon/terminalTypeSelect'
import SingleImgUpload from '../../common/singleImgUpload/index'
const { Option } = Select

const AD_MAP = [
  {
    label: '图片',
    value: 1,
  },
  {
    label: '视频',
    value: 2,
  },
  {
    label: '网址',
    value: 3,
  }
]

const FormItem = Form.Item

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleModalVisible, onSubmit, onUploadDone, onChangeAdType, chooseAdType } = props
  const okHandle = (e) => {
    e.preventDefault()
    form.validateFields((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      console.log('create_ads')
      console.log(fieldsValue)
      // onSubmit({
      //   ...fieldsValue,
      // })
      handleModalVisible()
    })
  }
  const normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  const handleSelectChange = value => {
    console.log(value);
    onChangeAdType(value);
    // this.props.form.setFieldsValue({
    //   note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    // });
  };
  return (
    <Modal
      destroyOnClose
      title="新增投放广告"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem {...FORM_ITEM_LAYOUT_MODAL} label="广告备注">
        {form.getFieldDecorator('note', {
          rules: [
            {
              required: true,
              message: '请输入至少3个字符的描述！',
              min: 3,
            },
          ],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...FORM_ITEM_LAYOUT_MODAL} label="设备类型">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请选择广告投放的设备类型！' }],
        })(<TerminalTypeSelect placeholder="请选择" />)}
      </FormItem>
      <FormItem {...FORM_ITEM_LAYOUT_MODAL} label="广告类型">
        {form.getFieldDecorator('ad_type', {
          rules: [{ required: true, message: '请选择广告类型！' }],
        })(<Select style={{ width: '100px' }} placeholder="请选择" onChange={handleSelectChange}>
          {AD_MAP.map(item => {
            return (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            )
          })}
        </Select>)}
      </FormItem>
      {(chooseAdType === 1 || chooseAdType === 2) && (
        <Form.Item {...FORM_ITEM_LAYOUT_MODAL} label="上传文件" extra="">
          {/* {form.getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: normFile,
          })( */}
          <SingleImgUpload onUploadDone={onUploadDone}></SingleImgUpload>,
          {/* )} */}
        </Form.Item>
      )}
      {chooseAdType === 3 && (
        <FormItem {...FORM_ITEM_LAYOUT_MODAL} label="输入网址">
          {form.getFieldDecorator('url', {
            rules: [
              {
                required: true,
                message: '请输入投放广告的网址！',
                min: 3,
              },
            ],
          })(<Input placeholder="请输入" />)}
        </FormItem>
      )}
      {/* <FormItem {...FORM_ITEM_LAYOUT_MODAL} label="所属门店">
        {form.getFieldDecorator('store', {
          rules: [
            {
              required: true,
              message: '请选择门店',
            },
          ],
        })(<StoreSelect placeholder="请选择" />)}
      </FormItem> */}
    </Modal>
  )
})

const CreateButton = props => {
  const { onSubmit, onUploadDone, onChangeAdType, chooseAdType } = props
  const [modalVisible, handleModalVisible] = useState(false)
  const createFormProps = {
    modalVisible,
    onSubmit,
    onUploadDone,
    handleModalVisible,
    onChangeAdType,
    chooseAdType,
  }
  return (
    <div style={{ marginBottom: 16 }}>
      <CreateForm {...createFormProps} />
      <Button type="primary" onClick={() => handleModalVisible(true)}>
        新建
      </Button>
      &nbsp;&nbsp;
    </div>
  )
}

export default CreateButton
