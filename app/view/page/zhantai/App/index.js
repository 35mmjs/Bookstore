import React from 'react';
import Single from '../Single'
import books from '../data';
import './index.less'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  render() {
    const width = books.length > 1 ? 956 * books.length + 'px' : '100%';
    const wrapStyle = {
      width,
    };
    return (
      <div className="app">
        <div className="warpper" style={wrapStyle}> 
          {
            books.length === 1 && (
              <Single book={books[0]} theme={'lightBlue'} />
            )
          }
          { books.length > 1 && books.map((book, index) => {
              const theme = index % 2 === 0 ? 'lightBlue' : '';
              console.log(theme)
              return (
                <Single book={book} theme={theme} mulity key={index} />
              )
           })
          }
        </div>
      </div>
    )
  }
}

export default App;
