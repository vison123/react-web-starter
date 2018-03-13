import fetchData from '../utils/fetch'
import { message } from 'antd'
import api from './api'
import { createAction } from 'redux-actions'

export const SHOW_SPIN = 'spa/common/SHOW_SPIN'
export const GET_CITY_SELECT = 'spa/components/cityselect'
export const SET_QINIU_TOKEN = 'spa/common/SET_QINIU_TOKEN' // 七牛token
export const CHOOSE_SHOPS = 'spa/common/CHOOSE_SHOPS'

export const showSpin = payload => ({ type: SHOW_SPIN, payload })

export const chooseShops = (arg, shopInfo) => dispatch => {
  return fetchData(dispatch, api.shop.getHomeShopInfo, arg).then(res => {
    if (res.code !== 0) {
      message.error(res.errmsg)
    }
    dispatch(createAction(CHOOSE_SHOPS)(res.data))
    localStorage.setItem('currentShop', JSON.stringify(shopInfo))
  })
}

export const getCitySelect = (arg = {}) => dispatch => {
  fetchData(dispatch, api.citySelect, arg).then(res => {
    if (res.code !== 0) {
      message.error(res.errmsg)
    }
    dispatch(createAction(GET_CITY_SELECT)(res))
  })
}

// 获取七牛token
export const getQiniuToken = key => dispatch => {
  fetchData(dispatch, api.qiniuToken, { key }).then(res => {
    if (res.code === 0) {
      dispatch(createAction(SET_QINIU_TOKEN)(res.data))
    } else {
      message.error(res.errmsg)
    }
  })
}

export const print = arg => dispatch => {
  return fetchData(dispatch, api.print.printExpress, arg).then(res => {
    if (res.code === 0) {
      message.success('打印成功', 1)
    } else {
      message.error(res.errmsg)
    }
  })
}

let initialState = {
  showSpin: {
    bool: false,
    tip: ''
  },
  citySelect: []
}

export const common = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SPIN:
      return { ...state, showSpin: action.payload }
    case GET_CITY_SELECT:
      return { ... state, citySelect: action.payload }
    case SET_QINIU_TOKEN:
      return { ...state, qiniuToken: action.payload.token }
    case CHOOSE_SHOPS:
      return { ...state, chooseShops: action.payload }
    default:
      return state
  }
}
