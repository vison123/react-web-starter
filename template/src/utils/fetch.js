import storage from './storage'
import axios from 'axios'
import { baseUrl } from './config'
import { showSpin } from '../global/commonreduck'
import { notification } from 'antd'

const userInfo = storage.get('user')

let fetcher = axios.create({
  method: 'post',
  baseURL: baseUrl,
  // baseURL: 'http://10.0.31.116:8081',
  // baseURL: 'http://10.0.31.125:8081',
  withCredentials: true,
  transformRequest: [function (data) {
    if (userInfo && data && !data.NOUSERINFO) {
      data.accessToken = userInfo.accessToken
    }
    return JSON.stringify(data)
  }],
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    'accessToken': userInfo && userInfo.accessToken
  }
})

fetcher.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

fetcher.interceptors.response.use(function (response) {
  if (response.data.code === 89001 || response.data.code === 81001) {
    location.href = '/login'
  }
  return response.data
}, function (error) {
  return Promise.reject(error)
})

export default function fetch(dispatch, apiUrl, arg, showLoading = true, content = '') {
  return new Promise((resolve, reject) => {
    showLoading && dispatch(showSpin({ bool: true, content }))
    fetcher.post(apiUrl, arg)
      .then(data => {
        showLoading && dispatch(showSpin({ bool: false, content: '' }))
        resolve(data)
      })
      .catch(err => {
        dispatch(showSpin({ bool: false, content: '' }))
        if (err.toString().indexOf('Network Error')) {
          notification['warning']({
            message: '警告',
            description: '网络异常，请检查当前互联网状态',
          })
        } else {
          notification['warning']({
            message: '警告',
            description: err.toString,
          })
        }
        reject(err)
      })
  })
}
