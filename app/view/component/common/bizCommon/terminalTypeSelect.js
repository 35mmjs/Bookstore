import React, { useState } from 'react'
import { Select } from 'antd'
import ajax from '../../../common/ajax'

const { Option } = Select

const findAll = () => {
  return new Promise((resolve, reject) => {
    ajax({
      url: '/terminal-type/findAll.json',
      data: {},
      method: 'get',
    })
      .then(res => {
        let processedRes = []
        processedRes =
          res &&
          res.items &&
          res.items.map(item => ({
            label: item.name,
            value: item.id,
          }))
        resolve(processedRes)
      })
      .catch(reject)
  })
}

class TerminalTypeSelect extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      list: null,
    }
  }

  componentDidMount = () => {
    findAll().then(res => {
      this.setState({ list: res })
    })
  }

  render() {
    const { onChange, ...rest } = this.props
    const { list } = this.state
    return (
      <Select style={{ width: '100px' }} {...rest} onChange={onChange}>
        {list &&
          list.map(item => {
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

TerminalTypeSelect.defaultProps = {
  onChange: () => {},
  placeHolder: '请选择',
}

export default TerminalTypeSelect
