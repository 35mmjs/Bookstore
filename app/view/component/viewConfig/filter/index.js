import React from 'react'
import { Row, Col, Radio, Form, Select, Button, Input, Icon, Modal } from 'antd'

import TerminalTypeSelect from '../../common/bizCommon/terminalTypeSelect'

const FormItem = Form.Item

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
          <FormItem label="配置备注">
            {getFieldDecorator('note')(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="配置类型">
            {getFieldDecorator('type', {
              // initialValue: '',
            })(<TerminalTypeSelect />)}
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
