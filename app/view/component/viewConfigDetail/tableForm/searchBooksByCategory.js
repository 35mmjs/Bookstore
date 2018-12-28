import React, { useState } from 'react'
import PorpTypes from 'prop-types'
import { Modal, Button, Form, Row, Col, Input, Table, Select } from 'antd'
import { findBookByISBNs, findRankingList, findRankingBooks } from '../service'

const FormItem = Form.Item
const { Option } = Select

const BooksTable = ({ data }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Author',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: 'isbn',
      dataIndex: 'isbn',
      key: 'isbn',
    },
  ]
  return <Table columns={columns} dataSource={data} rowKey="isbn" />
}
const CustomForm = Form.create()(props => {
  const { form, onSubmit } = props
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [rankingList, setRankingList] = useState([])

  const onSearching = () => {
    setLoading(true)
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const { type } = fieldsValue
      findRankingBooks({ id: type }).then(res => {
        setLoading(false)
        setData(res)
        onSubmit(res)
      })
    })
  }

  const init = () => {
    if (rankingList && rankingList.length > 0) return
    findRankingList().then(res => {
      setRankingList(res)
    })
  }
  init() 

  return (
    <div>
      <Row>
        <Col md={20}>
          <FormItem
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            label="选择排行"
          >
            {form.getFieldDecorator('type', {
              rules: [{ required: true, message: '请选择排行分类' }],
              // initialValue: '',
            })(
              <Select
                placeholder="请选择分类"
                style={{ width: '200px' }}
                // onChange={handleSelectChange}
              >
                {rankingList &&
                  rankingList.map(item => {
                    return (
                      <Option key={item.value} value={item.value}>
                        {item.label}
                      </Option>
                    )
                  })}
              </Select>,
            )}
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
      <BooksTable data={data} />
      <Row />
    </div>
  )
})

const ModalForm = props => {
  const {
    defaultVisible = false,
    title,
    onSubmit,
    handleModalVisible,
    ...rest
  } = props

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  let form = null
  const submit = () => {
    form.validateFieldsAndScroll((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      onSubmit(data)
      handleModalVisible(false)
    })
  }
  const resetForm = () => {
    form.resetFields()
  }
  const onValueChanged = data => {
    setData(data)
  }
  return (
    <Modal
      visible={defaultVisible}
      title={title}
      footer={[
        <Button key="back" onClick={() => handleModalVisible(false)}>
          取消
        </Button>,
        <Button key="reset" onClick={resetForm}>
          重置
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={submit}>
          提交
        </Button>,
      ]}
      {...rest}
    >
      <CustomForm
        ref={formRef => {
          form = formRef
        }}
        onSubmit={onValueChanged}
      />
    </Modal>
  )
}

ModalForm.propTypes = {
  onSubmit: PorpTypes.func,
}
export default ModalForm
