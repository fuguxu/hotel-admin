import axios from 'axios'
// import qs from 'qs';

axios.defaults.validateStatus = (status) => {
  if (status === 403) { // 无权限访问资源
    return false
  } else if (status === 401) { // 用户未登录或者登录已超时
    return false
  } else if (status === 404) {
    return false
  } else {
    return true
  }
}

const TIME_OUT = 50000

const BasePrefix = __DEV__ ? `http://ming849358679.imwork.net/base` : ''

const BaseAxiosOptions = {
  withCredentials: true,
  timeout: TIME_OUT,
  headers: { 'content-type': 'application/json' }
}

// 模块相关接口
const BaseUrl = `${BasePrefix}`
const Axios = axios.create(Object.assign({}, { baseURL: BaseUrl }, BaseAxiosOptions))

export const ModuleApi = makeFetch(Axios)

function makeFetch (moduleAxios) {
  return {
    get (url, params) {
      return moduleAxios.get(url, { params: params }).then(res => res.data)
    },
    post (url, params) {
      return moduleAxios.post(url, params).then(res => res.data)
    }
  }
}

// 定义相关接口
// 登录接口
export async function doLogin (params) {
  return ModuleApi.get('/doLogin', params)
}
// 产品分类保存接口
export async function saveProductCategory (params) {
  return ModuleApi.post('/productCategory/save', params)
}
// 产品分类获取接口
export async function getProductCategory (params) {
  return ModuleApi.get('/productCategory/getByPage', params)
}
// 获取子分类产品
export async function getProductById (params) {
  return ModuleApi.get('/productCategory/getByPage', params)
}
// 删除产品分类
export async function deleteProduct (params) {
  return ModuleApi.get('/productCategory/del', params)
}
