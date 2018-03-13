let baseUrl = '/'
let imgPrefix = 'http://dx-image-test.itangchao.me/'
let videoPrefix = 'http://dx-video-test.itangchao.me/'
/*eslint-disable */
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://wapi.mall.jcease.com'
  imgPrefix = 'https://image.youxiangtv.com/'
  videoPrefix = 'https://video.youxiangtv.com/'
  if (TEST) {
    console.log('in TEST')
    baseUrl = 'http://test.wapi.mall.jcease.com'
    imgPrefix = 'http://dx-image-test.itangchao.me/'
    videoPrefix = 'http://dx-video-test.itangchao.me/'
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

export { baseUrl, imgPrefix, videoPrefix }
