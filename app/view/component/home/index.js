/* eslint-disable */
import React from 'react'
import ajax from '../../common/ajax'

export default class Index extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
    // const url = 'http://47.96.75.202/open/v1/zhantai?clientId=1111'
    const url = 'http://47.96.75.202/open/v1/pubu'
    // const url = '/open/v1/zhantai?clientId=1111'
    ajax({
      url,
      type: 'json',
      method: 'get',
    }).then(res => {
      console.log('aaaaaaaa', res)
    })
  }
  render() {
    return <div>aaaaaaaaaaa</div>
  }
}
