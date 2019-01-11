import React, { useState } from 'react'
import {
  Button, Input, Icon, Form, Modal,
} from 'antd'

/**
 * @param onOk - 点击确定回调
 * @param content - modal内容
 * @param disabled - ok按钮是否可点击
 * @return {*}
 * @example
 *
 *  const { modal, modalShow, modalHide, modalLoading } = useModal({ onOk: () => modalLoading(), content: () => <Form>....</Form> })
 *
 */
export default function useModal({ onOk, onCancel, content, disabled }) {
  const [modalState, onModalChange] = useState({ modalVisible: false, title: '', confirmLoading: false })
  const modal = (
    <Modal
      destroyOnClose
      title={modalState.title}
      visible={modalState.modalVisible}
      confirmLoading={modalState.confirmLoading}
      okButtonProps={{ disabled }}
      onOk={onOk}
      onCancel={onCancel || (() => onModalChange({ modalVisible: false }))}
    >
      {content()}
    </Modal>
  )
  return {
    modal,
    modalShow(title) {
      onModalChange({ modalVisible: true, title, confirmLoading: false })
    },
    modalHide() {
      onModalChange({ modalVisible: false, confirmLoading: false })
    },
    modalLoading() {
      onModalChange({ ...modalState, confirmLoading: true })
    },
    modalLoaded() {
      onModalChange({ ...modalState, confirmLoading: false })
    },
  }
}
