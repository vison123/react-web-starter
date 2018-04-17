import React, { PureComponent } from 'react'
import { Menu, Row, Col, Layout } from 'antd'
import storage from '../../utils/storage'
import styles from './index.less'
import { Link } from 'react-router-dom'

const { Sider } = Layout

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
        style={{ marginRight: '20px' }}
      />
    )
  }
  return icon
}

export default class ColMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.menus = props.menuData
    this.state = {
      openKeys: storage.get('openKeys')
    }
  }

  handleOpenChange = (openKey) => {
    const openKeys = openKey.keyPath
    const lastOpenKey = openKeys[openKeys.length - 1]
    const isMainMenu = this.menus.some(
      item => lastOpenKey && (item.key === lastOpenKey || item.path === lastOpenKey)
    )
    storage.set('openKeys', isMainMenu ? [lastOpenKey] : [...openKeys])
    this.setState({
      openKeys: isMainMenu ? [lastOpenKey] : [...openKeys],
    })
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
    if (flatMenuKeys.filter(item => item.indexOf(path) > -1).length > 0) {
      return [path]
    }
    return []
  }

  // 转化路径
  conversionPath = (item) => {
    const path = item.path
    if (path && path.indexOf('http') === 0) {
      return path
    } else {
      if (item.children) {
        return ''
      }
      return `/${path || ''}`.replace(/\/+/g, '/')
    }
  }

  getParentMenuItems = (menusData) => {
    if (!menusData) {
      return []
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map((item) => {
        return (
          <Menu.Item
            key={item.key || item.path}
          >
            {this.getMenuItemPath(item)}
          </Menu.Item>
        )
      })
      .filter(item => !!item)
  }

  getChildMenuItems = (menusData) => {
    if (!menusData) {
      return []
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map((item) => {
        return (
          <Menu.Item
            key={item.key || item.path}
          >
            {this.getMenuItemPath(item)}
          </Menu.Item>
        )
      })
      .filter(item => !!item)
  }

  getMenuItemPath = (item) => {
    const itemPath = this.conversionPath(item)
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
    } else if (itemPath === '') {
      return (
        <span>
          {icon}<span>{name}</span>
        </span>
      )
    }
    return (
      <Link
        to={itemPath}
      >
        {icon}<span>{name}</span>
      </Link>
    )
  }

  render() {
    const { location: { pathname }} = this.props
    const { openKeys } = this.state
    let selectedKeys = this.getSelectedMenuKeys(pathname)
    if (!selectedKeys.length) {
      selectedKeys = [openKeys[openKeys.length - 1]]
    }
    const childMenu = this.menus.find(menu => menu.path === openKeys[0])
    return (
      <Sider width={256} style={{ height: 'auto' }}>
        <Row className={styles.menuWrapper}>
          <Col span={12} style={{ height: '100%' }}>
            <Menu
              key='Menu'
              mode='inline'
              style={{ width: 128, backgroundColor: '#F7F7F7', height: '100%' }}
              selectedKeys={openKeys}
              onClick={this.handleOpenChange}
            >
              {this.getParentMenuItems(this.menus)}
            </Menu>
          </Col>
          <Col span={12} style={{ height: '100%' }}>
            <Menu
              key='Menu2'
              mode='inline'
              defaultSelectedKeys={['3']}
              style={{ width: 128, height: '100%' }}
              selectedKeys={selectedKeys}
            >
              {this.getChildMenuItems(childMenu ? childMenu.children : [])}
            </Menu>
          </Col>
        </Row>
      </Sider>
    )
  }
}
