import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise'
import { createLogger } from 'redux-logger'
import rootReducer from '../global/reducer'
import { createStore, applyMiddleware } from 'redux'
import registerServiceWorker from './registerServiceWorker'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import * as urls from '../global/routepath'
import Layout from '../modules'
import Login from '../modules/login'
// import storage from '../utils/storage.js'
import routes from '../global/routes'
import checkPermission from '../global/checkPermission'

import '../assets/styles/index.less'

const middlewares = [thunkMiddleware, promiseMiddleware]

if (process.env.NODE_ENV === `development`) {
  const logger = createLogger()
  middlewares.push(logger)
}

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
)

const verifyUser = (match, route) => {
  // let user = storage.get('user')
  // if (user && user.accessToken) {
  //   return (
  //     <Layout
  //       routes={routes}
  //       match={match}
  //       content={checkPermission(route)}
  //       path={route.path}
  //     />
  //   )
  // } else {
  //   return (<Redirect to={urls.LOGIN} />)
  // }
  return (
    <Layout
      routes={routes}
      match={match}
      content={checkPermission(route)}
      path={route.path}
    />
  )
}

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route
            key='login'
            path={urls.LOGIN}
            component={Login}
          />
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(match) => verifyUser(match, route)}
            />
          ))}
        </Switch>
      </Router>
    </Provider>
  </LocaleProvider>,
	document.getElementById('root')
)
registerServiceWorker()
