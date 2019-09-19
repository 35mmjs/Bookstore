import React, { Fragment, Image } from 'react'
import { connect } from 'dva'
import moment from 'moment'
import { Upload,Button, Divider, Modal } from 'antd'
// import useFormModal from '../../hook/useFormModal'
// import useAsyncState from '../../hook/useAsyncState'
// import { create, update, remove, findAll } from './service'
// import { findAll as findEnterpriseList } from '../enterprise/service'
// import { findByEnterprise as findStoreList } from '../store/service'
// import { composeAsync, removeConfirm } from '../../common/utils'
import Filter from './filter'
import Table from './table'
import CreateButton from './createButton'
import { getOssToken } from '../../common/service'

const loginUser = window.appData.loginUser
const enterprise = loginUser.isAdmin ? undefined : loginUser.enterprise
const store = loginUser.isAdmin ? undefined : loginUser.store
const isStoreManager = loginUser.isStoreManager ? undefined : loginUser.isStoreManager

const uploadPath = (path, file) => {
  const resPath = path
    ? `${path}/${file.name.split('.')[0]}-${file.uid}.${
        file.type.split('/')[1]
      }`
    : `/${file.name.split('.')[0]}-${file.uid}.${file.type.split('/')[1]}`
  return resPath
}

const uploadButton = <div>点击上传</div>

@connect(state => ({ ...state }))
export default class AdsCenter extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch } = props
    this.dispatch = dispatch
    this.state = {
      preview: '',
      visible: false,
      uploadUrl:'',
      currentType: 1,
      chooseAdType: 0,
    }
  }

  onUploadDone = url => {
    this.setState({uploadUrl:url})
  }

  componentDidMount() {
    this.dispatch({
      type: 'ads/findAll',
      payload: {},
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  onChangeAdType = value => {
    this.setState({chooseAdType: value})
  }

  onSubmit = (data, type) => {
    // 针对config json序列化
    data.url = this.state.uploadUrl
    this.dispatch({ type: `ads/${type}`, payload: data })
  }

  onUpdateAds = (isOpen, record) => {
    let store = loginUser.store
    if(store > 0){
      let storeList = record.store_list
      let param = ''
      if(storeList){
        let arr = storeList.split(',')
        let newArr = []
        if(isOpen){
          for(let i = 0; i < arr.length; i++){
            if(arr[i] == store){
            }else {
              newArr.push(arr[i])
            }
          }
          if(newArr.length > 0){
            for(let j=0;j<newArr.length;j++){
              param += newArr[j] + ','
            }
            param.slice(0,-1)
          }else {
            param = '0'
          }
          this.dispatch({ type: `ads/update`, payload: {id: record.id, store_list: param} })
        }else{
          param = storeList + ',' + store
          this.dispatch({ type: `ads/update`, payload: {id: record.id, store_list: param} })
        }
      } else {
        if(!isOpen){
          param = '' + store
          this.dispatch({ type: `ads/update`, payload: {id: record.id, store_list: param} })
        }
      }
    }
  }

  render() {
    const { chooseAdType } = this.state
    const { ads } = this.props
    const { list } = ads
    return (
      <div>
        <div>
          <CreateButton
            onSubmit={data => this.onSubmit(data, 'create')}
            onUploadDone={this.onUploadDone}
            onChangeAdType={data => this.onChangeAdType(data)}
            chooseAdType={chooseAdType}
          />
          <Filter onSubmit={data => this.onSubmit(data, 'findAll')} />
          <Table
            list={list}
            // configData={configData}
            currentType={this.state.currentType}
            onSubmit={data => this.onSubmit(data, 'update')}
            onSearchingConfig={data => this.onSearchingConfig(data, 'findAll')}
            onDelete={data => this.onSubmit(data, 'remove')}
            onUpdateAds = {this.onUpdateAds}
          />
        </div>
      </div>
    )
  }

  handlePreview = file => {
    this.setState({
      preview: file.url || file.thumbUrl,
      visible: true,
    })
  }
}

