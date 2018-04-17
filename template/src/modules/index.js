import React, { Component } from 'react'
import { Layout, Icon, Spin, message } from 'antd'
import { Route } from 'react-router-dom'
import YXBreadcrunb from '../components/Breadcrumb'
import style from './style.less'
import { connect } from 'react-redux'
import storage from '../utils/storage.js'
const { Content } = Layout
import GlobalFooter from './layout/GlobalFooter'
import GlobalHeader from './layout/GlobalHeader'
import logo from '../assets/images/logo.png'
import SiderMenu from '../components/SiderMenu'
import { getMenuData } from '../global/menu'
import moment from 'moment'

class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.orderTimeFrom = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    this.orderTimeTo = moment(Date.parse(new Date()) + 5 * 60 * 1000).format('YYYY-MM-DD HH:mm:ss')
    this.state = {
      collapsed: false,
      dealDialogVisible: false,
    }
  }

  handleMenuCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  handleNoticeClear = (type) => {
    message.success(`清空了${type}`)
  }

  handleMenuClick = ({ key }) => {
    if (key === 'logout') {
      this.logout()
    }
  }
  handleNoticeVisibleChange = (visible) => {
    if (visible) {
      message.success(`NoticeVisible`)
    }
  }

  render() {
    let MainContent = this.props.content
    const { showSpin } = this.props
    let userInfo = storage.get('user')

    return (
      <Layout className={style.layout}>
        <SiderMenu
          logo={logo}
          title={'管理后台'}
          // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
          menuData={getMenuData()}
          collapsed={this.state.collapsed}
          location={location}
          isMobile={false}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <GlobalHeader
            logo={logo}
            currentUser={userInfo}
            fetchingNotices={true}
            notices={[]}
            collapsed={this.state.collapsed}
            isMobile={false}
            onNoticeClear={this.handleNoticeClear}
            onCollapse={this.handleMenuCollapse}
            onMenuClick={this.handleMenuClick}
            onNoticeVisibleChange={this.handleNoticeVisibleChange}
          />
          <div style={{ padding: '0 24px 24px' }}>
            <Route
              render={({ location, match }) => {
                return (
                  <YXBreadcrunb
                    location={location}
                    match={match}
                    routes={this.props.routes}
                  />)
              }}
            />
            <Content style={{ minHeight: 600 }}>
              <MainContent {...this.props} />
            </Content>
          </div>
          <GlobalFooter
            links={[]}
            copyright={
              <div>
                Copyright <Icon type='copyright' /> 2017 金诚集团
              </div>
            }
          />
        </Layout>
        {
          showSpin && showSpin.bool && (
            <div className={style.cover}>
              <Spin
                tip={showSpin.content}
                style={{ marginTop: 160, marginLeft: -160 }}
                size='large'
              />
            </div>
          )
        }
      </Layout>
    )
  }

  logout = () => {
    storage.clear()
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userLogin,
    showSpin: state.common.showSpin,
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatch
})

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)

