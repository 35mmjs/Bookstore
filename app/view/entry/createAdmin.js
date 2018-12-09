import React from 'react'
import { Button, Input, Icon, Form } from 'antd'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import ajax from '../common/ajax'
import useFormState from '../hook/useFormState'

const FormItem = Form.Item

function onSubmit(data) {
  ajax({
    url: '/user/createAdmin.json',
    method: 'post',
    data,
  }).then(() => { location.href = '/user/login.html' })
}

function App() {
  const { submit, reset, getValidateStatus, getInputProps, hasError } = useFormState('user', onSubmit, {
    rootPassword: { type: 'string', required: true },
  })
  return (
    <Form style={{ margin: '32px auto', width: 400 }}>
      <FormItem {...getValidateStatus('username')} >
        <Input {...getInputProps('username')} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="管理员账号" />
      </FormItem>
      <FormItem {...getValidateStatus('password')}>
        <Input {...getInputProps('password')} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="管理员密码" />
      </FormItem>
      <FormItem {...getValidateStatus('rootPassword')}>
        <Input {...getInputProps('rootPassword')} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="超级管理员密码" />
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          disabled={hasError}
          onClick={submit}
        >
          创建管理员账号
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

ReactDOM.render(<App />, document.getElementById('__content'))
