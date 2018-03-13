import React, { Component } from 'react'
import { Layout, Spin } from 'antd'
import { JcHeader } from '../components/styleComponents/index'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import YXBreadcrunb from '../components/Breadcrumb'
import { userLogout } from './login/reduck'
import storage from '../utils/storage.js'
import SiderMenu from '../components/SiderMenu'
import { getMenuData } from '../global/menu'

const { Content } = Layout

class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
      dealDialogVisible: false,
    }
  }

  logout = () => {
    this.props.dispatch(userLogout())
  }

  render() {
    let MainContent = this.props.content
    const { showSpin } = this.props
    let userInfo = storage.get('user')
    let currentShop = storage.get('currentShop') || this.state.currentShop

    return (
      <Layout style={{ minHeight: '100%' }}>
        <JcHeader
          currentUser={userInfo}
          currentShop={currentShop || []}
          dispatch={this.props.dispatch}
          match={this.props.match}
        />
        <Layout>
          <SiderMenu
            // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
            menuData={getMenuData()}
            collapsed={this.state.collapsed}
            location={location}
            isMobile={false}
            onCollapse={this.handleMenuCollapse}
          />

          <Content style={{ padding: 24 }}>
            <Route
              render={({ location, match }) => {
                return (<YXBreadcrunb
                  location={location}
                  match={match}
                  routes={this.props.routes}
                        />)
              }}
            />
            <Spin
              spinning={showSpin.bool}
              tip={showSpin.content}
            >
              <MainContent {...this.props} />
            </Spin>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    userInfo: state.userLogin,
    showSpin: state.common.showSpin
  }
}

export default connect(mapStateToProps)(MainLayout)
