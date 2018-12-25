import React, { useState } from 'react'
import { Modal, Button, Form, Row, Col, Input } from 'antd'
import { findBookByISBN } from '../service'

const FormItem = Form.Item

const CustomForm = Form.create()((props) => {
  const { form, onSubmit } = props
  const [loading, setLoading] = useState(false)
  const onSearching = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      const { isbn } = fieldsValue
      findBookByISBN({ isbn }).then(res => {
      })
    })
  }

  const handleSubmit = () => {
  }

  return (
    <div>
      <Row>
        <Col md={20}>
          <FormItem
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            label="描述"
          >
            {form.getFieldDecorator('isbn', {
              rules: [
                {
                  required: true,
                  message: '请输入正确的ISBN号',
                  min: 1,
                },
              ],
            })(<Input placeholder="请输入ISBN" />)}
          </FormItem>
        </Col>
        <Col md={4}>
          <FormItem label="">
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              onClick={onSearching}
            >
              查询
            </Button>
          </FormItem>
        </Col>
      </Row>
    </div>
  )
})

const ModalForm = props => {
  const { defaultVisible = false, title, ...rest } = props
  const [visible, setVisible] = useState(defaultVisible)
  const [loading, setLoading] = useState(false)
  let form = null
  const submit = () => {
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      const { isbn } = fieldsValue
      findBookByISBN({ isbn }).then(res => {
      })
    })
  }
  const resetForm = () => {
    form.resetFields()
  }
  return (
    <Modal
      visible={visible}
      title={title}
      footer={[
        <Button key="back" onClick={() => setVisible(false)}>
          取消
        </Button>,
        <Button key="reset" onClick={resetForm}>
          重置
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={submit}
        >
          提交
        </Button>,
      ]}
      {...rest}
    >
      <CustomForm ref={(formRef) => { form = formRef }} />
    </Modal>
  )
}

export default ModalForm
