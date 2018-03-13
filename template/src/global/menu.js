const menuData = [
  {
    name: '首页',
    icon: 'icon-shouye',
    path: 'home',
    children: [
      {
        name: '首页',
        path: '/',
      }
    ],
  },
]

function formatter(data, parentAuthority) {
  return data.map(item => {
    const result = {
      ...item,
      path: item.path,
      authority: item.authority || parentAuthority,
      key: item.path,
    }
    if (item.children) {
      result.children = formatter(item.children, item.authority)
    }
    return result
  })
}

export const getMenuData = () => formatter(menuData)
