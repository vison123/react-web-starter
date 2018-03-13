/* eslint-disable */
import React from 'react'
import { Layout, Menu, Avatar, Dropdown, Row, Icon, Divider } from 'antd'
import './index.less'
// import * as actions from '../../../global/commonreduck'
// import { Link } from 'react-router-dom'

const { Header } = Layout
// const Option = Select.Option

const JcHeader = ({ currentUser, currentShop }) => {
  // 切换店铺
  const changeShop = ({ key }) => {
    console.log(key)
  }

  // 店铺 menu 事件
  const onClickMenu = ({ key }) => {
    console.log(key)
    // if (key === 'shopInfo') {
    //     const newCurrentShop = currentUser.shopList.filter(shopInfo => shopInfo.shopId === value)[0]
    //     dispatch(actions.chooseShops({ shopId: value }, newCurrentShop))
    //     .then(res => {
    //       match.history.push('/')
    //     })
    //   }
    }

  const shopList = shop => {
    return (
      <Menu className="jc-dropdown-menu" onClick={changeShop}>
        {shop.map(item => {
          return (
            <Menu.Item key={item.shopId}>
              {item.shopName}
            </Menu.Item>
          )
        })}
      </Menu>
    )
  }

  const menu = (
    <Menu onClick={onClickMenu}>
      <Menu.Item disabled>账号管理</Menu.Item>
      <Menu.Item key="shopInfo">店铺信息</Menu.Item>
      <Menu.Item key="logout">退出登录</Menu.Item>
    </Menu>
  )

  return (
    <Header className="jc-header">
      <Row type="flex" justify="space-between">
        <h1>管理后台</h1>
        <div className="menu-container">
          <Dropdown overlay={menu}>
            <div className="menu-wrap">
              <Avatar
                size="small"
                src={currentUser ? currentUser.avatar : ''}
              />
              <span className="jc-userName">
                {currentUser ? currentUser.name : 'xxx'}
                <Icon type="caret-down" />
              </span>
            </div>
          </Dropdown>
          <Divider type="vertical" style={{ margin: '0 15px' }} />
          <Icon type="trophy" />
        </div>
      </Row>
    </Header>
  )
}

export default JcHeader
