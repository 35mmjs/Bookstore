import { Button, Input } from 'antd'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import ajax from '../common/ajax'

function submit(username, password) {
  ajax({
    url: '/user/login.json',
    method: 'post',
    data: {
      username,
      password,
    },
  })
}

function App() {
  const [username, onUsernameChange] = useState('')
  const [password, onPasswordChange] = useState('')
  return (
    <div className="app">
      账号：<Input value={username} onChange={e => onUsernameChange(e.target.value.trim())} />
      密码：<Input value={password} onChange={e => onPasswordChange(e.target.value.trim())} />
      <Button type="primary" onClick={() => submit(username, password)}>提交</Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('__content'))
