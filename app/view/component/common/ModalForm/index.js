import React, { useState } from 'react'
import { Modal, Button } from 'antd'

const ModalForm = ({
  defaultModalVisible, title, loading = false, children,
}) => {
  const [visible, setVisible] = useState(defaultModalVisible)
  // const okHandle = () => {
  //   const { form, onSubmit } = this.props
  //   form.validateFields((err, fieldsValue) => {
  //     if (err) return
  //     form.resetFields()
  //     onSubmit(fieldsValue)
  //   })
  // }

  return (
    <Modal
      destroyOnClose
      title=""
      visible={visible}
      footer={[
        <Button key="back" onClick={() => setVisible(false)}>
          取消
        </Button>, // <Button key="back" onClick={this.handleCancel}>
        //   重置
        // </Button>,
        <Button
          key="submit"
          type="primary"
          loading={false}
          onClick={() => setVisible(true)}
        >
          提交
        </Button>,
      ]}
    >
      {children}
    </Modal>
  )
}

export default ModalForm
