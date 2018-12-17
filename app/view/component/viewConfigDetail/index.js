import React, { useState } from 'react'
import { Divider, Form, Row, Col, Button, Select, Input } from 'antd'
import { connect } from 'dva'

import DescriptionList from '../common/DescriptionList'
import TableForm from './tableForm'
import ImageUploader from '../common/ImageUploader'
import { VIEW_CONFIG_TYPES } from '../../common/constant'

const { Description } = DescriptionList
const FormItem = Form.Item
const { Option } = Select

const tableData = [
  // {
  //   key: '1',
  //   id: '00001',
  //   note: 'John Brown',
  // },
]

const DetailView = ({ data = {} }) => {
  const { type, note, content, created_at, update_at } = data
  return (
    <div>
      <DescriptionList
        size="large"
        title="退款申请"
        style={{ marginBottom: 32 }}
        layout="vertical"
        col={1}
      >
        <Description term="终端名">{note}</Description>
        <Description term="类型">{type}</Description>
        <Description term="配置">{JSON.stringify(content)}</Description>
        <Description term="更新时间">{created_at}</Description>
      </DescriptionList>
      <Divider style={{ marginBottom: 32 }} />
    </div>
  )
}

@Form.create()
class CreateForm extends React.Component {
  constructor(props) {
    super(props)
    const { data = {} } = props
    const defaultType = data.type || 'pubu'
    this.state = {
      type: defaultType,
    }
  }

  handleSelectChange = val => {
    if (val === 'pubu') this.setState({ type: val })
    if (val === 'zhantai') this.setState({ type: val })
  }

  render() {
    const { handleSubmit, form } = this.props
    const { getFieldDecorator } = form
    const handleFormReset = () => {
      form.resetFields()
    }
    const submitBeforeValidation = () => {
      form.validateFields((err, fieldsValue) => {
        console.log('aaaaaaaa', err, fieldsValue)
        if (err) return
        form.resetFields()
        const { banner = {}, books, type, note } = fieldsValue
        const content = {
          banner: banner.url,
          books,
        }
        handleSubmit({
          note,
          type,
          content: JSON.stringify(content),
        })
      })
    }

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    }
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    }

    const pubuForm = () => (
      <div>
        <FormItem {...formItemLayout} label="瀑布图片">
          {getFieldDecorator('banner', {
            rules: [
              { type: 'object', required: true, message: '请上传一张图' },
            ],
            trigger: 'onUploadDone',
          })(<ImageUploader />)}
        </FormItem>
        <FormItem {...formItemLayout} label="书目录入">
          {getFieldDecorator('books', {
            initialValue: tableData,
          })(<TableForm />)}
        </FormItem>
      </div>
    )
    const zhantaiForm = () => (
      <div>
        <FormItem {...formItemLayout} label="书目录入">
          {getFieldDecorator('books', {
            initialValue: tableData,
          })(<TableForm />)}
        </FormItem>
      </div>
    )

    const detaiform = () => {
      if (this.state.type === 'pubu') return pubuForm()
      if (this.state.type === 'zhantai') return zhantaiForm()
      return null
    }

    return (
      <Form onSubmit={submitBeforeValidation}>
        <FormItem {...formItemLayout} label="配置备注">
          {getFieldDecorator('note', {
            rules: [
              { required: true, message: '请输入至少3个字符的描述！', min: 3 },
            ],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="类型">
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择视图类型！' }],
            initialValue: this.state.type,
          })(
            <Select
              placeholder="请选择"
              style={{ width: '100px' }}
              onChange={this.handleSelectChange}
            >
              {VIEW_CONFIG_TYPES &&
                VIEW_CONFIG_TYPES.map(item => {
                  return (
                    <Option key={item.value} value={item.value}>
                      {item.label}
                    </Option>
                  )
                })}
            </Select>,
          )}
        </FormItem>
        {detaiform()}
        {/* <FormItem {...formItemLayout} label="瀑布图片">
        {getFieldDecorator('banner', {
          rules: [{ type: 'object', required: true, message: '请上传一张图' }],
          trigger: 'onUploadDone',
        })(<ImageUploader />)}
      </FormItem>
      <FormItem {...formItemLayout} label="书目录入">
        {getFieldDecorator('books', {
          initialValue: tableData,
        })(<TableForm />)}
      </FormItem> */}
        <FormItem {...submitFormLayout}>
          <Button type="primary" htmlType="submit">
            新建
          </Button>
          <Button style={{ marginLeft: 8 }} onClick={handleFormReset}>
            重置
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const EditView = ({ data, ...rest }) => {
  return <CreateForm data={data} {...rest} />
}
const CreateView = props => {
  return <CreateForm {...props} />
}
@connect(state => ({
  ...state,
}))
export default class Index extends React.Component {
  constructor(props) {
    super(props)
    const { match } = props
    this.state = {
      id: match.params.id,
      operation: match.params.operation,
    }
  }

  componentDidMount = () => {
    if (this.state.operation === 'view') {
      const { dispatch } = this.props
      dispatch({
        type: 'viewConfigDetail/findOne',
        payload: this.state.id,
      })
    }
  }

  handleSubmit = param => {
    console.log('handleSubmit', param)
    const { dispatch } = this.props
    dispatch({
      type: 'viewConfigDetail/create',
      payload: param,
    })
  }

  render() {
    const { operation } = this.state
    const { viewConfigDetail } = this.props
    const { singleItem } = viewConfigDetail
    const formProps = {
      handleSubmit: this.handleSubmit,
    }
    const editFormProps = {
      handleSubmit: this.handleSubmit,
      data: singleItem,
    }
    return (
      <div>
        {operation === 'edit' ? <EditView {...editFormProps} /> : null}
        {operation === 'new' ? <CreateView {...formProps} /> : null}
        {operation === 'view' ? <DetailView data={singleItem} /> : null}
      </div>
    )
  }
}
