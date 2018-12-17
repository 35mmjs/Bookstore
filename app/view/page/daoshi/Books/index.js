import React from 'react'
import style from './index.less'

export default class Books extends React.Component {
  render() {
    return (
      <div className="books">
        <div className="books_search">
          <input type="text" className="books_search_input" placeholder="输入书名、作者名、支持拼音首字母搜索" />
          <span className="books_search_btn" />
        </div>
      </div>
    )
  }
}
