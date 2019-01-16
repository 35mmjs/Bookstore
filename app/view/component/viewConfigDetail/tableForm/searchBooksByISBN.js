
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
import SearchBooksByISBNs from './searchBooksByISBNs'
import SearchBooksByCategory from './searchBooksByCategory'
import DescriptionList from '../../common/DescriptionList'
import styles from './style.less'
import { findBookByISBN } from '../service'

const FormItem = Form.Item
const Description = DescriptionList.Description

@Form.create()
export default class SearchingForm extends React.Component {
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
      }).catch(() => {
        this.setState({
          loading: false,
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
                return (
                  <Description key={key} term={key}>
                    {obj[key]}
                  </Description>
                )
              })}
          </DescriptionList>
        </div>
      </Modal>
    )
  }
}