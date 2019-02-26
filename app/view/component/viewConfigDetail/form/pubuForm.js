import React, { useState } from 'react'
import { Card, Form, Row, Col, Button, Select, Input, message } from 'antd'

import DescriptionList from '../../common/DescriptionList'
import TableForm from '../tableForm'
import ImageUploader from '../../common/ImageUploader'
import './form.less'

const SinglePubuForm = props => {
  const { index } = props
  const { onSubmit } = props
  const [image, setImage] = useState(null)
  const [tableForm, setTableForm] = useState(null)
  const [buttonStatus, setButtonStatus] = useState(false)
  const [channel, setChannel] = useState('')
  const onSubmitForm = () => {
    if (!image || !tableForm) {
      message.warn('请补全信息')
      return
    }
    const form = {
      banner: {
        url: image,
      },
      books: tableForm,
      channel,
    }
    setButtonStatus(true)
    onSubmit(form)
  }
  return (
    <div>
      <Card title={`瀑布第${index}屏`} style={{ marginBottom: 16 }}>
        <div className="pubu-form-title">备注</div>
        <Input placeholder="请输入" onChange={(e) => setChannel(e.target.value)} />
        <div className="pubu-form-title">顶部Banner图片</div>
        <ImageUploader onUploadDone={setImage} />
        <div className="pubu-form-title">书籍录入</div>
        <TableForm onChange={setTableForm} />
        <Button className="pubu-form-button" type="primary" onClick={onSubmitForm} disabled={buttonStatus}>
          保存当前瀑布屏
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
    onSubmit(formArray)
  }
  return (
    <Card>
      {itemArray.map(item => {
        return <SinglePubuForm key={item.key} index={item.key} onSubmit={increaseItem} />
      })}
      <Row gutter={32} style={{ marginTop: 32 }}>
        <Col span={8}>
          <Button onClick={() => increase()}>新增瀑布屏</Button>
        </Col>
      </Row>
    </Card>
  )
}

PubuForm.defaultProps = {
  onSubmit: () => {},
}

export default PubuForm
