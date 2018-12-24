import React from 'react'
import classNames from 'classnames'
import { message } from 'antd'
import { search, getBook } from '../../util/services'
import Map from '../Map'
import Book from '../Book'
import Books from '../Books'
import data from './data'
import './index.less'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSearch: false,
      books: [],
      currentBook: data[0],
      searchValue: '',
      beforeStatus: [1, 1, 0],
      status: [1, 1, 0],
    }
  }

  componentDidMount() {
    this.setState({
      books: data,
    })
  }

  onClickBook = (isbn) => {
    const loading = message.loading('正在查询...', 0)
    getBook({ isbn })
      .then(res => {
        const { data } = res
        console.log(data.data)
        this.setState({
          currentBook: data.data,
          status: [0, 1, 1],
          beforeStatus: [1, 1, 0],
        }, () => {
          loading()
          message.success('查询成功')
        })
      })
      .catch(err => {
        loading()
        message.error('获取书本详情失败，请稍后再试')
      })
  }

  onChange = (e) => {
    this.setState({
      searchValue: e.target.value,
    })
  }

  onKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.handleSearch(e)
    }
  }

  handleClickBack = () => {
    const { status, beforeStatus } = this.state
    this.setState({
      beforeStatus: [1, 1, 0],
      status: beforeStatus,
    })
  }

  handleClickMap = (callback) => {
    this.setState({
      beforeStatus: this.state.status,
      status: [2, 0, 0],
    }, () => {
      setTimeout(callback, 300)
    })
  }

  handleShowPosition = () => {
    this.setState({
      status: [1, 0, 1],
      beforeStatus: [0, 1, 1],
    })
  }

  handleSearch = (e) => {
    e.preventDefault()
    if (!this.state.searchValue) return
    const loading = message.loading('搜索中...', 0)

    search({
      keyword: this.state.searchValue,
    }).then(res => {
      const { data } = res
      loading()
      message.success(`搜索到 ${data.data.length} 本书`)
      this.setState({
        isSearch: true,
        searchBooks: data.data,
      })
    }).catch(err => {
      loading()
      message.error('系统出错，请稍后再试')
    })
  }

  render() {
    const { status } = this.state
    // default [1, 1, 0]
    // click position [1, 0, 0]
    // click books [0, 1, 1]
    // click position [1, 0, 1]
    const showMap = status[0] > 0
    const showMapZoom = status[0] === 2
    const showList = status[1] > 0
    const showDetail = status[2] > 0

    const bookCls = classNames({
      book_detail: true,
      book_detail_show: showDetail,
      book_detail_position: showMap && showDetail && !showList,
    })

    const backCls = classNames({
      back: true,
      back_hidden: showMap && showList && !showDetail,
    })

    return (
      <div className="app">
        <div className="warpper">
          <div className="title" />
          <div className="toolbar">
            <div className={backCls} onClick={this.handleClickBack}>
            </div>
            <div className="search">
              <input type="text" className="search_input" placeholder="输入书名、作者名、支持拼音首字母搜索" onChange={this.onChange} onKeyDown={this.onKeyDown} />
              <span className="search_btn" onClick={this.handleSearch} />
            </div>
          </div>
          <Map 
            zoom={showMapZoom}
            hidden={!showMap}
            hideAreas={showMap && showDetail && !showList}
            onClick={this.handleClickMap}
          />
          <Books 
            isList={this.state.isSearch}
            hidden={!showList}
            onClickBook={this.onClickBook} 
            books={this.state.isSearch ? this.state.searchBooks : this.state.books} 
          />
          <Book
            hidden={!showDetail}
            book={this.state.currentBook}
            handleClickBack={this.handleClickBack}
            handleShowPosition={this.handleShowPosition}
            className={bookCls}
          />
        </div>
      </div>
    )
  }
}

export default App
