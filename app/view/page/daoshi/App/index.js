import React from 'react'
import classNames from 'classnames'
import { message } from 'antd'
import { search, getBook, getDaoshiData, getClientConfig, tracker, getViewConfigData } from '../../util/services'
import { zhantaiMap } from '../../../../common/bizHelper'
import Map from '../Map'
import MapSlider from '../MapSlider'
import Book from '../Book'
import Books from '../Books'
import data from './data'
import data10001 from '../Map/10001'
import data10002 from '../Map/10002'
import data10010 from '../Map/10010'
import './index.less'

class App extends React.Component {
  constructor(props) {
    super(props)
    const { orgId } = window.appData

    this.state = {
      isSearch: false,
      books: [],
      currentArea: {
        coordinate: [0, 0],
        floor: 0,
      },
      currentBook: data[0],
      searchValue: '',
      beforeStatus: [1, 1, 0],
      status: [1, 1, 0],
      // storeData: data10001,
    }

    this.searchRef = React.createRef()
    this.timer = null
    this.showTime = 0
  }

  componentDidMount() {
    this.getConfig()
    this.getData()
  }

  getConfig = () => {
    const { orgId } = window.appData
    const id = orgId && orgId.toString()
    console.log(id)

    let storeData
    switch (id) {
      case '10001':
        storeData = data10001
        break
      case '10002':
        storeData = data10002
        break
      case '10010':
        storeData = data10010
        break
      default:
        storeData = data10001
        break
    }

    // this.setState({
    //   storeData,
    // })

    getClientConfig().then(res => {      
      if (res.data.success) {
        this.setState({
          storeData: res.data.data.config,
        })
      } else {
        this.setState({
          storeData,
        })
      }
    }).catch(error => {
      this.setState({
        storeData,
      })
    })
  }

  reStart = () => {
    if (this.timer) {
      clearTimeout(this.timer)
    }

    this.timer = setTimeout(() => {
      const input = this.searchRef.current
      input.value = ''
      this.setState({
        isSearch: false,
        searchValue: '',
        beforeStatus: [1, 1, 0],
        status: [1, 1, 0],
        currentArea: {
          coordinate: [0, 0],
          floor: 0,
        },
      })
    }, 5 * 1000 * 60)
  }

  getData = () => {
    const { view_config_id } = window.appData
    if (view_config_id) {
      getViewConfigData(view_config_id).then(res => {
        let data = zhantaiMap(res)
        this.setState({
          books: data.books,
        })
      }).catch(err => {
        console.error(err)
      })
    } else {
      getDaoshiData().then(res => {
        const { data } = res
        if (!data.success) return
        console.log(data)
        this.setState({
          books: data.data.books,
        })
      }).catch(err => {
        console.error(err)
      })
    }
  }

  onClickBook = (spbs, ls_SendUnitID) => {
    const loading = message.loading('正在查询...', 0)

    getBook({ spbs, ls_SendUnitID })
      .then(res => {
        const { data } = res

        if (!data.success) {
          loading()
          message.error('获取书本详情失败，请稍后再试')
          return
        }

        let { score } = data.data
        if (!score) {
          score = Math.floor((Math.random() * (10 - 8) + 8) * 10) / 10
        }
        console.log(data.data)
        this.setState({
          currentBook: Object.assign({}, data.data, {
            score,
          }),
          status: [0, 1, 1],
          beforeStatus: [1, 1, 0],
        }, () => {
          loading()
          let currentTime = new Date().getTime()
          if ((currentTime - this.showTime) > 2000) {
            message.success('查询成功')
            this.showTime = currentTime
          }
          this.reStart()
        })
      })
      .catch(err => {
        loading()
        message.error('获取书本详情失败，请稍后再试')
      })

    tracker({
      biz_type: 'book_detail',
      biz_data: spbs,
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
      beforeStatus: [1, 1, 0],
      status: [2, 0, 0],
    }, () => {
      setTimeout(callback, 300)
      this.reStart()
    })
  }

  handleClickSliderMap = () => {
    this.setState({
      beforeStatus: [1, 1, 0],
      status: [2, 0, 0],
    })
  }

  handleLiuzhouPosition = (jwh) => {
    // if (!jwh) return
    // const temp = jwh.replace('架位号:', '')
    const jwhList = jwh.split('-')
    if (jwhList.length < 3) return
    const floorStr = jwhList[1].replace('楼', '')
    const areaStr = jwhList[2].replace('架号', '')
    const bookFloor = parseInt(floorStr, 10)
    const bookArea = parseInt(areaStr, 10)
    // console.log('bookFloor:' + bookFloor)
    // console.log('bookArea:' + bookArea)
    const { floor } = this.state.storeData
    // console.log(floor)
    let currArea
    const currFloor = floor.length - bookFloor
    const { areas } = floor[currFloor]
    // console.log(areas)
    for (let j = 0; j < areas.length; j++) {
      const { stockList } = areas[j]

      // eslint-disable-next-line no-continue
      if (!stockList) continue

      for (let k = 0; k < stockList.length; k++) {
        const stock = stockList[k]
        if (typeof stock === 'object') {
          if (bookArea >= stock[0] && bookArea <= stock[1]) {
            currArea = areas[j]
            break
          }
        } else if (bookArea === stock) {
          currArea = areas[j]
          break
        }
      }
      if (currArea) {
        break
      }
    }
    // console.log('currArea:')
    // console.log(currArea)
    if (!currArea) {
      message.error('找不到对应的位置')
      return
    }

    this.setState({
      status: [1, 0, 1],
      beforeStatus: [0, 1, 1],
      currentArea: {
        coordinate: currArea.coordinate,
        floor: currFloor,
      },
    }, () => {
      this.reStart()
    })   
  }

