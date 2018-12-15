import React, { Fragment, useState } from 'react'
import { Button, Divider, Table, Form, Input, Modal } from 'antd'

const FormItem = Form.Item

const EditForm = Form.create()(props => {
  const { modalVisible, form, handleModalVisible, onSubmit } = props
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return
      form.resetFields()
      const { des } = fieldsValue
      onSubmit({
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
          rules: [
            {
              required: true,
              message: '请输入至少五个字符的规则描述！',
              min: 1,
            },
          ],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  )
})

// class Index extends React.Component {
//   constructor() {
//     super()
//     this.state = {}
//     this.columns = [
//       {
//         title: '终端ID',
//         dataIndex: 'id',
//         key: 'name',
//         render: (value, record) => {
//           return <a href={`#/terminal/manage/detail/${value}`}>{value}</a>
//         },
//       },
//       {
//         title: '终端类型',
//         dataIndex: 'type',
//         key: 'age',
//       },
//       {
//         title: '门店',
//         dataIndex: 'store',
//         key: 'address',
//       },
//       {
//         title: '区域备注',
//         key: 'tags1',
//         dataIndex: 'name',
//       },
//       {
//         title: '状态',
//         key: 'tags2',
//         dataIndex: 'status',
//       },
//       {
//         title: '录入人',
//         key: 'tags3',
//         dataIndex: 'tags',
//       },
//       {
//         title: '录入时间',
//         key: 'tags4',
//         dataIndex: 'created_at',
//       },
//       {
//         title: '操作',
//         key: 'action',
//         render: (text, record) => (
//           <Fragment>
//             <Button onClick={() => {}}>配置</Button>
//             <Divider type="vertical" />
//             <Button onClick={() => {}}>更新</Button>
//             <Divider type="vertical" />
//             <Button
//               onClick={() => {
//                 this.props.onDelete()
//               }}
//             >
//               删除
//             </Button>
//           </Fragment>
//         ),
//       },
//     ]
//   }

//   render() {
//     const { list } = this.props
//     const { editFormVisible, setEditFormVisible } = useState(false)
//     console.log('aaaaaaaa', this.props)
//     return (
//       <div>
//         <Table columns={this.columns} dataSource={list} />
//         <EditForm modalVisible={editFormVisible} />
//       </div>
//     )
//   }
// }

const Comp = ({ list, onDelete, onSubmit }) => {
  const [editFormVisible, setEditFormVisible] = useState(false)

  const columns = [
    {
      title: '终端ID',
      dataIndex: 'id',
      key: 'name',
      render: (value, record) => {
        return <a href={`#/terminal/manage/detail/${value}`}>{value}</a>
      },
    },
    {
      title: '终端类型',
      dataIndex: 'type',
      key: 'age',
    },
    {
      title: '门店',
      dataIndex: 'store',
      key: 'address',
    },
    {
      title: '区域备注',
      key: 'tags1',
      dataIndex: 'name',
    },
    {
      title: '状态',
      key: 'tags2',
      dataIndex: 'status',
    },
    {
      title: '录入人',
      key: 'tags3',
      dataIndex: 'tags',
    },
    {
      title: '录入时间',
      key: 'tags4',
      dataIndex: 'created_at',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Fragment>
          <Button onClick={() => {}}>配置</Button>
          <Divider type="vertical" />
          <Button onClick={() => setEditFormVisible(true)}>更新</Button>
          <Divider type="vertical" />
          <Button
            onClick={() => {
              onDelete()
            }}
          >
            删除
          </Button>
        </Fragment>
      ),
    },
  ]
  const editFormProps = {
    modalVisible: editFormVisible,
    handleModalVisible: () => setEditFormVisible(false),
    onSubmit: val => onSubmit(val, 'edit'),
  }
  return (
    <div>
      <Table columns={columns} dataSource={list} />
      <EditForm {...editFormProps} />
    </div>
  )
}

export default Comp
