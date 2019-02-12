

import React from 'react'
import { Upload, Modal } from 'antd'
import { getOssToken } from '../../../common/service'
import './index.less'

const OSS = require('ali-oss')

const uploadPath = (path, file) => {
  const resPath = path ? `${path}/${file.name.split(".")[0]}-${file.uid}.${file.type.split("/")[1]}` : `/${file.name.split(".")[0]}-${file.uid}.${file.type.split("/")[1]}`
  return resPath
}

const uploadButton = <div>点击上传</div>


class Example extends React.Component {
  constructor() {
    super()
    this.state = {
      preview: "",
      visible: false,
      imageList: [],
    }
  }

  componentDidMount() {
    // 使用的sts,向后台服务器请求获取token.
    getOssToken().then((res) => {
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
      this.client.multipartUpload(url, file).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  render() {
    const props = {
      onRemove: (file) => {
        this.setState(({ imageList }) => {
          const index = imageList.indexOf(file);
          const newFileList = imageList.slice();
          newFileList.splice(index, 1);
          return { imageList: newFileList };
        });
      },
      beforeUpload: this.beforeUpload,
      fileList: this.state.imageList,
      onPreview: this.handlePreview,
      accept: "image/*",
      listType: "picture-card"
    };
    const { preview, visible, imageList } = this.state
    return (
      <div className="iu-wrapper">
        <Upload {...props}>
          {
            imageList.length >= 1 ? null : uploadButton
          }
        </Upload>
        <Modal visible={visible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={preview} />
        </Modal>
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
          imageList: [{
            uid: file.uid,
            name: file.name,
            status: file.status,
            type: file.type,
            result: data.name,
            url: reader.result,
          }],
        }))
        // upload to parent component
        const url = `https://bookstore-prod.oss-cn-hangzhou.aliyuncs.com/${data.name}`
        this.props.onUploadDone(url)
      })
    }
    return false
  }

  handlePreview = (file) => {
    this.setState({
      preview: file.url || file.thumbUrl,
      visible: true,
    })
  }
}

export default Example