  handleguigangPosition = (jwh) => {
    // if (!jwh) return
    // const temp = jwh.replace('架位号:', '')
    const jwhList = jwh.split('-')
    if (jwhList.length < 4) return
    const keyName = jwhList[0]
    const rowStr = jwhList[1].replace('行', '')
    const columnStr = jwhList[2].replace('列', '')
    const bookRow = parseInt(rowStr, 10) 
    const bookColumna = parseInt(columnStr, 10)
    const booktype  = this.state.storeData.floor
    // 筛选类型，综合/文学
    const bookList = booktype.filter(item => item.key == keyName)
    // 筛选 行
    const { floor } = bookList[0]
    const rowList = floor.filter(item => item.key == rowStr)
    // 筛选列
    const { areas } = rowList[0]
    let currArea
    for (let i = 0; i < areas.length; i++) {
      const stock = areas[i].stockList
      if (stock.length > 1) {
        if (bookColumna >= stock[0] && bookColumna <= stock[stock.length - 1]) {
          currArea = areas[i]
          break
        }
      } else {
        const newColumn = stock[0]
        if (newColumn.length > 1) {
          if (bookColumna >= newColumn[0] && bookColumna <= newColumn[newColumn.length - 1]) {
            currArea = areas[i]
            break
          }
        } else if (bookColumna == newColumn[0]) {
          currArea = areas[i]
          break
        }
      }
    }

    console.log('currArea:')
    console.log(currArea)
    if (!currArea) {
      message.error('找不到对应的位置')
      return
    }

    this.setState({
      status: [1, 0, 1],
      beforeStatus: [0, 1, 1],
      currentArea: {
        coordinate: currArea.coordinate,
        floor: bookRow,
      },
    }, () => {
      this.reStart()
    })   
  }

  handleShowPosition = (bookList) => {
    const { jwh } = bookList[0]
    if (!jwh) return
    const { orgId } = window.appData
    console.log('orgId:' + orgId)
    if (orgId == 10010) {
      console.log('柳州门店')
      this.handleLiuzhouPosition(jwh)
      return
    }
    if (orgId == 10022) {
      console.log('贵港门店')
      this.handleguigangPosition(jwh)
      return
    }
    const id = parseInt(jwh, 10)
    const { floor } = this.state.storeData
    let currArea
    let currFloor

    for (let i = 0; i < floor.length; i++) {
      const { areas } = floor[i]

      // eslint-disable-next-line no-continue
      if (!areas) continue

      for (let j = 0; j < areas.length; j++) {
        const { stockList } = areas[j]

        // eslint-disable-next-line no-continue
        if (!stockList) continue

        for (let k = 0; k < stockList.length; k++) {
          const stock = stockList[k]
          if (typeof stock === 'object') {
            if (id >= stock[0] && id <= stock[1]) {
              currArea = areas[j]
              currFloor = floor.length - i
              break
            }
          } else if (id === stock) {
            currArea = areas[j]
            currFloor = floor.length - i
            break
          }
        }
      }
    }

    if (!currArea) {
      message.error('找不到对应的位置')
      return
    }

    this.setState({
      status: [1, 0, 1],
      beforeStatus: [0, 1, 1],
      currentArea: {
        coordinate: currArea.coordinate,
        floor: currFloor,
      },
    }, () => {
      this.reStart()
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

      if (!data.success) {
        message.error('输入错误，请重新输入')
        return
      }

      message.success(`搜索到 ${data.data.length} 本书`)
      // 地图状态需要返回搜索结果
      if (this.state.status[0] > 1) {
        this.setState({
          isSearch: true,
          searchBooks: data.data,
          beforeStatus: [1, 1, 0],
          status: [1, 1, 0],
        })
      } else {
        this.setState({
          isSearch: true,
          searchBooks: data.data,
          beforeStatus: [1, 1, 0],
          status: [1, 1, 0],
        })
      }
      this.reStart()
    }).catch(err => {
      loading()
      message.error('输入错误，请重新输入')
    })

    // Tracker
    tracker({
      act: 'click',
      biz_type: 'search',
      biz_data: this.state.searchValue,
    })
  }

  handleCleanSearch = (e) => {
    e.preventDefault()
    const input = this.searchRef.current
    input.value = ''
    this.setState({
      beforeStatus: [1, 1, 0],
      status: [1, 1, 0],
      isSearch: false,
      searchValue: '',
      currentArea: {
        coordinate: [0, 0],
        floor: 0,
      },
    })

    tracker({
      act: 'click',
      biz_type: 'clear_search',
    })
  }

  render() {
    const orgId = window.appData.orgId
    const { status, currentArea, storeData } = this.state
    // console.log('storeData')
    // console.log(storeData)
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

    if (!storeData) {
      return null
    }

    return (
      <div className="app">
        <div className="warpper">
          <div className="title" />
          <div className="toolbar">
            <div className={backCls} onClick={this.handleClickBack} />
            <div className="search">
              <input type="text" className="search_input" placeholder="输入书名、作者名搜索" onChange={this.onChange} onKeyDown={this.onKeyDown} ref={this.searchRef} />
              <span className="search_btn" onClick={this.handleSearch} />
              { this.state.isSearch
                && <span className="search_close" onClick={this.handleCleanSearch}>
                  <span className="close" />
                </span>
              }
            </div>
          </div>
          {
            storeData.type === 'normal'
            ? <Map
              data={storeData}
              zoom={showMapZoom}
              hidden={!showMap}
              hideAreas={showMap && showDetail && !showList}
              onClick={this.handleClickMap}
              current={currentArea}
            />
            : <MapSlider
              data={storeData}
              onClick={this.handleClickSliderMap}
              hidden={!showMap}
              zoom={showMapZoom}
            />
          }
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
