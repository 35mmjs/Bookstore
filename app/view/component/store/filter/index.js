import React from 'react'
import { Row, Col, Radio, Form, Select, Button, Input, Icon, Modal } from 'antd'

import {
  VIEW_CONFIG_TYPE_MAP,
  VIEW_CONFIG_ID,
  SUBMIT_FORM_LAYOUT,
  FORM_ITEM_LAYOUT,
} from '../../../common/constant'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const FormItem = Form.Item
const { Option } = Select

const FilterForm = Form.create()(props => {
  const { form, onSubmit } = props
  const { getFieldDecorator } = form
  const handleSubmit = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return
      // form.resetFields()
      onSubmit({
        ...fieldsValue,
      })
    })
  }
  const handleFormReset = () => {
    form.resetFields()
  }
  return (
    <Form onSubmit={handleSubmit} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={8} sm={24}>
          <FormItem label="门店名">
            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="门店地址">
            {getFieldDecorator('addr')(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem className="">
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>
              重置
            </Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
  )
})

export default FilterForm
