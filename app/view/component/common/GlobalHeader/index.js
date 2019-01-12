import React, { PureComponent } from 'react'
import {
  Layout, Menu, Icon, Spin, Dropdown, Avatar,
  Select,
} from 'antd'
// import HeaderSearch from '../HeaderSearch'

import useAsyncState from '../../../hook/useAsyncState'
import { findAll as findEnterpriseList } from '../../enterprise/service'
import ajax from '../../../common/ajax'

const { Header } = Layout
const Option = Select.Option

function changeEnterprise(enterprise) {
  ajax({
    url: '/user/changeEnterpriseByAdmin.json',
    method: 'post',
    data: {
      enterprise,
    },
  }).then(() => window.location.reload())
}

export default function GlobalHeader(props) {
  const {
    currentUser,
    onMenuClick,
  } = props
  const [enterprises] = useAsyncState(findEnterpriseList, [])
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
      <Menu.Divider />
      <Menu.Item key="logout">
        <Icon type="logout" />
        退出登录
      </Menu.Item>
    </Menu>
  )
  const enterprise = window.appData.loginUser.enterprise
  return (
    <Header
      style={{ background: '#fff', padding: 0 }}
    >
      <div>
        { window.appData.loginUser.isAdmin ?
          <span>
            <span>所在企业：</span>
            <Select style={{ width: 200, marginRight: 8 }} placeholder="切换企业" value={enterprise === null ? undefined : enterprise} onChange={changeEnterprise}>
              {enterprises.map(item => (
                <Option key={item.id} value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </span> : null
        }
        {currentUser.name ? (
          <Dropdown overlay={menu}>
            <span>k
              <Avatar
                size="small"
                src={currentUser.avatar}
              />
              <span style={{ marginLeft: 8 }}>{currentUser.name}</span>
            </span>
          </Dropdown>
        ) : (
          <Spin size="small" style={{ marginLeft: 8 }} />
        )}
      </div>
    </Header>
  )
}
