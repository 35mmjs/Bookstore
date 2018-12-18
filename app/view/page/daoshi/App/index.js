import React from 'react'
import classNames from 'classnames'
import Map from '../Map'
import Book from '../Book'
import Books from '../Books'
import data from './data'
import './index.less'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: [],
      currentBook: data[0],
      showBook: false,
    }
  }

  componentDidMount() {
    this.setState({
      books: data,
    })
  }

  onClickBook = (isbn) => {
    const book = this.state.books.filter(book => book.isbn == isbn)
    this.setState({
      currentBook: book[0],
      showBook: true,
    })
  }

  handleClickBack = () => {
    this.setState({
      showBook: false,
    })
  }

  render() {
    const bookCls = classNames({
      book_detail: true,
      book_detail_show: this.state.showBook,
    })
    return (
      <div className="app">
        <div className="warpper">
          <div className="title" />
          <Map />
          <Book
            book={this.state.currentBook}
            handleClickBack={this.handleClickBack}
            className={bookCls}
          />
          <Books onClickBook={this.onClickBook} books={this.state.books} />
        </div>
      </div>
    )
  }
}

export default App
