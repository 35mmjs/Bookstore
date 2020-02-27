import React, { useState } from 'react'
import {
  Card,
  Form,
  Row,
  Col,
  Button,
  Select,
  Input,
  message,
  Popconfirm,
} from 'antd'

import DescriptionList from '../../common/DescriptionList'
import TableForm from '../tableForm'
import ImageUploader from '../../common/ImageUploader'
import './form.less'

const SinglePubuForm = props => {
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
      <Card title={`瀑布第${index + 1}屏`} style={{ marginBottom: 16 }}>
        <div className="pubu-form-title">备注</div>
        <Input
          placeholder="请输入"
          onChange={e => setChannel(e.target.value)}
          defaultValue={channel}
        />
        <div className="pubu-form-title">顶部Banner图片</div>
        <ImageUploader onUploadDone={setImage} src={image} />
        <div className="pubu-form-title">书籍录入</div>
        <TableForm value={tableForm} onChange={setTableForm} />
        <Button
          className="pubu-form-button"
          type="primary"
          onClick={onSubmitForm}
        >
          保存当前瀑布屏
        </Button>
        <Popconfirm title="是否要删除此行？" onConfirm={handleDelete}>
          <Button
            className="pubu-form-button"
            type="primary"
            style={{ marginLeft: 32 }}
          >
            删除
          </Button>
        </Popconfirm>
      </Card>
    </div>
  )
}
const PubuForm = props => {
  const { onSubmit, content = null } = props
  let parsedContent = content
  if (content && typeof content === 'string') {
    parsedContent = JSON.parse(content)
  }
  let defaultArray = [
    {
      key: 0,
      books: [],
      channel: '',
      banner: {
        url: '',
      },
    },
  ]
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
  }
  const saveForm = val => {
    const { key } = val
    const newFormArray = itemArray.map(item => {
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
    const newFormArray = itemArray.filter(item => {
      return item.key !== key
    })
    saveItemArray(newFormArray)
    onSubmit(newFormArray)
  }

  return (
    <Card>
      {itemArray.map(item => {
        const dataProps = {
          books: item.books,
          channel: item.channel,
          banner: item.banner,
        }
        return (
          <SinglePubuForm
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
