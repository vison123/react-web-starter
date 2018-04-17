import storage from './storage'
import axios from 'axios'
import { baseUrl } from './config'
import { globalShowSpinAction, globalShowSpinTipAction } from '../global/globalReduck'
import { notification } from 'antd'

let fetcher = axios.create({
  method: 'post',
  baseURL: baseUrl,
  withCredentials: true,
  transformRequest: [
    function(data) {
      return JSON.stringify(data)
    }
  ],
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }
})

// 网络请求request拦截器
fetcher.interceptors.request.use(
  function(config) {
    if (config && config.data) {
      // TODO 对请求参数进行包装
      config.data.accessToken = storage.get('accessToken')
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

// 网络请求response拦截器
fetcher.interceptors.response.use(function (response) {
  if (response.data.code === 60001 || response.data.code === 60002 || response.data.code === 60003 ||
    response.data.code === 60004 || response.data.code === 60005) {
    // TODO 对特定异常特殊处理
    notification['error']({
      message: '警告',
      description: response.data && response.data.errmsg
    })
  } else {
    return response.data
  }
}, function (err) {
  if (err.toString().startsWith('Network Error') >= 0) {
    notification['warning']({
      message: '警告',
      description: '网络异常，请检查当前互联网状态'
    })
  } else if (err.toString().startsWith('Request failed with status code')) {
    notification['warning']({
      message: '警告',
      description: '接口异常'
    })
  } else {
    notification['warning']({
      message: '警告',
      description: err.toString()
    })
  }
})

export default function fetch(dispatch, apiUrl, arg, showLoading = true, content = '') {
  showLoading && dispatch(globalShowSpinAction(true))
  content && dispatch(globalShowSpinTipAction(content))
  return fetcher.post(apiUrl, arg)
    .then(data => {
      showLoading && dispatch(globalShowSpinAction(false))
      content && dispatch(globalShowSpinTipAction(''))
      if (data) {
        return data
      } else {
        return Promise.reject(data)
      }
    })
}
