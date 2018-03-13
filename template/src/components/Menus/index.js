import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import * as urls from '../../global/routepath'
import classNames from 'classnames'
import storage from 'Util/storage'
import { BusinessType } from '../../global/bizdictionary'

const MenuItem = Menu.Item
const SubMenu = Menu.SubMenu

class MamsMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'inline',
      openKeys: storage.get('openKeys') || [],
      userInfo: storage.get('user') || {},
      current: '',
    }
    this.handleClick = this.handleClick.bind(this)
    this.onOpenChange = this.onOpenChange.bind(this)
    this.getAncestorKeys = this.getAncestorKeys.bind(this)
  }

  handleClick = (e) => {
    this.setState({ current: e.key })
    location.reload()
  }

  onOpenChange(openKeys) {
    const state = this.state
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1))
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1))
    let nextOpenKeys = []
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey)
    }
    this.setState({ openKeys: nextOpenKeys }, () => {
      storage.set('openKeys', nextOpenKeys)
    })
  }

  getAncestorKeys(key) {
    const map = {
      mall: ['classify', 'center'],
      takeout: ['classify', 'center'],
      group: ['classify', 'center'],
      ebooking: ['order'],
      takeoutorder: ['order'],
      takeout_commodity: ['commodity'],
      normal_commodity: ['commodity'],
      classify: ['center'],
      'add_shop': ['shops'],
      'search_shop': ['shops']
    }
    return map[key] || []
  }

  getMenuItemClass(str) {
    const pathName = this.props.match.location.pathname + this.props.match.location.search
    if (str !== urls.HOME) {
      return classNames({
        'ant-menu-item-selected': pathName.indexOf(str) > -1,
      })
    }
    return classNames({
      'ant-menu-item-selected': pathName === str,
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.mode ? 'vertical' : 'inline',
    })
  }

  _renderOrder = () => {
    let ret = []
    return this.state.userInfo.shopList && this.state.userInfo.shopList.map(
        shopItem => shopItem.businessType
      ).map(shopItem => {
        if (!ret.includes(shopItem)) {
          ret.push(shopItem)
          return shopItem
        }
      }).map((bizType) => {
        switch (bizType) {
          case BusinessType.Takeout:
            return (
              <Menu.Item
                key='takeout_order_list'
                className={this.getMenuItemClass(`${urls.ORDER_LIST}?businessType=1`)}
              >
                <Link to={`${urls.ORDER_LIST}?businessType=1`}>外卖订单</Link>
              </Menu.Item>
            )
          case BusinessType.Mall:
            return (
              <Menu.Item
                key='mall_order_list'
                className={this.getMenuItemClass(`${urls.ORDER_LIST}?businessType=2`)}
              >
                <Link to={`${urls.ORDER_LIST}?businessType=2`}>电商订单</Link>
              </Menu.Item>
            )
          case BusinessType.Group:
            return (
              <Menu.Item
                key='group_order_list'
                className={this.getMenuItemClass(`${urls.ORDER_LIST}?businessType=3`)}
              >
                <Link to={`${urls.ORDER_LIST}?businessType=3`}>团购订单</Link>
              </Menu.Item>
            )
          case BusinessType.Ticket:
            return (
              <Menu.Item
                key='ticket_order_ticket_list'
                className={this.getMenuItemClass(urls.ORDER_TICKET_ORDER)}
              >
                <Link to={urls.ORDER_TICKET_ORDER}>票务订单</Link>
              </Menu.Item>
            )
          case BusinessType.Travel:
            return (
              <Menu.Item
                key='travel_order_ticket_list'
                className={this.getMenuItemClass(urls.ORDER_TRAVEL_ORDER)}
              >
                <Link to={urls.ORDER_TRAVEL_ORDER}>旅游订单</Link>
              </Menu.Item>
            )
        }
      })
  }

  _renderVerify = () => {
    let ret = []
    return this.state.userInfo.shopList && this.state.userInfo.shopList.map(
      shopItem => shopItem.businessType
    ).map(shopItem => {
      if (!ret.includes(shopItem)) {
        ret.push(shopItem)
        return shopItem
      }
    }).map((bizType) => {
      switch (bizType) {
        case BusinessType.Group:
          return (
            <Menu.Item
              key='group_verification'
              className={this.getMenuItemClass(urls.VERIFY_GROUP)}
            >
              <Link to={urls.VERIFY_GROUP}>团购核销</Link>
            </Menu.Item>
          )
        case BusinessType.Ticket:
          return (
            <Menu.Item
              key='ticket_verification'
              className={this.getMenuItemClass(urls.VERIFY_TICKET)}
            >
              <Link to={urls.VERIFY_TICKET}>票务核销</Link>
            </Menu.Item>
          )
        case BusinessType.Travel:
          return (
            <Menu.Item
              key='travel_verification'
              className={this.getMenuItemClass(urls.VERIFY_TRAVEL)}
            >
              <Link to={urls.VERIFY_TRAVEL}>旅游核销</Link>
            </Menu.Item>
          )
      }
    })
  }

  render() {
    const shopList = this.state.userInfo.shopList || []
    return (
      <Menu
        mode={this.state.mode}
        selectedKeys={[this.props.selectedMenu]}
        style={{ border: 'none' }}
        onOpenChange={this.onOpenChange}
        openKeys={this.state.openKeys}
        onClick={this.handleClick}
      >
        <MenuItem
          key='mams_home'
          className={this.getMenuItemClass(urls.HOME)}
        >
          <Link to={urls.HOME}><Icon type='home' /><span>首页</span></Link>
        </MenuItem>
        <SubMenu
          key='order_center'
          title={<p><Icon type='file-text' /><span>订单中心</span></p>}
        >
          {this._renderOrder()}
        </SubMenu>
        <SubMenu
          key='order_printing'
          title={<p><Icon type='file-text' /><span>发货管理</span></p>}
        >
          <Menu.Item
            key='pending_delivery_order'
            className={this.getMenuItemClass(urls.PENDING_DELIVERY_ORDER)}
          >
            <Link to={urls.PENDING_DELIVERY_ORDER}>电商待发货</Link>
          </Menu.Item>
        </SubMenu>
        {
          shopList.map(shopItem => shopItem.businessType)
            .filter(businessType => businessType === '3' || businessType === '4' || businessType === '6')
            .length > 0 &&
            <SubMenu
              key='verify_center'
              title={<p><Icon type='file-text' /><span>核销管理</span></p>}
            >
              {this._renderVerify()}
            </SubMenu>
        }
        <SubMenu
          key='after_sale'
          title={<p><Icon type='message' /><span>售后中心</span></p>}
        >
          <Menu.Item
            key='after_sale_refund'
            className={this.getMenuItemClass(urls.AFTER_SALE_REFUND)}
          >
            <Link to={urls.AFTER_SALE_REFUND}>退款列表</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default MamsMenu
