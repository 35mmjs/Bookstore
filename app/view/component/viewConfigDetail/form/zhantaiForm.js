import React, { useState } from 'react'
import { Card, Form, Row, Col, Button, Select, Input, message } from 'antd'

import DescriptionList from '../../common/DescriptionList'
import TableForm from '../tableForm'
import ImageUploader from '../../common/ImageUploader'
import { addSyntheticLeadingComment } from 'typescript';

const SinglePubuForm = props => {
  const { onSubmit } = props
  const [image, setImage] = useState(null)
  const [tableForm, setTableForm] = useState(null)
  const [buttonStatus, setButtonStatus] = useState(false)
  const [channel, setChannel] = useState('')
  const onSubmitForm = () => {
    if (!tableForm) {
      message.warn('请补全信息')
      return
    }
    const form = {
      books: tableForm,
    }
    setButtonStatus(true)
    onSubmit(form)
  }
  return (
    <div>
      <Card title="视图" style={{ marginBottom: 16 }}>
        <div>书籍录入</div>
        <TableForm onChange={setTableForm} />
        <Button type="primary" onClick={onSubmitForm} disabled={buttonStatus}>
          保存
        </Button>
      </Card>
    </div>
  )
}
const PubuForm = props => {
  const { onSubmit } = props
  const defaultArray = [
    {
      key: 1,
    },
  ]
  const [itemArray, pushItemArray] = useState(defaultArray)
  const [formArray, pushFormArray] = useState([])
  const increase = () => {
    const item = {
      key: itemArray.length + 1,
    }
    itemArray.push(item)
    pushItemArray(itemArray)
  }
  const increaseItem = val => {
    formArray.push(val)
    pushFormArray(formArray)
  }
  const saveForms = () => {
    onSubmit(formArray)
  }
  return (
    <Card>
      {itemArray.map(item => {
        return <SinglePubuForm key={item.key} onSubmit={increaseItem} />
      })}
      <Row gutter={32} style={{ marginTop: 32 }}>
        <Col span={8}>
          <Button type="primary" onClick={() => saveForms()}>保存全部</Button>
        </Col>
      </Row>
    </Card>
  )
}

PubuForm.defaultProps = {
  onSubmit: () => {},
}

export default PubuForm
