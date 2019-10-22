import React from 'react'
import { connect } from 'dva'
import './index.less'
import Filter from './filter'
import Table from './table'
import Enterprise from '../enterprise/index';
import { queryGetData } from '../../common/api'

const loginUser = window.appData.loginUser
const enterprise =  loginUser.enterprise
const store = loginUser.store

// @connect(state => ({ ...state }))
@connect(({ tracker, loading }) => ({ ...tracker, loading: loading.effects['tracker/findAll'] }))
export default class Index extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch } = props
    this.dispatch = dispatch
    this.state = {
      currentType: 0,
      terminalsList: []
    }
  }

  componentDidMount() {
    // let params = this.getParams(this.state.currentType,0)
    // this.dispatch({
    //   type: 'tracker/findAll',
    //   payload: params,
    // })
    this.getTrackList()
  }

  getTrackList() {
    let params = {}
    if(store > 0){
      params = {
        '@database': 'MYSQL',
        'terminals[]':{
          query: 2,
          page: 0,
          count: 99,
          terminals: {
            "@schema": "BOOKSTORE",
            'store': store,
            '@column': 'id',
          }
        }
      }
    }else if(enterprise > 0) {
      params = {
        '@database': 'MYSQL',
        '[]':{
          query: 2,
          page: 0,
          count: 99,
          stores: {
            "@schema": "BOOKSTORE",
            'enterprise': enterprise,
            '@column': 'id',
          },
          'terminals[]': {
            query: 2,
            page: 0,
            count: 99,
            terminals: {
              "@schema": "BOOKSTORE",
              'store@': "[]/stores/id",
              '@column': 'id',
            }
          }
        }
      }
    }
    queryGetData(params).then(res => {
      let list = []
      let newList = []
      if(store > 0 && res.code == 200){
        list = res['terminals[]'] || []
        if(list.length > 0){
          for (let i = 0;i < list.length; i++){
            newList.push(list[i].id)
          }
        }
      }else if(enterprise > 0 && res.code == 200){
        list = res['[]'] || []
        for(let i = 0;i < list.length; i++){
          let singleStoreList = list[i]['terminals[]']||[]
          console.log(res['[]'])
          for(let j = 0;j< singleStoreList.length;j++){
            newList.push(singleStoreList[j].id)
          }
        }
      }
      this.setState({ terminalsList: newList })
      let newparams = this.getParams(newList,0);
      this.dispatch({
        type: 'tracker/findAll',
        payload: newparams,
      })
    })
  }

  getParams = (list, page) => {
    let params = {
      '[]': {
        query: 2,
        page,
        count: 20,
        tracker: {
          '@schema': 'BOOKSTORE',
          "terminal{}": list,
          '@order': 'created_at-',
        },
        terminals: {
          '@schema': 'BOOKSTORE',
          'id@': '/tracker/terminal',
          '@column': 'id,type,name,note,store',
        },
        stores: {
          '@schema': 'BOOKSTORE',
          'id@': '/terminals/store',
          '@column': 'id,name',
        },
      },
      'total@': '/[]/total',
    }
    return params    
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { terminalsList } = this.state
    const params = this.getParams(terminalsList, pagination.current - 1)
    this.dispatch({
      type: 'tracker/findAll',
      payload: params,
    });
  };

  onSubmit = (data, type) => {
    console.log('onSubmit', data, type)
    this.dispatch({ type: `tracker/${type}`, payload: data })
  }

  render() {
    // const { tracker } = this.props
    // const { list } = tracker
    const { list, pagination,loading } = this.props

    return (
      <div>
        <h3 style={{ color: 'black' }}>最近一周埋点数据</h3>
        <div>
          {/* <Filter onSubmit={data => this.onSubmit(data, 'findAll')} /> */}
          <Table 
            pagination={pagination}
            list={list} 
            loading={loading} 
            onChange={this.handleStandardTableChange}/>
        </div>
      </div>
    )
  }
}
