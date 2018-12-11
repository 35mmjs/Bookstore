import React from 'react'
import {
  Button, Input, Checkbox, Icon, Form,
} from 'antd'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import useFormState from '../hook/useFormState'
import ajax from '../common/ajax'

const FormItem = Form.Item

function onSubmit(data) {
  ajax({
    url: '/user/login.json',
    method: 'post',
    data,
  }).then(() => { location.href = '/' })
}

function App() {
  const {
    submit, reset, getValidateStatus, getInputProps, hasError,
  } = useFormState('user', onSubmit, { rememberMe: { type: 'boolean', required: false } })
  return (
    <Form style={{ margin: '32px auto', width: 400 }}>
      <FormItem {...getValidateStatus('username')}>
        <Input {...getInputProps('username')} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
      </FormItem>
      <FormItem {...getValidateStatus('password')}>
        <Input {...getInputProps('password')} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          disabled={hasError}
          onClick={submit}
        >
          登陆
        </Button>
        <Button
          onClick={reset}
          style={{ marginLeft: 8, marginRight: 8 }}
        >
          重置
        </Button>
        <Checkbox {...getInputProps('rememberMe')} />
        {' '}
记住我
      </FormItem>
      <a href="/user/createAdmin.html">创建管理员账号</a>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('__content'))
