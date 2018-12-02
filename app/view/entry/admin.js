import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'
import AppRouter from '../router/admin'

function App() {
  return (
    <div className="app">
      <AppRouter />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('__content'))
