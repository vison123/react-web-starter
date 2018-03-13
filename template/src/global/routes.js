import * as urls from './routepath'
import Home from '../modules/home'

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    breadcrumbName: '首页'
  },
  {
    path: urls.HOME,
    exact: true,
    component: Home,
    breadcrumbName: '首页'
  }
]

export default routes
