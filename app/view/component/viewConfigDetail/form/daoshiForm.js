import React, { useState } from 'react'
import { Divider, Form, Row, Col, Button, Select, Input } from 'antd'
import { connect } from 'dva'

import DescriptionList from '../../common/DescriptionList'
import TableForm from '../tableForm'
import ImageUploader from '../../common/ImageUploader'
import { FORM_ITEM_LAYOUT_VERTICAL, VIEW_CONFIG_ID } from '../../../common/constant'

const FormItem = Form.Item

const ZhantaiForm = (props) => {
  const { form } = props
  return [
    <FormItem {...FORM_ITEM_LAYOUT_VERTICAL} key="books" label="书目录入">
      {form.getFieldDecorator('books', {
        initialValue: null,
      })(<TableForm />)}
    </FormItem>,
  ]
}


export default ZhantaiForm
