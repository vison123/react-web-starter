
import { createAction } from 'redux-actions'
import { message } from 'antd'

import fetchData from '../utils/fetch'
import api from './api'

// ===========================> Action Types <=========================== //
const GLOBAL_QINIU_TOKEN = 'GLOBAL_QINIU_TOKEN' // 七牛token
const GLOBAL_SHOW_SPIN = 'GLOBAL_SHOW_SPIN'
const GLOBAL_SHOW_SPIN_TIP = 'GLOBAL_SHOW_SPIN_TIP'

// ===========================> Actions <=========================== //
export const globalQiniuTokenAction = payload => createAction(GLOBAL_QINIU_TOKEN)(payload)
export const globalShowSpinAction = payload => createAction(GLOBAL_SHOW_SPIN)(payload)
export const globalShowSpinTipAction = payload => createAction(GLOBAL_SHOW_SPIN_TIP)(payload)

export const fetchQiniuToken = key => dispatch => {
  const timeStr = String(new Date().getSeconds().toString(16) + Math.random())
  fetchData(dispatch, api.qiniuToken, { key: timeStr }).then(res => {
    if (res.code === 0) {
      dispatch(globalQiniuTokenAction(res.data.token))
    } else {
      message.error(res.errmsg)
    }
  })
}

// ===========================> Reducer <=========================== //
const initialState = {
  list: [],
  currentPage: 1,
  pageSize: 10,
  total: 0,
  showSpinBool: false,
  showSpinTip: '',
  isLoading: false,
  // treeData: [],
  // citySelect: [],
}

export const globalReduck = (state = initialState, action) => {
  switch (action.type) {
    case GLOBAL_QINIU_TOKEN:
      return {
        ...state,
        qiniuToken: action.payload
      }
    case GLOBAL_SHOW_SPIN:
      return {
        ...state,
        showSpinBool: action.payload
      }
    case GLOBAL_SHOW_SPIN_TIP:
      return {
        ...state,
        showSpinTip: action.payload
      }
    default:
      return state
  }
}
