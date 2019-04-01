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
  Select,
} from 'antd'
import isEqual from 'lodash/isEqual'
import SearchBooksByISBNs from './searchBooksByISBNs'
import SearchBooksByISBN from './searchBooksByISBN'
import SearchBooksByCategory from './searchBooksByCategory'
import styles from './style.less'

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
      modalVisible2: false,
      modalVisible3: false,
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

  newMember2 = () => {
    this.setState({
      modalVisible2: true,
    })
  }

  newMember3 = () => {
    this.setState({
      modalVisible3: true,
    })
  }

  handleDataFromSearchForm = bookInfos => {
    const { data } = this.state
    const newData = data.map(item => ({ ...item }))
    if (bookInfos && bookInfos.length > 1) {
      bookInfos.forEach(bookInfo => {
        newData.push({
          key: `NEW_TEMP_ID_${this.index}`,
          ...bookInfo,
          isbn: bookInfo.isbn,
          name: bookInfo.name,
          cover: bookInfo.cover,
          author: bookInfo.author,
          editable: false,
          isNew: true,
          isFromZj: bookInfo.isFromZj,
        })
        this.index += 1
      })
    }
    if (bookInfos && bookInfos.length === 1) {
      const bookInfo = bookInfos[0]
      newData.push({
        key: `NEW_TEMP_ID_${this.index}`,
        ...bookInfo,
        isbn: bookInfo.isbn,
        name: bookInfo.name,
        cover: bookInfo.cover,
        author: bookInfo.author,
        editable: false,
        isNew: true,
        isFromZj: bookInfo.isFromZj,
      })
      this.index += 1
    }
    this.setState({ data: newData }, () => {
      this.props.onChange(this.state.data)
    })
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

  handleModalVisible2 = flag => {
    this.setState({
      modalVisible2: flag,
    })
  }

  handleModalVisible3 = flag => {
    this.setState({
      modalVisible3: flag,
    })
  }

  render() {
    const columns = [
      {
        title: '书目ISBN',
        dataIndex: 'isbn',
        key: 'isbn',
        width: '5%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'isbn', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="ISBN"
              />
            )
          }
          return text
        },
      },
      {
        title: '是否省内',
        dataIndex: 'isFromZj',
        key: 'isFromZj',
        width: '5%',
        render: (text = 'true', record) => {
          const selectMap = [
            {
              label: '是',
              value: 'true',
            },
            {
              label: '否',
              value: 'false',
            },
          ]
          const getLabel = selectMap.find(item => item.value === text).label
          if (record.editable) {
            return (
              <Select
                defaultValue={getLabel}
                onChange={v => {
                  const fakeParam = {
                    target: {
                      value: v,
                    },
                  }
                  this.handleFieldChange(fakeParam, 'isFromZj', record.key)
                }}
              >
                <Select.Option value="true">是</Select.Option>
                <Select.Option value="false">否</Select.Option>
              </Select>
            )
          }
          return getLabel
        },
      },
      {
        title: '图片',
        dataIndex: 'cover',
        key: 'cover',
        width: '10%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'cover', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="图片"
              />
            )
          }
          return <img style={{ width: '100%' }} src={text} alt="暂无图片" />
        },
      },
      {
        title: '书目名称',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'name', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="名称"
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
        width: '10%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e => this.handleFieldChange(e, 'author', record.key)}
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="作者"
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
        width: '5%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e =>
                  this.handleFieldChange(e, 'bookShelf', record.key)
                }
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="书架位置"
              />
            )
          }
          return text
        },
      },
      {
        title: '评分',
        dataIndex: 'score',
        key: 'score',
        width: '5%',
        render: (text, record) => {
          if (record.editable) {
            return (
              <Input
                value={text}
                autoFocus
                onChange={e =>
                  this.handleFieldChange(e, 'score', record.key)
                }
                onKeyPress={e => this.handleKeyPress(e, record.key)}
                placeholder="评分"
              />
            )
          }
          return text
        },
      },
      {
        title: '操作',
        key: 'action',
        width: '10%',
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

    const {
      loading,
      data,
      modalVisible,
      modalVisible2,
      modalVisible3,
    } = this.state

    return (
      <Fragment>
        <Row gutter={16}>
          <Col span={8}>
            <Button
              style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
              type="dashed"
              onClick={this.newMember}
              icon="plus"
            >
              单个ISBN新增书目
            </Button>
          </Col>
          <Col span={8}>
            <Button
              style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
              type="dashed"
              onClick={this.newMember2}
              icon="plus"
            >
              多个ISBN新增书目
            </Button>
          </Col>
          <Col span={8}>
            <Button
              style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
              type="dashed"
              onClick={this.newMember3}
              icon="plus"
            >
              排行榜新增书目
            </Button>
          </Col>
        </Row>
        <Table
          loading={loading}
          columns={columns}
          dataSource={data}
          pagination={false}
          rowClassName={record => (record.editable ? styles.editable : '')}
        />

        <SearchBooksByISBN
          modalVisible={modalVisible}
          handleModalVisible={this.handleModalVisible}
          onSubmit={value => this.handleDataFromSearchForm([value])}
        />
        <SearchBooksByISBNs
          title="title"
          defaultVisible={modalVisible2}
          handleModalVisible={this.handleModalVisible2}
          closable={false}
          onSubmit={this.handleDataFromSearchForm}
        />
        <SearchBooksByCategory
          title="title"
          defaultVisible={modalVisible3}
          handleModalVisible={this.handleModalVisible3}
          closable={false}
          onSubmit={this.handleDataFromSearchForm}
        />
      </Fragment>
    )
  }
}

TableForm.defaultProps = {
  value: [],
}
export default TableForm
