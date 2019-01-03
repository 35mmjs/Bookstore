import React, { useState } from 'react'
import { Card, Form, Row, Col, Button, Select, Input, message } from 'antd'

import DescriptionList from '../../common/DescriptionList'
import TableForm from '../tableForm'
import ImageUploader from '../../common/ImageUploader'

const SinglePubuForm = props => {
  const { onSubmit } = props
  const [image, setImage] = useState(null)
  const [tableForm, setTableForm] = useState(null)
  const [buttonStatus, setButtonStatus] = useState(false)
  const [channel, setChannel] = useState('')
  const onSubmitForm = () => {
    if (!channel || !image || !tableForm) {
      message.warn('请补全信息')
      return
    }
    const form = {
      banner: image,
      books: tableForm,
      channel,
    }
    onSubmit(form, () => {
      setButtonStatus(true)
    })
  }
  return (
    <div>
      <Card title="视图" style={{ marginBottom: 16 }}>
        <div>当前瀑布屏幕名称</div>
        <Input placeholder="请输入" onChange={(e) => setChannel(e.target.value)} />
        <div>banner图片</div>
        <ImageUploader onUploadDone={setImage} />
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
  const [loading, setLoading] = useState(false)
  const increase = () => {
    const item = {
      key: itemArray.length + 1,
    }
    itemArray.push(item)
    pushItemArray(itemArray)
  }
  const increaseItem = (val, cb) => {
    formArray.push(val)
    pushFormArray(formArray)
    cb()
  }
  const saveForms = () => {
    setLoading(true)
    onSubmit(formArray, () => {
      setLoading(false)
    })
  }
  return (
    <Card>
      {itemArray.map(item => {
        return <SinglePubuForm key={item.key} onSubmit={increaseItem} />
      })}
      <Row gutter={32} style={{ marginTop: 32 }}>
        <Col span={8}>
          <Button onClick={() => increase()}>新增</Button>
        </Col>
        <Col span={8}>
          <Button loading={loading} type="primary" onClick={() => saveForms()}>保存全部</Button>
        </Col>
      </Row>
    </Card>
  )
}

PubuForm.defaultProps = {
  onSubmit: (val, cb) => {},
}

export default PubuForm
