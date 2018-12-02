/* eslint-disable */
import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';

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

  render() {
    const { menu } = this.props
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          {/* <div className="logo" /> */}
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
                      title={<span><Icon type="user" /><span>{item.label}</span></span>}
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
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
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




