// import routes from './routes'
// import Exception404 from '../modules/exception/404'

export default function checkPermission (currentRoute, businessType = 'Ebooking') {
  // 判定权限
  // let permissionRouter = routes.filter(route => route.permission === businessType)
  // let isInPer = permissionRouter.find(route => route === currentRoute)
  // if (isInPer) {
  //   return currentRoute.component
  // } else {
  //   return Exception404
  // }
  return currentRoute.component
}
