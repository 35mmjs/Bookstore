import { Button } from 'antd'
import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'

function App() {
  return (
    <div className="app">
      Welcome home <Button type="primary">开始</Button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('__content'))
