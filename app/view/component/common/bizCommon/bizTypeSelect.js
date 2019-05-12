import React, { useState } from 'react'
import { Select } from 'antd'
import ajax from '../../../common/ajax'

const { Option } = Select

export const bizTypeMap = [
  {
    label: '搜索',
    value: 'search',
  },
  {
    label: '图书详情',
    value: 'book_detail',
  },
  {
    label: '其他',
    value: 'normal',
  },
  {
    label: '地图',
    value: 'map',
  },
]

class Index extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      list: null,
    }
  }

  componentDidMount = () => {
    this.setState({ list: bizTypeMap })
  }

  render() {
    const { onChange, ...rest } = this.props
    const { list } = this.state
    return (
      <Select style={{ width: '100px' }} {...rest} onChange={onChange}>
        {list
          && list.map(item => {
            return (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            )
          })}
      </Select>
    )
  }
}

Index.defaultProps = {
  onChange: () => {},
  placeHolder: '请选择',
}

export default Index
