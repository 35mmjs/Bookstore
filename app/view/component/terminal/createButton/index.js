import React, { Fragment, useState } from 'react'
import { Button, Divider, Table, Form, Input, Modal, Select } from 'antd'
import {
  VIEW_CONFIG_TYPE_MAP,
  VIEW_CONFIG_ID,
  SUBMIT_FORM_LAYOUT,
  FORM_ITEM_LAYOUT,
} from '../../../common/constant'

const FormItem = Form.Item

const CreateForm = Form.create()(props => {
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
