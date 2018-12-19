import React, { PureComponent, Fragment } from 'react'
import {
  Table,
  Button,
  Input,
  message,
  Popconfirm,
  Divider,
  Modal,
  Form,
  Row,
  Col,
} from 'antd'
import isEqual from 'lodash/isEqual'
import DescriptionList from '../../common/DescriptionList'
import styles from './style.less'
import { findBookByISBN } from '../service'

const { Description } = DescriptionList

const FormItem = Form.Item

@Form.create()
class SearchingForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      loading: false,
    }
  }

  onSearching = () => {
    const { form, handleModalVisible, onSubmit } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      const { isbn } = fieldsValue
      this.setState({
        loading: true,
      })
      findBookByISBN({ isbn }).then(res => {
        this.setState({
          loading: false,
          data: res,
        })
      })
    })
  }

  handleSubmit = () => {
    const { onSubmit, handleModalVisible } = this.props
    onSubmit(this.state.data)
    handleModalVisible(false)
    this.setState({
      data: {},
    })
  }

  render() {
    const { modalVisible, form, handleModalVisible } = this.props
    return (
      <Modal
        destroyOnClose
        title="搜索书籍"
        visible={modalVisible}
        onOk={this.handleSubmit}
        onCancel={() => handleModalVisible(false)}
      >
        <Row>
          <Col md={20}>
            <FormItem
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 16 }}
              label="描述"
            >
              {form.getFieldDecorator('isbn', {
                rules: [
                  {
                    required: true,
                    message: '请输入正确的ISBN号',
                    min: 1,
                  },
                ],
              })(<Input placeholder="请输入ISBN" />)}
            </FormItem>
          </Col>
          <Col md={4}>
            <FormItem label="">
              <Button
                loading={this.state.loading}
                type="primary"
                htmlType="submit"
                onClick={this.onSearching}
              >
                查询
              </Button>
            </FormItem>
          </Col>
        </Row>
        <div>
          <DescriptionList col={1} title="返回结果">
            {this.state.data &&
              Object.keys(this.state.data).map(key => {
                const obj = this.state.data
                return <Description key={key} term={key}>{obj[key]}</Description>
              })}
          </DescriptionList>
        </div>
      </Modal>
    )
  }
}
class TableForm extends PureComponent {
  index = 0

  cacheOriginData = {}

  constructor(props) {
    super(props)

    this.state = {
      data: props.value,
      loading: false,
      /* eslint-disable-next-line react/no-unused-state */
      value: props.value,
      modalVisible: false,
    }
  }

  static getDerivedStateFromProps(nextProps, preState) {
    if (isEqual(nextProps.value, preState.value)) {
      return null
    }
    return {
      data: nextProps.value,
      value: nextProps.value,
    }
  }

  getRowByKey(key, newData) {
    const { data } = this.state
    return (newData || data).filter(item => item.key === key)[0]
  }

  toggleEditable = (e, key) => {
    e.preventDefault()
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    const target = this.getRowByKey(key, newData)
    if (target) {
      // 进入编辑状态时保存原始数据
      if (!target.editable) {
        this.cacheOriginData[key] = { ...target }
      }
      target.editable = !target.editable
      this.setState({ data: newData })
    }
  }

