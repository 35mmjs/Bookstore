import React from 'react'
import {
  Row, Col, Radio, Form, Select, Button, Input, Icon, Modal,
} from 'antd'

const RadioButton = Radio.Button
const RadioGroup = Radio.Group
const FormItem = Form.Item
const { Option } = Select


const CreateForm2 = Form.create()(props => {
  const {
    modalVisible = true, form, handleAdd = () => {}, handleModalVisible = () => {},
  } = props
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      const { des } = fieldsValue
      handleAdd({
        name: des,
      })
    })
  }
  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('des', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 1 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  )
})

const CreateForm = Form.create()(props => {
  const { form, onSubmit } = props
  const { getFieldDecorator } = form
  const handleSubmit = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return
      form.resetFields()
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
          <FormItem label="备注">
            {getFieldDecorator('note')(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={8} sm={24}>
          <FormItem label="视图类型">
            {getFieldDecorator('status')(
              <Select placeholder="请选择" style={{ width: '100px' }}>
                <Option value="-1">全部</Option>
                <Option value="0">关闭</Option>
                <Option value="1">运行中</Option>
              </Select>,
            )}
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

@Form.create()
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
            <CreateForm />
          </Col>
        </Row>
      </div>
    )
  }
}
