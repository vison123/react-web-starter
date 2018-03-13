import { saveAs } from 'file-saver'

function blobToString(b) {
  const url = URL.createObjectURL(b)
  const xhr = new XMLHttpRequest()

  xhr.open('GET', url, false)
  xhr.send()
  URL.revokeObjectURL(url)

  return xhr.responseText
}

function save(xhr, filename) {
  const blob = new Blob([xhr.response], { type: 'application/vnd.ms-excel' })
  saveAs(blob, filename)
}

function send(url, token, cb) {
  const xhr = new XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.setRequestHeader('X-Token', token)
  xhr.responseType = 'blob'
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        if (xhr.response.type === 'application/json') {
          try {
            let json = JSON.parse(blobToString(xhr.response))
            return cb(json)
          } catch (e) {
            return cb('导出失败')
          }
        } else {
          cb(null, xhr)
        }
      } else {
        return cb('导出失败')
      }
    }
  }
  xhr.send()
}

/**
 * 项目定制的下载文件
 * @param {string} url
 * @param {string} token xhr.headers['X-Token']
 */
function exportFile(url, token) {
  return new Promise((resolve, reject) => {
    send(url, token, (err, xhr) => {
      if (err) {
        return reject(err)
      }

      let filename = ''

      try {
        filename = xhr.getResponseHeader('Content-Disposition').match(/filename=(.*)$/)[1]
      } catch (e) {
        filename = 'export_' + (new Date()).getTime() + '.xls'
      }

      save(xhr, decodeURIComponent(filename))

      return resolve('导出成功')
    })
  })
}

export default exportFile
