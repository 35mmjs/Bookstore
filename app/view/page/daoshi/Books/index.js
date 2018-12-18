import React from 'react'
import './index.less'
// eslint-disable-next-line react/prefer-stateless-function
export default class Books extends React.Component {
  onClick = (e, isbn) => {
    e.preventDefault()

    if (this.props.onClickBook) {
      this.props.onClickBook(isbn)
    }
  }

  render() {
    const { books } = this.props
    return (
      <div className="books">
        <div className="books_search">
          <input type="text" className="books_search_input" placeholder="输入书名、作者名、支持拼音首字母搜索" />
          <span className="books_search_btn" />
        </div>
        <div className="books_list">
          <div className="books_list_content">
            { books.map((book, index) => {
              return (
                <div className="books_list_cover" onClick={e => this.onClick(e, book.isbn)} key={index}>
                  <img src={book.cover} />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