  newMemberDefault = () => {
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      workId: '',
      name: '',
      department: '',
      editable: true,
      isNew: true,
    })
    this.index += 1
    this.setState({ data: newData })
  }

  newMember = () => {
    this.setState({
      modalVisible: true,
    })
  }

  handleDataFromSearchForm = (bookInfo) => {
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    newData.push({
      key: `NEW_TEMP_ID_${this.index}`,
      ...bookInfo,
      isbn: bookInfo.isbn,
      name: bookInfo.name,
      cover: bookInfo.cover,
      author: bookInfo.author,
      editable: true,
      isNew: true,
    })
    this.index += 1
    this.setState({ data: newData })
  }

  remove(key) {
    const { data } = this.state
    const { onChange } = this.props
    const newData = data.filter(item => item.key !== key)
    this.setState({ data: newData })
    onChange(newData)
  }

  handleKeyPress(e, key) {
    if (e.key === 'Enter') {
      this.saveRow(e, key)
    }
  }

  handleFieldChange(e, fieldName, key) {
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    const target = this.getRowByKey(key, newData)
    if (target) {
      target[fieldName] = e.target.value
      this.setState({ data: newData })
    }
  }

  saveRow(e, key) {
    e.persist()
    this.setState({
      loading: true,
    })
    setTimeout(() => {
      if (this.clickedCancel) {
        this.clickedCancel = false
        return
      }
      const target = this.getRowByKey(key) || {}
      // TOOD 校验关闭
      // if (!target.id || !target.note) {
      //   message.error('请填写完整信息。')
      //   e.target.focus()
      //   this.setState({
      //     loading: false,
      //   })
      //   return
      // }
      delete target.isNew
      this.toggleEditable(e, key)
      const { data } = this.state
      const { onChange } = this.props
      onChange(data)
      this.setState({
        loading: false,
      })
    }, 500)
  }

  cancel(e, key) {
    this.clickedCancel = true
    e.preventDefault()
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    const target = this.getRowByKey(key, newData)
    if (this.cacheOriginData[key]) {
      Object.assign(target, this.cacheOriginData[key])
      delete this.cacheOriginData[key]
    }
    target.editable = false
    this.setState({ data: newData })
    this.clickedCancel = false
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: flag,
    })
  }

  render() {
    const columns = [
      {
        title: '书目ISBN',
        dataIndex: 'isbn',
        key: 'isbn',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'isbn', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="数目ID"
              />
            )
          }
          return text
        },
      },
      {
        title: '图片',
        dataIndex: 'cover',
        key: 'cover',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'id', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="数目ID"
              />
            )
          }
          return (
            <img style={{ width: '100%' }} src={text} alt="暂无图片" />
          )
        },
      },
      {
        title: '书目名称',
        dataIndex: 'name',
        key: 'name',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'id', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="数目ID"
              />
            )
          }
          return text
        },
      },
      {
        title: '作者',
        dataIndex: 'author',
        key: 'author',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'id', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="数目ID"
              />
            )
          }
          return text
        },
      },
      {
        title: '书架位置',
        dataIndex: 'bookShelf',
        key: 'bookShelf',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'id', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="书架位置"
              />
            )
          }
          return text
        },
      },
      {
        title: '备注',
        dataIndex: 'note',
        key: 'note',
        // width: '20%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                onChange={e => this.handleFieldChange(e, 'note', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="备注"
              />
            )
          }
          return text
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          const { loading } = this.state
          if (!!record.editable && loading) {
            return null
          }
          if (record.editable) {
            if (record.isNew) {
              return (
                <span>
                  <a onClick={e => this.saveRow(e, record.key)}>添加</a>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="是否要删除此行？"
                    onConfirm={() => this.remove(record.key)}
                  >
                    <a>删除</a>
                  </Popconfirm>
                </span>
              )
            }
            return (
              <span>
                <a onClick={e => this.saveRow(e, record.key)}>保存</a>
                <Divider type="vertical" />
                <a onClick={e => this.cancel(e, record.key)}>取消</a>
              </span>
            )
          }
          return (
            <span>
              <a onClick={e => this.toggleEditable(e, record.key)}>编辑</a>
              <Divider type="vertical" />
              <Popconfirm
                title="是否要删除此行？"
                onConfirm={() => this.remove(record.key)}
              >
                <a>删除</a>
              </Popconfirm>
            </span>
          )
        },
      },
    ]

    const { loading, data, modalVisible } = this.state

    return (
      <Fragment>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />
        <Button
          style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
          type="dashed"
          onClick={this.newMember}
          icon="plus"
        >
          新增书目
        </Button>
        <SearchingForm
          modalVisible={modalVisible}
          handleModalVisible={this.handleModalVisible}
          onSubmit={this.handleDataFromSearchForm}
        />
      </Fragment>
    )
  }
}

export default TableForm
