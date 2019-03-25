import React, { useState } from 'react'
import { Card, Form, Row, Col, Button, Select, Input, message } from 'antd'

import DescriptionList from '../../common/DescriptionList'
import TableForm from '../tableForm'
import ImageUploader from '../../common/ImageUploader'
import './form.less'

const TABLE_FORM_STRUCT = {
  key: 0,
  books: [],
  channel: '',
}

const TABLE_FORM_ARRAY_STRUCT = [TABLE_FORM_STRUCT]

const PAIHANG_ARRAY = [TABLE_FORM_ARRAY_STRUCT, TABLE_FORM_ARRAY_STRUCT]

const SingleTableForm = props => {
  const {
    index,
    onSave,
    onDelete,
    books = [],
    channel: defaultChannel = '',
    banner = {},
  } = props
  const [image, setImage] = useState(banner.url)
  const [tableForm, setTableForm] = useState(books)
  const [channel, setChannel] = useState(defaultChannel)
  const onSubmitForm = () => {
    if (tableForm.length <= 0) {
      message.warn('请补全信息')
      return
    }
    const form = {
      books: tableForm,
      channel,
      key: index,
    }
    message.success('保存成功')
    onSave(form)
  }
  const handleDelete = () => {
    onDelete({ key: index })
  }
  return (
    <div>
      <Card title={`分类${index + 1}`} style={{ marginBottom: 16 }}>
        <div className="pubu-form-title">分类名称</div>
        <Input
          placeholder="请输入"
          onChange={e => setChannel(e.target.value)}
          defaultValue={channel}
        />
        <div className="pubu-form-title">书籍录入</div>
        <TableForm value={tableForm} onChange={setTableForm} />
        <Button
          className="pubu-form-button"
          type="primary"
          onClick={onSubmitForm}
        >
          保存当前分类
        </Button>
        <Button
          className="pubu-form-button"
          type="primary"
          style={{ marginLeft: 32 }}
          onClick={handleDelete}
        >
          删除
        </Button>
      </Card>
    </div>
  )
}
const SinglePaihangForm = props => {
  const { onSubmit, content = null, index } = props
  let parsedContent = content
  if (content && typeof content === 'string') {
    parsedContent = JSON.parse(content)
  }
  let defaultArray = TABLE_FORM_ARRAY_STRUCT
  if (parsedContent) {
    defaultArray = parsedContent.map((item, index) => {
      return {
        key: index,
        ...item,
      }
    })
  }
  const [itemArray, saveItemArray] = useState(defaultArray)
  const increase = () => {
    const item = {
      key: itemArray.length,
      books: [],
      channel: '',
      banner: {
        url: '',
      },
    }
    itemArray.push(item)
    const newItemArray = itemArray.slice(0)
    saveItemArray(newItemArray)
    onSubmit(newItemArray)
  }
  const saveForm = val => {
    const { key } = val
    const newFormArray = defaultArray.map(item => {
      if (item.key === key) {
        return val
      }
      return item
    })
    saveItemArray(newFormArray)
    onSubmit(newFormArray)
  }
  const deleteForm = val => {
    const { key } = val
    const newFormArray = defaultArray.filter(item => {
      return item.key !== key
    })
    saveItemArray(newFormArray)
    onSubmit(newFormArray)
  }

  return (
    <div>
      <Card title={`排行${index}`} style={{ marginBottom: 16 }}>
        <Card>
          {itemArray.map(item => {
            const dataProps = {
              books: item.books,
              channel: item.channel,
            }
            return (
              <SingleTableForm
                key={item.key}
                index={item.key}
                onSave={saveForm}
                onDelete={deleteForm}
                {...dataProps}
              />
            )
          })}
          <Row gutter={32} style={{ marginTop: 32 }}>
            <Col span={8}>
              <Button onClick={() => increase()}>新增分类</Button>
            </Col>
          </Row>
        </Card>
      </Card>
    </div>
  )
}

const PaihangForm = props => {
  const { onSubmit, content = null } = props
  const defaultPayload = content || PAIHANG_ARRAY
  const [payload, setPayload] = useState(defaultPayload)

  const handleSingleFormSubmit = val => {
    const { index, data } = val
    const newArray = payload.map((item, i) => {
      if (i === index) {
        return data
      }
      return item
    })
    setPayload(newArray)
    onSubmit(newArray)
  }

  return (
    <div>
      {payload.map((item, index) => {
        return (
          <SinglePaihangForm
            key={index}
            index={index}
            content={item}
            onSubmit={val => {
              handleSingleFormSubmit({ index, data: val })
            }}
          />
        )
      })}
    </div>
  )
}

PaihangForm.defaultProps = {
  onSubmit: () => {},
}

export default PaihangForm
