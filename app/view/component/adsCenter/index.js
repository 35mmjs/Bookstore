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
    const { src } = props
    let imageList = []
    if (src) {
      imageList = [
        {
          name: 'sample.jpg',
          result: 'xxx',
          status: undefined,
          type: 'image/jpeg',
          uid: 'xxx',
          url: src,
        },
      ]
    }
    const { dispatch } = props
    this.dispatch = dispatch
    this.state = {
      preview: '',
      visible: false,
      imageList,
      currentType: 1,
    }
  }

  componentDidMount() {
    this.dispatch({
      type: 'ads/findAll',
      payload: {},
    })
    // 使用的sts,向后台服务器请求获取token.
    getOssToken().then(res => {
      const token = res
      this.client = new OSS({
        accessKeyId: token.id,
        accessKeySecret: token.secret,
        stsToken: token.token,
        region: 'oss-cn-hangzhou',
        bucket: 'bookstore-prod',
      })
    })
  }

  componentWillReceiveProps = nextProps => {
    const { src } = nextProps
    if (src) {
      this.setState({
        imageList: [
          {
            name: 'sample.jpg',
            result: 'xxx',
            status: undefined,
            type: 'image/jpeg',
            uid: 'xxx',
            url: src,
          },
        ],
      })
    }
  }

  UploadToOss = (path, file) => {
    const url = uploadPath(path, file)
    return new Promise((resolve, reject) => {
      this.client
        .multipartUpload(url, file)
        .then(data => {
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  onSubmit = (data, type) => {
    // 针对config json序列化
    if (data.config) {
      try {
        data.config = JSON.parse(data.config)
      } catch (e) {
        console.error(e)
        data.config = {}
      }
    }
    data.config = JSON.stringify(data.config || {})
    this.dispatch({ type: `ads/${type}`, payload: data })
  }

  render() {
    const props = {
      onRemove: file => {
        this.setState(({ imageList }) => {
          const index = imageList.indexOf(file)
          const newFileList = imageList.slice()
          newFileList.splice(index, 1)
          return { imageList: newFileList }
        })
      },
      beforeUpload: this.beforeUpload,
      fileList: this.state.imageList,
      onPreview: this.handlePreview,
      accept: 'image/*',
      listType: 'picture-card',
    }
    const { preview, visible, imageList } = this.state
    const { ads } = this.props
    const { list } = ads
    // return (
    //   <div className="iu-wrapper">
    //     {list && list.map(item => {
    //       return (
    //         <div key={item.id}>
    //           <img alt="example" className="image-view" src={item.url} />
    //         </div>
    //       )
    //     })}
    //     <Upload {...props}>
    //       {uploadButton}
    //     </Upload>
    //     <Modal visible={visible} footer={null} onCancel={this.handleCancel}>
    //       <img alt="example" style={{ width: '100%' }} src={preview} />
    //     </Modal>
    //   </div>
    // )
    return (
      <div>
        <div>
          <CreateButton
            onSubmit={data => this.onSubmit(data, 'create')}
          />
          <Filter onSubmit={data => this.onSubmit(data, 'findAll')} />
          <Table
            list={list}
            // configData={configData}
            currentType={this.state.currentType}
            onSubmit={data => this.onSubmit(data, 'update')}
            onSearchingConfig={data => this.onSearchingConfig(data, 'findAll')}
            onDelete={data => this.onSubmit(data, 'remove')}
          />
        </div>
      </div>
    )
  }

  // 因为我们需要与表单一起上传,所以默认是不去上传到后台服务器.
  beforeUpload = file => {
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      this.UploadToOss(null, file).then(data => {
        this.setState(({ imageList }) => ({
          imageList: [
            {
              uid: file.uid,
              name: file.name,
              status: file.status,
              type: file.type,
              result: data.name,
              url: reader.result,
            },
          ],
        }))
        // upload to parent component
        const url = `https://bookstore-prod.oss-cn-hangzhou.aliyuncs.com/${
          data.name
        }`
        this.props.onUploadDone(url)
      })
    }
    return false
  }

  handlePreview = file => {
    this.setState({
      preview: file.url || file.thumbUrl,
      visible: true,
    })
  }
}

