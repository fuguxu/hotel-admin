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
        if (val[attr] === value) return val
      }
    }
    return null
  },
  stringQuery (query) {
    return Object.keys(query).map((item) => {
      return `${item}=${query[item]}`
    }).join('&')
  }
}
export function test () {
  console.log('测试没有用到的函数')
}
export function testPR () {
  console.log('test_pr')
}
