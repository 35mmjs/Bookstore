import React from 'react'
import { Divider, Form, Row, Col, Button, Select, Input } from 'antd'
import DescriptionList from '../common/DescriptionList'
import TableForm from './tableForm'
import ImageUploader from '../common/ImageUploader'
import { findOne } from './service'

const { Description } = DescriptionList
const FormItem = Form.Item
const { Option } = Select

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
]

const DetailView = ({ data = {} }) => {
  const { type, name, store, config_id, status, created_at, update_at } = data
  return (
    <div>
      <DescriptionList
        size="large"
        title="退款申请"
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
      <Row>
        <Col>瀑布流配置</Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={24} sm={24}>
          <FormItem label="配置备注">
            {getFieldDecorator('note')(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={24} sm={24}>
          <FormItem label="类型">
            {getFieldDecorator('type')(
              <Select placeholder="请选择" style={{ width: '100%' }}>
                <Option value="0">瀑布</Option>
                <Option value="1">展台</Option>
              </Select>,
            )}
          </FormItem>
        </Col>
        <Col md={24} sm={24}>
          <FormItem label="配置备注">
            {getFieldDecorator('note')(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col>配置内容</Col>
        <Col md={24} sm={24}>
          <FormItem label="顶部图片">
            {getFieldDecorator('banner')(<Input placeholder="请输入" />)}
          </FormItem>
          <Col>
            <ImageUploader />
          </Col>
        </Col>
        <Col>数目录入</Col>
        <Col md={24} sm={24}>
          {getFieldDecorator('members', {
            initialValue: tableData,
          })(<TableForm />)}
        </Col>
        <Col md={24} sm={24}>
          <span className={''}>
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
const CreateView = () => {
  return <CreateForm />
}

export default class Index extends React.Component {
  constructor(props) {
    super(props)
    const { match } = props
    console.log('bbbbbb', match)
    this.state = {
      data: {},
      id: match.params.id,
      operation: match.params.operation,
    }
  }

  componentDidMount() {
    findOne({ id: this.state.id }).then(res => {
      console.log('aaaaaaaa', res)
      this.setState({
        data: res,
      })
    })
  }

  render() {
    const { operation } = this.state
    return (
      <div>
        {operation === 'edit' ? <EditView /> : null}
        {operation === 'new' ? <CreateView /> : null}
        {operation === 'view' ? <DetailView /> : null}
      </div>
    )
  }
}
