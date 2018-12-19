import React from 'react'
import { getZhantaiData } from '../../util/services'
import Single from '../Single'
import books from '../data'
import './index.less'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    getZhantaiData({
      clientId: '1111',
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
  }

  render() {
    const width = books.length > 1 ? 956 * books.length + 'px' : '100%'
    const wrapStyle = {
      width,
    }
    return (
      <div className="app">
        <div className="warpper" style={wrapStyle}>
          {
            books.length === 1 && (
              <Single book={books[0]} theme="lightBlue" />
            )
          }
          { books.length > 1 && books.map((book, index) => {
            const theme = index % 2 === 0 ? 'lightBlue' : ''
            return (
              <Single book={book} theme={theme} mulity key={book.isbn} />
            )
          })
          }
        </div>
      </div>
    )
  }
}

export default App
