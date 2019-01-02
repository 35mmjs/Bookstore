/* eslint-disable */
import React from 'react'
import ajax from '../../common/ajax'

export default class Index extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  componentDidMount() {
  }
  render() {
    return <div>欢迎回来，{window.appData.loginUser.username} ~ ~</div>
  }
}
