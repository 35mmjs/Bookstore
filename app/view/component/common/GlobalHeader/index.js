import React, { PureComponent } from 'react'
import { Layout, Menu, Icon, Spin, Dropdown, Avatar } from 'antd'
import HeaderSearch from '../HeaderSearch'

const { Header } = Layout

export default class GlobalHeader extends PureComponent {
  componentWillUnmount() {
    this.triggerResizeEvent.cancel()
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props
    onCollapse(!collapsed)
    this.triggerResizeEvent()
  }

  render() {
    const {
      currentUser,
      collapsed,
      isMobile,
      logo,
      onMenuClick,
    } = this.props
    const menu = (
      <Menu selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />
          个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />
          设置
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />
          触发报错
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          退出登录
        </Menu.Item>
      </Menu>
    )
    return (
      <Header
        style={{ background: '#fff', padding: 0 }}
      >
        <div>
          <HeaderSearch
            placeholder="站内搜索"
            dataSource={['搜索提示一', '搜索提示二', '搜索提示三']}
            onSearch={value => {
              console.log('input', value) // eslint-disable-line
            }}
            onPressEnter={value => {
              console.log('enter', value) // eslint-disable-line
            }}
          />
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span>
                <Avatar
                  size="small"
                  src={currentUser.avatar}
                />
                <span >{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8 }} />
          )}
        </div>
      </Header>
    )
  }
}
