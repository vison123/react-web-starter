const obj = {}
obj.json2url = function (json) {
  let url = ''
  let arr = []
  for (let i in json) {
    arr.push(i + '=' + json[i])
  }
  url = arr.join('&')
  return url
}

obj.url2json = function (url) {
  const oSearch = decodeURI(url.search).substring(1)
  const json = {}
  oSearch.split('&').forEach((m, i) => {
    json[m.split('=')[0]] = m.split('=')[1]
  })
  return json
}

export default obj
