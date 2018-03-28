let baseUrl = '/'
let imgPrefix = 'https://mallimg.jcease.com/'
let qiniuUpload = 'http://upload.qiniu.com'
/*eslint-disable */
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://wapi.mall.jcease.com'
  if (TEST) {
    console.log('in TEST')
    baseUrl = 'http://test.wapi.mall.jcease.com'
  }
  if (PRE) {
    console.log('in PRE')
    baseUrl = 'http://pre.wapi.mall.jcease.com'
    console.log(baseUrl)
  }
  if (DEV) {
    console.log('in DEV')
    baseUrl = 'http://10.0.21.167:8088'
    console.log(baseUrl)
  }
}

export { baseUrl, imgPrefix, qiniuUpload }
