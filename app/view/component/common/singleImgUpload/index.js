import React, {Component} from 'react'
import {Upload, Button, Icon, message} from 'antd'

import { getOssToken } from '../../../common/service'

const uploadPath = (path, file) => {
  const resPath = path
    ? `${path}/${file.name.split('.')[0]}-${file.uid}.${
        file.type.split('/')[1]
      }`
    : `/${file.name.split('.')[0]}-${file.uid}.${file.type.split('/')[1]}`
  return resPath
}

class SingleImgUpload extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      img: ''
    }
  }
  onChange = e => {
    let temp = e.fileList[0]
    if (temp.status === 'done') {
      let url = temp.response.entry.url
      this.setState({
        img: url
      })
      this.props.onChange(url)
    }
  }
  componentDidMount() {
      // // 使用的sts,向后台服务器请求获取token.
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
  
  handleBeforeUpload = (file) => {
    const base = 1024
    this.UploadToOss(null, file).then(data => {
      // upload to parent component
      const url = `https://bookstore-prod.oss-cn-hangzhou.aliyuncs.com/${
        data.name
      }`
      this.setState({img: url})
      this.props.onUploadDone(url)
    })
    return false;
  }

  render () {
    const uploadProps = {
      name: 'file',
      // onChange: this.uploadChange,
      beforeUpload: this.handleBeforeUpload,
      showUploadList: false,
    }
    const {img} = this.state
    const {url} = this.props
    return (<Upload {...uploadProps}>
      {
        img || url 
          ? <img src={img || url} width= '75' /> 
          : <Button><Icon type="upload" />上传</Button>
      }
    </Upload>)
  }
}

export default SingleImgUpload
