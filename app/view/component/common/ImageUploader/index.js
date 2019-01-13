import { Upload, Icon, message } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import styles from './index.less'
import { getUploadToken } from '../../../common/native'

const QINIU_SERVER = 'http://up.qiniu.com'
// token 服务端下发, 每一个小时刷新失效一次
const TOKEN = getUploadToken()

// function getBase64(img, callback) {
//   const reader = new FileReader()
//   reader.addEventListener('load', () => callback(reader.result))
//   reader.readAsDataURL(img)
// }

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
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // getBase64(info.file.originFileObj, imageUrl => {
      //   this.setState({
      //     imageUrl,
      //     loading: false,
      //   })
      // })
      const response = info.file.response
      const { hash = '' } = response
      const url = 'http://pl7xwypp4.bkt.clouddn.com/' + hash
      this.props.onUploadDone({ url })
      this.setState({
        imageUrl: url,
        loading: false,
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
    console.log('aaaaaaaa', styles)
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
        {imageUrl ? <img src={imageUrl} alt="avatar" className={styles.previewImg} /> : uploadButton}
      </Upload>
    )
  }
}

Index.defaultProps = {
  onUploadDone: () => {},
}

Index.propTypes = {
  onUploadDone: PropTypes.func,
}
