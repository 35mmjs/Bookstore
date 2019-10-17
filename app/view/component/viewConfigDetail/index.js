import React, { useState } from 'react'
import { Divider, Form, Row, Col, Button, Select, Input } from 'antd'
import moment from 'moment'
import ReactJson from 'react-json-view'
import Inspector from 'react-json-inspector'
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
import PaihangForm from './form/paihangForm'

const { Description } = DescriptionList
const FormItem = Form.Item
const { Option } = Select

const DetailView = ({ data = {} }) => {
  const { type, note, content = '{}', created_at, update_at } = data
  const parsedContent = JSON.parse(content)
  return (
    <div>
      <DescriptionList
        size="large"
        title="内容详情"
        style={{ marginBottom: 32 }}
        layout="vertical"
        col={1}
      >
        <Description term="终端名">{note}</Description>
        <Description term="类型">{type}</Description>
        <Description term="配置">
          <ReactJson src={parsedContent} />
        </Description>
        <Description term="创建时间">
          {moment(created_at).format('YYYY-MM-DD HH:mm:ss')}
        </Description>
      </DescriptionList>
      <Divider style={{ marginBottom: 32 }} />
    </div>
  )
}

@Form.create()
class CreateAndEditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      content: null,
      // type: VIEW_CONFIG_ID.PAIHANG_ID,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data && nextProps.data.content) {
      const { note, type, content } = nextProps.data
      this.setState({
        type,
        note,
        content: JSON.parse(content),
      })
    }
  }

  handleSelectChange = val => {
    const { form } = this.props
    form.setFieldsValue({
      type: val,
    })
  }

  onChildFormSubmit = val => {
    this.setState({ content: val })
  }

  submitBeforeValidation = () => {
    const { form, handleSubmit } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) return
      const { type, note } = fieldsValue
      const { content } = this.state
      const payload = {
        note,
        type,
        content: JSON.stringify(content),
      }
      console.log('submit value', payload)
      handleSubmit(payload)
    })
  }

  render() {
    const { form } = this.props
    const { note = '', type = '', content = null } = this.state
    const { getFieldDecorator } = form
    const { getFieldValue } = form
    const choosenType = getFieldValue('type') || type
    const detaiform = () => {
      const mergedProps = {
        content,
        type,
      }
      if (choosenType === VIEW_CONFIG_ID.PUBU_ID) {
        return <PubuForm {...mergedProps} onSubmit={this.onChildFormSubmit} />
      }
      if (choosenType === VIEW_CONFIG_ID.ZHANTAI_ID) {
        return (
          <ZhantaiForm
            {...mergedProps}
            data={content}
            onSubmit={this.onChildFormSubmit}
          />
        )
      }
      if (choosenType === VIEW_CONFIG_ID.DAOSHI_ID) {
        return (
          <ZhantaiForm {...mergedProps} onSubmit={this.onChildFormSubmit} />
        )
      }
      if (choosenType === VIEW_CONFIG_ID.PAIHANG_CONTROL_ID || VIEW_CONFIG_ID.NEW_PAIHANG_CONTROL_ID) {
        return (
          <PaihangForm {...mergedProps} onSubmit={this.onChildFormSubmit} />
        )
      }
      return null
    }

    return (
      <Form>
        <FormItem {...FORM_ITEM_LAYOUT} label="配置备注">
          {getFieldDecorator('note', {
            initialValue: note,
            rules: [
              { required: true, message: '请输入至少3个字符的描述！', min: 3 },
            ],
          })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem {...FORM_ITEM_LAYOUT} label="类型">
          {getFieldDecorator('type', {
            rules: [{ required: true, message: '请选择视图类型！' }],
            initialValue: type,
          })(<TerminalTypeSelect onChange={this.handleSelectChange} />)}
        </FormItem>
        {detaiform()}
        <FormItem
          {...SUBMIT_FORM_LAYOUT}
          style={{ marginTop: 12, textAlign: 'center' }}
        >
          <Button type="primary" onClick={this.submitBeforeValidation}>
            提交
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const EditView = ({ ...props }) => {
  return <CreateAndEditForm {...props} />
}
const CreateView = props => {
  return <CreateAndEditForm {...props} />
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
    if (this.state.operation === 'view' || this.state.operation === 'edit') {
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
    if (this.state.operation === 'edit') {
      dispatch({
        type: 'viewConfigDetail/edit',
        payload: {
          ...param,
          id: this.state.id,
        },
      })
    } else {
      dispatch({
        type: 'viewConfigDetail/create',
        payload: param,
      })
    }
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
    const viewFormProps = {
      data: singleItem,
    }
    return (
      <div>
        {operation === 'edit' ? <EditView {...editFormProps} /> : null}
        {operation === 'new' ? <CreateView {...formProps} /> : null}
        {operation === 'view' ? <DetailView {...viewFormProps} /> : null}
      </div>
    )
  }
}
