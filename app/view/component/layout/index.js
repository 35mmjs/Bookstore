/* eslint-disable */
import React from 'react'
import { Layout, Menu, Breadcrumb, Icon, Card } from 'antd';
import GlobalHeader from '../common/GlobalHeader'
import ajax from '../../common/ajax'

const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;


const Nav = ({ path, children}) => (
  <span onClick={ () => window.location.hash = path }>{children}</span>
)

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  handleMenuClick= ({ key }) => {
    if (key === 'logout') {
      ajax({
        url: '/user/logout.json',
        method: 'post',
      }).then(() => location.href = '/user/login.html')
    }
  }

  render() {
    const { menu } = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div
            className="logo"
            style={{
              height: 32,
              backgroundColor: 'grey',
              margin: 16,
            }}
          >LOGO</div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            {
              menu.map(item => {
                if (!item.children) {
                  return (
                    <Menu.Item key={item.value}>
                      <Icon type="pie-chart" />
                      <Nav path={item.value}>{item.label}</Nav>
                    </Menu.Item>
                  )
                } else {
                  return (
                    <SubMenu
                      key={item.value}
                      title={
                      <span><Icon type="user" />
                        <Nav path={item.value}>{item.label}</Nav>
                      </span>}
                    >
                      {
                        item.children.map(subItem => {
                          return (
                            <Menu.Item key={subItem.value}>
                              <Nav path={subItem.value}>{subItem.label}</Nav>
                            </Menu.Item>
                          )
                        })
                      }
                    </SubMenu>
                  )
                }
              }
            )
          }
        </Menu>
        </Sider>
        <Layout>
          {/* <Header style={{ background: '#fff', padding: 0 }}>
          登录状态
          </Header> */}
          <div style={{ width: '100%', textAlign: 'right', padding: '0 16px', background: '#fff'}}>
          <GlobalHeader
            logo={'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4w…gIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=='}
            currentUser={{
              "name": window.appData.loginUser.username,
              "avatar": "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
              "userid": "00000001",
              "notifyCount": 12
            }}
            collapsed={false}
            // isMobile={this.state.isMobile}
            // onCollapse={this.handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
          />
          </div>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>根据path定义</Breadcrumb.Item>
              <Breadcrumb.Item>path1</Breadcrumb.Item>
              <Breadcrumb.Item>path2</Breadcrumb.Item>
            </Breadcrumb>
            <Card>
            {this.props.children}
            </Card>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            BookStore ©{(new Date()).getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    );
  }
}


// export default class BasicLayout extends React.Component {
//   constructor() {
//     super()
//     this.state = {}
//   }
//   render() {
//     const { component: Component, ...rest } = this.props
//     return (
//       <Route {...rest} render={matchProps => (
//         <div>
//           <SiderDemo>
//             <Component {...matchProps} />
//           </SiderDemo>
//         </div>
//       )}
//       />
//     )
//   }
// }

export default class BasicLayout extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const { menu } = this.props
    return (
      <SiderDemo menu={menu}>
        {this.props.children}
      </SiderDemo>
    )
  }
}




