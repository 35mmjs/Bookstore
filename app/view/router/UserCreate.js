import React from 'react'
import {
  Button, Input, Icon, Form,
} from 'antd'
import ajax from '../common/ajax'
import useFormState from '../hook/useFormState'

const FormItem = Form.Item

function onSubmit({ username, password }) {
  ajax({
    url: '/user/login.json',
    method: 'post',
    data: {
      username,
      password,
    },
  })
}

export default function UserLogin() {
  const {
    submit, reset, getValidateStatus, getInputProps, hasError,
  } = useFormState('user', onSubmit)
  return (
    <Form>
      <FormItem {...getValidateStatus('username')}>
        <Input {...getInputProps('username')} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
      </FormItem>
      <FormItem {...getValidateStatus('password')}>
        <Input {...getInputProps('password')} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
      </FormItem>
      <FormItem {...getValidateStatus('rootPassword')}>
        <Input {...getInputProps('rootPassword')} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="管理员验证码" />
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          disabled={hasError}
          onClick={submit}
        >
          创建
        </Button>
        <Button
          onClick={reset}
          style={{ marginLeft: 8 }}
        >
          重置
        </Button>
      </FormItem>
    </Form>
  )
}
