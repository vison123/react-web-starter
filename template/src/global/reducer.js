import { combineReducers } from 'redux'
import { common } from './commonreduck'
import { userLogin } from '../modules/login/reduck'
import { router } from './routerreduck'

const rootReducer = combineReducers({
  common,
  userLogin,
  router,
})

export default rootReducer
