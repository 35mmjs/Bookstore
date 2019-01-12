import React from 'react'
import {
  Button, Input, Checkbox, Icon, Form,
} from 'antd'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import useForm from '../hook/useForm'
import ajax from '../common/ajax'

const FormItem = Form.Item

function handleSubmit(data) {
  ajax({
    url: '/user/login.json',
    method: 'post',
    data,
  }).then(() => { window.location.href = '/admin.html' })
}

function App() {
  const {
    submit, reset, getStatus, getProps, hasError,
  } = useForm({
    name: 'user',
    schema: { rememberMe: { type: 'boolean', required: false } },
    handleSubmit,
  })
  return (
    <Form style={{ margin: '32px auto', width: 400 }}>
      <FormItem {...getStatus('username')}>
        <Input {...getProps('username')} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
      </FormItem>
      <FormItem {...getStatus('password')}>
        <Input {...getProps('password')} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
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
        <Checkbox {...getProps('rememberMe')} />
        {' '}
记住我
      </FormItem>
      <a href="/user/createAdmin.html">创建管理员账号</a>
    </Form>
  )
}

ReactDOM.render(<App />, document.getElementById('__content'))
