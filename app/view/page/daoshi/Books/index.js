import React from 'react'
import classNames from 'classnames'
import Cover from './cover'
import './index.less'
// eslint-disable-next-line react/prefer-stateless-function
export default class Books extends React.Component {
  constructor(props) {
    super(props)
  }

  onClick = (e, spbs) => {
    e.preventDefault()

    if (this.props.onClickBook) {
      this.props.onClickBook(spbs)
    }
  }

  handleSearch = (e) => {
    e.preventDefault()
    this.props.handleSearch && this.props.handleSearch(this.state.value)
  }

  render() {
    const { books, isList, hidden } = this.props
    const cls = classNames({
      books: true,
      books_search: isList,
      books_hide: hidden,
    })
    return (
      <div className={cls}>
        <div className="books_list">
          <div className="books_list_content">
            { books.map((book, index) => {
              return (
                <div className="books_list_content_item" key={`${book.isbn}${index}`} onClick={e => this.onClick(e, book.spbs)}>
                  <div className="books_list_cover" key={index}>
                    <Cover src={book.cover} />
                  </div>
                  {
                    isList && (<div className="book_list_info">
                      <h4 className="name">
                        {book.name}
                      </h4>
                      <p>
                        <span>作者：{book.author.replace('作者:', '')}</span>
                      </p>
                      <p>
                        <span>出版社：{book.publish}</span>
                      </p>
                    </div>)
                  }
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
