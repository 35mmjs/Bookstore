import React from 'react'
import { Button, Input, Checkbox, Icon, Form } from 'antd'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import useForm from '../hook/useForm'
import ajax from '../common/ajax'
import './login.less'

const FormItem = Form.Item

function handleSubmit(data) {
  ajax({
    url: '/user/login.json',
    method: 'post',
    data,
  }).then(() => {
    window.location.href = '/admin.html'
  })
}

function App() {
  const { submit, reset, getStatus, getProps, hasError } = useForm({
    name: 'user',
    schema: { rememberMe: { type: 'boolean', required: false } },
    handleSubmit,
  })
  return (
    <div className="bs-bg">
      <div className="bs-redLine" />
      <img
        className="bs-logo"
        src="https://bookstore-prod.oss-cn-hangzhou.aliyuncs.com/%E5%90%8E%E5%8F%B0%E9%A1%B5%E9%9D%A2_03.png"
        alt="pre"
      />
      <div className="bs-form">
        <img
          className="bs-logoMid"
          src="https://bookstore-prod.oss-cn-hangzhou.aliyuncs.com/%E5%90%8E%E5%8F%B0%E9%A1%B5%E9%9D%A2_07.png"
          alt="pre"
        />
        <Form>
          <FormItem {...getStatus('username')}>
            <Input
              className="bs-input"
              {...getProps('username')}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
          </FormItem>
          <FormItem {...getStatus('password')}>
            <Input
              className="bs-input"
              {...getProps('password')}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
          </FormItem>
          <FormItem>
            <Button
              className="bs-loginButton"
              disabled={hasError}
              onClick={submit}
            >
              登陆
            </Button>
            <Button onClick={reset} style={{ marginLeft: 8, marginRight: 8 }}>
              重置
            </Button>
            <Checkbox className="bs-text" {...getProps('rememberMe')}> 记住我 </Checkbox>
          </FormItem>
          <a href="/user/createAdmin.html" className="bs-text">创建管理员账号</a>
        </Form>
      </div>
      <div className="bs-footer">©浙江树联智能科技有限公司</div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('__content'))
