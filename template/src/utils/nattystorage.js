import nattyStorage from 'natty-storage'

const storage = nattyStorage({
  async: false,          // 是否以异步方式使用
  type: 'localStorage', // 缓存方式
  key: 'platform',     // !!! 唯一必选的参数，用于内部存储
  tag: 'v1.1',          // 缓存的标记，用于判断是否有效
  duration: 1000 * 60 * 10, // 缓存的有效期长，以毫秒数指定
})

storage.clearAuth = function () {
  storage.remove('session')
}

export default storage
