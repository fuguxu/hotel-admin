export default {
  handlerData () {
    console.log('我是没有用的函数')
  },
  openNewPage () {
    window.open(this.url)
  },
  findByAttr (data, attr, value) {
    if (Array.isArray(data)) {
      for (let val in data) {
        if (data[val][attr] === value) return data[val]
      }
    }
    return null
  },
  stringQuery (query) {
    return Object.keys(query).map((item) => {
      return `${item}=${query[item]}`
    }).join('&')
  },
  dataToString (date, spr = '-') {
    let t = new Date(date)
    let y = t.getFullYear()
    let m = t.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = t.getDate()
    d = d < 10 ? '0' + d : d
    return [y, m, d].join(spr)
  }
}
export function test () {
  console.log('测试没有用到的函数')
}
export function testPR () {
  console.log('test_pr')
}
