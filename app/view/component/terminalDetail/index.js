import React from 'react'
import {
  Divider, Form, Row, Col, Button, Select, Input,
} from 'antd'
import DescriptionList from '../common/DescriptionList'
import { findOne } from './service'

const { Description } = DescriptionList
const FormItem = Form.Item
const { Option } = Select

const DetailView = ({ data = {} }) => {
  const {
    type, name, store, config_id, status, created_at, update_at,
  } = data
  return (
    <div>
      <DescriptionList
        size="large"
        title="内容详情"
        style={{ marginBottom: 32 }}
        layout="vertical"
        col={3}
      >
        <Description term="终端名">{name}</Description>
        <Description term="类型">{type}</Description>
        <Description term="状态">{status}</Description>
        <Description term="配置">{config_id}</Description>
        <Description term="更新时间">{created_at}</Description>
      </DescriptionList>
      <Divider style={{ marginBottom: 32 }} />
      {/* <DescriptionList
        size="large"
        title="用户信息"
        style={{ marginBottom: 32 }}
      >
        <Description term="用户姓名">付小小</Description>
        <Description term="联系电话">18100000000</Description>
        <Description term="常用快递">菜鸟仓储</Description>
        <Description term="取货地址">浙江省杭州市西湖区万塘路18号</Description>
        <Description term="备注">无</Description>
      </DescriptionList> */}
    </div>
  )
}

const CreateForm = Form.create()(props => {
  const { form, handleSearch, handleFormReset } = props
  const { getFieldDecorator } = form
  // const okHandle = () => {
  //   form.validateFields((err, fieldsValue) => {
  //     if (err) return
  //     form.resetFields()
  //     const { des } = fieldsValue
  //     handleAdd({
  //       name: des,
  //     })
  //   })
  // }
  return (
    <Form onSubmit={handleSearch} layout="inline">
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={24} sm={24}>
          <FormItem label="规则名称">
            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={24} sm={24}>
          <FormItem label="使用状态">
            {getFieldDecorator('status')(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Option value="0">关闭</Option>
                <Option value="1">运行中</Option>
              </Select>,
            )}
          </FormItem>
        </Col>
        <Col md={24} sm={24}>
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

const EditView = () => {
  return <CreateForm />
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    const { match } = props
    this.state = {
      data: {},
      id: match.params.id,
      operation: match.params.operation,
    }
  }

  componentDidMount() {
    findOne({ id: this.state.id }).then(res => {
      this.setState({
        data: res,
      })
    })
  }

  render() {
    const { operation } = this.state
    return <div>{operation === 'edit' ? <EditView /> : <DetailView data={this.state.data} />}</div>
  }
}
