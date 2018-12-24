import React, { Fragment, useState } from 'react'
import { Button, Divider, Table, Form, Input, Modal, Select } from 'antd'
import {
  VIEW_CONFIG_TYPE_MAP,
  VIEW_CONFIG_ID,
  SUBMIT_FORM_LAYOUT,
  FORM_ITEM_LAYOUT,
  FORM_ITEM_LAYOUT_MODAL,
} from '../../../common/constant'

const { Option } = Select

const FormItem = Form.Item

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleModalVisible, onSubmit } = props
  const okHandle = (e) => {
    e.preventDefault()
    form.validateFields((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      onSubmit({
        ...fieldsValue,
      })
      handleModalVisible()
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
      <FormItem {...FORM_ITEM_LAYOUT_MODAL} label="设备名">
        {form.getFieldDecorator('name', {
          rules: [
            {
              required: true,
              message: '请输入至少3个字符的规则描述！',
              min: 3,
            },
          ],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...FORM_ITEM_LAYOUT_MODAL} label="区域备注">
        {form.getFieldDecorator('note', {
          rules: [
            {
              required: true,
              message: '请输入至少3个字符的规则描述！',
              min: 3,
            },
          ],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem {...FORM_ITEM_LAYOUT_MODAL} label="类型">
        {form.getFieldDecorator('type', {
          rules: [{ required: true, message: '请选择终端类型！' }],
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
      <FormItem {...FORM_ITEM_LAYOUT_MODAL} label="所属门店">
        {form.getFieldDecorator('store', {
          rules: [
            {
              required: true,
              message: '请输入至少3个字符的规则描述！',
              min: 3,
            },
          ],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  )
})

const CreateButton = props => {
  const { onSubmit } = props
  const [modalVisible, handleModalVisible] = useState(false)
  const createFormProps = {
    modalVisible,
    onSubmit,
    handleModalVisible,
  }
  return (
    <div>
      <CreateForm {...createFormProps} />
      <Button type="primary" onClick={() => handleModalVisible(true)}>
        新建
      </Button>
    </div>
  )
}

export default CreateButton
