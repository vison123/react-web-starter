import React, { PureComponent } from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'
import styles from './index.less'
import storage from '../../utils/storage'

const { Sider } = Layout
const { SubMenu } = Menu

// Allow menu.js config icon as string or ReactNode
//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type='setting' />,
const getIcon = (icon) => {
  if (typeof icon === 'string' && icon.indexOf('http') === 0) {
    return (
      <img
        src={icon}
        alt='icon'
        className={styles.icon}
      />
    )
  }
  if (typeof icon === 'string') {
    return (
      <span
        className={`iconfont ${icon}`}
        style={{ marginRight: '35px' }}
      />
    )
  }
  return icon
}

export default class SiderMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.menus = props.menuData
    this.state = {
      openKeys: storage.get('openKeys') || []
    }
  }
  getFlatMenuKeys(menus) {
    let keys = []
    menus.forEach((item) => {
      if (item.children) {
        keys.push(item.path)
        keys = keys.concat(this.getFlatMenuKeys(item.children))
      } else {
        keys.push(item.path)
      }
    })
    return keys
  }
  getSelectedMenuKeys = (path) => {
    const flatMenuKeys = this.getFlatMenuKeys(this.menus)
    const menu = flatMenuKeys.filter(item => path.startsWith(item))
    if (menu.length === 1) {
      return menu
    } else if (menu.length > 1) {
      return menu.filter(item => item !== '/')
    }
    return []
  }
  /**
  * 判断是否是http链接.返回 Link 或 a
  * Judge whether it is http link.return a or Link
  * @memberof SiderMenu
  */
  getMenuItemPath = (item) => {
    const itemPath = this.conversionPath(item.path)
    const icon = getIcon(item.icon)
    const { target, name } = item
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a
          href={itemPath}
          target={target}
        >
          {icon}<span>{name}</span>
        </a>
      )
    }
    return (
      <Link
        to={itemPath}
        target={target}
        replace={itemPath === this.props.location.pathname}
        onClick={this.props.isMobile ? () => { this.props.onCollapse(true) } : undefined}
      >
        {icon}<span>{name}</span>
      </Link>
    )
  }
  /**
   * get SubMenu or Item
   */
  getSubMenuOrItem=(item) => {
    if (item.children && item.children.some(child => child.name)) {
      return (
        <SubMenu
          title={
            item.icon ? (
              <span>
                {getIcon(item.icon)}
                <span>{item.name}</span>
              </span>
            ) : item.name
            }
          key={item.key || item.path}
        >
          {this.getNavMenuItems(item.children)}
        </SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key || item.path}>
          {this.getMenuItemPath(item)}
        </Menu.Item>
      )
    }
  }
  /**
  * 获得菜单子节点
  * @memberof SiderMenu
  */
  getNavMenuItems = (menusData) => {
    if (!menusData) {
      return []
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map((item) => {
        const ItemDom = this.getSubMenuOrItem(item)
        return this.checkPermissionItem(item.authority, ItemDom)
      })
      .filter(item => !!item)
  }
  // conversion Path
  // 转化路径
  conversionPath=(path) => {
    if (path && path.indexOf('http') === 0) {
      return path
    } else {
      return `/${path || ''}`.replace(/\/+/g, '/')
    }
  }
  // permission to check
  checkPermissionItem = (authority, ItemDom) => {
    if (this.props.Authorized && this.props.Authorized.check) {
      const { check } = this.props.Authorized
      return check(
        authority,
        ItemDom
      )
    }
    return ItemDom
  }
  handleOpenChange = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1]
    const isMainMenu = this.menus.some(
      item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
    )
    storage.set('openKeys', isMainMenu ? [lastOpenKey] : [...openKeys])
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    })
  }
  render() {
    const { logo, title, collapsed, location: { pathname }, onCollapse } = this.props
    const { openKeys } = this.state
    // Don't show popup menu when it is been collapsed
    const menuProps = collapsed ? {} : {
      openKeys,
    }
    // if pathname can't match, use the nearest parent's key
    let selectedKeys = this.getSelectedMenuKeys(pathname)
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]]
    }
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint='md'
        onCollapse={onCollapse}
        width={256}
        className={styles.sider}
      >
        <div
          className={styles.logo}
          key='logo'
        >
          <Link to='/'>
            <img
              src={logo}
              alt='logo'
            />
            <h1>{title}</h1>
          </Link>
        </div>
        <Menu
          key='Menu'
          theme='dark'
          mode='inline'
          {...menuProps}
          onOpenChange={this.handleOpenChange}
          selectedKeys={selectedKeys}
          style={{ padding: '16px 0', width: '100%' }}
        >
          {this.getNavMenuItems(this.menus)}
        </Menu>
      </Sider>
    )
  }
}
