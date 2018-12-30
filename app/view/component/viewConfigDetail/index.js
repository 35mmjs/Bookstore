import React, { useState } from 'react'
import { Divider, Form, Row, Col, Button, Select, Input } from 'antd'
import ReactJson from 'react-json-view'
import { connect } from 'dva'

import DescriptionList from '../common/DescriptionList'
import TableForm from './tableForm'
import ImageUploader from '../common/ImageUploader'
import {
  VIEW_CONFIG_TYPE_MAP,
  VIEW_CONFIG_ID,
  FORM_ITEM_LAYOUT,
  SUBMIT_FORM_LAYOUT,
  NORMAL_MAP,
} from '../../common/constant'
import TerminalTypeSelect from '../common/bizCommon/terminalTypeSelect'
import PubuForm from './form/pubuForm'
import ZhantaiForm from './form/zhantaiForm'

const { Description } = DescriptionList
const FormItem = Form.Item
const { Option } = Select

const DetailView = ({ data = {} }) => {
  const { type, note, content, created_at, update_at } = data
  console.log('content', content) 
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
        <Description term="配置">
          <ReactJson src={content}/>
        </Description>
        <Description term="创建时间">{created_at}</Description>
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
    const defaultType = data.type || VIEW_CONFIG_ID.PUBU_ID
    this.state = {
      type: defaultType,
      content: null,
    }
  }

  handleSelectChange = val => {
    if (val === VIEW_CONFIG_ID.PUBU_ID) this.setState({ type: val })
    if (val === VIEW_CONFIG_ID.ZHANTAI_ID) this.setState({ type: val })
    if (val === VIEW_CONFIG_ID.DAOSHI_ID) this.setState({ type: val })
  }

  onChildFormSubmit = val => {
    this.setState({ content: val })
  }

  render() {
    const { handleSubmit, form } = this.props
    const { content } = this.state
    const { getFieldDecorator } = form
    const handleFormReset = () => {
      form.resetFields()
    }
    const submitBeforeValidation = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return
        form.resetFields()
        const { type, note } = fieldsValue
        handleSubmit({
          note,
          type,
          content: JSON.stringify(content),
        })
      })
    }

    const detaiform = () => {
      if (this.state.type === VIEW_CONFIG_ID.PUBU_ID) {
        return <PubuForm onSubmit={this.onChildFormSubmit} />
      }
      if (this.state.type === VIEW_CONFIG_ID.ZHANTAI_ID) {
        return <ZhantaiForm onSubmit={this.onChildFormSubmit} />
      }
      if (this.state.type === VIEW_CONFIG_ID.DAOSHI_ID) {
        return <ZhantaiForm onSubmit={this.onChildFormSubmit} />
      }
      return null
    }

    return (
      <Form onSubmit={submitBeforeValidation}>
        <FormItem {...FORM_ITEM_LAYOUT} label="配置备注">
          {getFieldDecorator('note', {
            rules: [
              { required: true, message: '请输入至少3个字符的描述！', min: 3 },
            ],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem {...FORM_ITEM_LAYOUT} label="类型">
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择视图类型！' }],
            initialValue: this.state.type,
          })(<TerminalTypeSelect onChange={this.handleSelectChange} />)}
        </FormItem>
        {detaiform()}
        <FormItem {...SUBMIT_FORM_LAYOUT}>
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
        payload: { id: this.state.id },
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
