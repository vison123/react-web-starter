import fetchData from '../../utils/fetch'
import api from '../../global/api'
import { message } from 'antd'
import storage from '../../utils/storage'
import { createAction } from 'redux-actions'

// ===========================> Action Types <=========================== //

export const LOGIN = 'spa/login'

// ===========================> Actions <=========================== //

export const userLoginAct = arg => dispatch => {
  fetchData(dispatch, api.login, arg)
    .then(res => {
      if (res.code !== 0) {
        message.error(res.errmsg)
      } else {
        dispatch(createAction(LOGIN)(res.data))
      }
    })
}

export const userLogout = arg => dispatch => {
  fetchData(dispatch, api.logout, arg)
    .then(res => {
      if (res.code !== 0) {
        message.error(res.errmsg)
      } else {
        storage.clear()
        location.reload()
      }
    })
}

// ===========================> Reducer <=========================== //

let initState = {}

export const userLogin = (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
