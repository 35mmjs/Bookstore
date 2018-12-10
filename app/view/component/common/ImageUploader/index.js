import { Upload, Icon, message } from 'antd'
import React from 'react'

const QINIU_SERVER = 'http://up.qiniu.com'
// token 服务端下发, 每一个小时刷新失效一次
const TOKEN = '42mbs9tidqGtmAuTpQjXtQ9khTF9Xil0b314riZP:Y8JhZWKEWhDM5TDNaJ1zJq_EZ88=:eyJzY29wZSI6ImJvb2tzdG9yZS10ZW1wIiwiZGVhZGxpbmUiOjE1NDQzNjczNjF9'


function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

function beforeUpload(file) {
  // const isJPG = file.type === 'image/jpeg'
  // if (!isJPG) {
  //   message.error('You can only upload JPG file!')
  // }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isLt2M
  // return isJPG && isLt2M
}

export default class Index extends React.Component {
  state = {
    loading: false,
  }

  handleChange = info => {
    console.log('aaaaaaaa', info)
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.setState({
          imageUrl,
          loading: false,
        })
      })
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    )
    const imageUrl = this.state.imageUrl
    return (
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={QINIU_SERVER}
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
        data={{ token: TOKEN }}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
      </Upload>
    )
  }
}
