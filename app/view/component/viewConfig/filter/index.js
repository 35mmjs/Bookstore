import React from 'react'
import {
  Row, Col, Radio, Form, Select, Button, Input, Icon,
} from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const FormItem = Form.Item
const { Option } = Select

const CreateForm = Form.create()(props => {
  const { form, onSubmit } = props
  const { getFieldDecorator } = form
  const handleSubmit = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      const { des } = fieldsValue
      onSubmit({
        name: des,
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
          <FormItem label="规则名称">
            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="使用状态">
            {getFieldDecorator('status')(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Option value="0">关闭</Option>
                <Option value="1">运行中</Option>
              </Select>,
            )}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <span className="">
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>
              重置
            </Button>
          </span>
        </Col>
      </Row>
    </Form>
  )
})

export default class Index extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <RadioGroup defaultValue="all">
              <RadioButton value="all">列表视图</RadioButton>
              <RadioButton value="progress">卡片式图</RadioButton>
            </RadioGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button type="primary" href="#/view-config/manage/detail/new">新建</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <CreateForm onSubmit={this.props.onSubmit} />
          </Col>
        </Row>
      </div>
    )
  }
}
