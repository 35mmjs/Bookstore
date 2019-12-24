import React from 'react'
import { getPaihangCatalog, updatePaihangCatalog, getPaihangDetail, tracker,getViewConfigData, getFaceRecommendCatalog } from '../../util/services'
import { queryGetData } from '../../../common/api'
// import Roundy from "roundy"
import './index.less'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      catalog1: [],
      currChannel: '',
      currId: 0
    }
  }

  getCatelogAndSaveToRedis = (data) => {
    let resMap = {}
    if (data && data.length > 0) {
      resMap = data.map((item, index) => {
        return {
          id: index,
          name: item.channel,
        }
      })
    }
    return resMap
  }

  getCatlogByNav = (data, navId) => {
    let bookArr = []
    if (data.content) {
      bookArr = JSON.parse(data.content)
    }
    // bookArr = data.content
    bookArr.forEach((item, index) => {
      if (index + 1 === navId) {
        const res = this.getCatelogAndSaveToRedis(item)
        // console.log(res)
        if (navId === 1) {
          console.log(res)
          this.setState({ catalog1: res, currId: 0, currChannel: res[0].name })
        }
      }
    })
  }

  queryViewConfigData = id => {
    let params = {
      '@database': 'MYSQL',
      view_configs: {
        '@schema': 'BOOKSTORE',
        id: 250,
      }
    }

    queryGetData(params).then(res => {
      let data = res.view_configs
      this.getCatlogByNav(data, 1)
    })
  }

  componentDidMount() {
    const { view_config_id } = window.appData
    if (view_config_id) {
      getViewConfigData(view_config_id).then(res => {
        this.getCatlogByNav(res,1)
      }).catch(error => {
        console.error(error)
      })
    } else {
      this.getCatalog(1)
    }
    const that = this

    // 触发人脸识别
    window.facebackToPaihang = function () {
      that.getCatalog(1)
    }
    // 触发人脸识别
    window.getFaceRecommendBooks = function (facedata) {
      that.getFaceRecommendBooks(facedata)
    }
    //调试使用
    // this.queryViewConfigData()
  }

  getCatalog = (navId) => {
    getPaihangCatalog({
      navId,
    }).then(res => {
      const { data } = res
      if (data.success) {
        if (navId === 1) {
          // this.setState({
          //   catalog1: data.data,
          // })
          let catelog = data.data
          this.setState({ catalog1: catelog, currId: 0, currChannel: catelog[0].name })
        } 
      }
    }).catch(err => {
      console.error(err)
    })
  }

  getFaceRecommendBooks = (facedata) => {
    getFaceRecommendCatalog(facedata, true).then(res => {
      const { data } = res
      if (data.success) {
        const { catalog1 } = this.state
        let newCat = {}
        newCat.name = '精准推荐'
        newCat.books = data.data
        catalog1.push(newCat)
        this.setState({ catalog1: catalog1, currId: catalog1.length - 1, currChannel: '精准推荐' })
        updatePaihangCatalog({
          navId: 1,
          catalogId: catalog1.length - 1,
          isFaceMode: true,
        }).then(res => {
          console.log(res.data)
        })
      }
    })
  }

  getFontSize = (name) => {
    const len = name.length
    if (len <= 4) return 90
    if (len === 5) return 80
    if (len === 6) return 70
    if (len === 7) return 60
    return 48
  }

  getName = (name) => {
    if (!name) return name
    return name
  }

  onBeferChangeChannel = () => {
    const { catalog1, currId } = this.state
    let newId = 0;
    if (currId == 0) {
      newId = catalog1.length - 1
    } else {
      newId = currId - 1
    }

    let newName = catalog1[newId].name
    this.setState({ currId: newId, currChannel: newName })
    const isFaceMode = newName == '精准推荐'
    updatePaihangCatalog({
      navId: 1,
      catalogId: newId,
      isFaceMode,
    }).then(res => {
      tracker({
        act: 'click',
        biz_type: 'catalog',
        biz_data: newName
      })
      console.log(res.data)
    })         
  }

  onAfterChangeChannel = () => {
    const { catalog1, currId } = this.state
    let newId = 0;
    if (currId == catalog1.length - 1) {
      newId = 0
    } else {
      newId = currId + 1
    }

    let newName = catalog1[newId].name
    this.setState({ currId: newId, currChannel: newName })
    
    updatePaihangCatalog({
      navId: 1,
      catalogId: newId,
    }).then(res => {
      tracker({
        act: 'click',
        biz_type: 'catalog',
        biz_data: newName,
      })
      console.log(res.data)
    })
      
  }

  getNextCatalog1 = e => {
    e.preventDefault()
    const { value1, catalog1 } = this.state
    const curr = parseInt(catalog1.length * value1 / 255, 10)
    const next = curr < catalog1.length ? curr + 1 : curr
    const value = Math.ceil(next / catalog1.length * 255)
    this.updateValue(1, value)
  }

  getCurrTimeStr = () => {
    const date = new Date()
    let monthStr = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let dataStr = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let timeStr = date.getFullYear() + '·' + monthStr + '·' + dataStr
    return timeStr.split('').join('\n')
  }

  render() {
    const { currChannel } = this.state
    // const nav1 = this.getCatalogItem(catalog1, value1)
    // let name1 = (nav1 && nav1.name) || ''
    // name1 = this.getName(name1)
    // const { orgId } = window.appData
    return (
      <div className="app">
        <div className="shuli">
          {this.getCurrTimeStr()}
        </div>
        <div className="curr-name">
          {currChannel}
        </div>
        <div className="bottom">
          <img className="click_icon" src="https://bookstore-public.oss-cn-hangzhou.aliyuncs.com/paihang_before.png" onClick={this.onBeferChangeChannel} />
          <div className="small-name">{currChannel}</div>
          <img className="click_next_icon" src="https://bookstore-public.oss-cn-hangzhou.aliyuncs.com/paihang_next.png" onClick={this.onAfterChangeChannel} />
        </div>
      </div>
    )
  }
}

export default App
