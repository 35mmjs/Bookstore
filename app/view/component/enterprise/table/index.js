/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent, Fragment } from 'react'
import moment from 'moment'
import {
  Card,
  Form,
  Input,
  Modal,
  Button,
  Divider,
} from 'antd'
import StandardTable from '../../common/StandardTable'
import styles from './index.less'
import { create, findAll, remove } from '../service'


const FormItem = Form.Item

const CreateForm = Form.create()(props => {
  const {
    modalVisible, form, handleAdd, handleModalVisible,
  } = props
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      const { des } = fieldsValue
      handleAdd({
        name: des,
      })
    })
  }
  return (
    <Modal
      destroyOnClose
      title="新建规则"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="描述">
        {form.getFieldDecorator('des', {
          rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 1 }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  )
})


/* eslint react/no-multi-comp:0 */
// @connect(({ rule, loading }) => ({
//   rule,
//   loading: loading.models.rule,
// }))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    data: {
      list: [],
      pagination: {
        pageSize: '',
        pageNum: '',
        current: '',
      },
    },
  };

  columns = [
    {
      title: '企业名称',
      dataIndex: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      sorter: true,
      render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleModalVisible(true)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleRemove(record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    })
  };

  handleUpdate = (record) => {
    const { id } = record
    remove({ id }).then()
  }

  handleRemove = (record) => {
    const { id } = record
    remove({ id }).then()
  }


  handleAdd = (val) => {
    create(val).then(res => {
      // const { items } = res
    })
  }

  componentDidMount() {
    findAll().then(res => {
      const list = res.items.map((item, index) => {
        return {
          key: index,
          ...item,
        }
      })
      this.setState({
        data: {
          ...this.state.data,
          list,
        },
      })
    })
  }

  // handleStandardTableChange = (pagination, filtersArg, sorter) => {
  // };

  render() {
    const { modalVisible, data, selectedRows } = this.state
    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    }
    const parentMethodsWithUpdate = {
      handleAdd: this.handleUpdate,
      handleModalVisible: this.handleModalVisible,
    }
    console.log('this state', this.state)
    return (
      <div title="查询表格">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
              新建
            </Button>
            <StandardTable
              selectedRows={selectedRows}
              loading={false}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <CreateForm {...parentMethodsWithUpdate} modalVisible={modalVisible} />
      </div>
    )
  }
}

export default TableList
