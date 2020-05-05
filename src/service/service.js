import axios from 'axios'
const { stringQuery } = require('@/util/main').default

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

export const BasePrefix = __DEV__ ? `http://ming849358679.imwork.net` : ''

const BaseAxiosOptions = {
  withCredentials: true,
  timeout: TIME_OUT,
  headers: { 'content-type': 'application/json' }
}

// 模块相关接口
const BaseUrl = `${BasePrefix}`
const Axios = createAxios()
function createAxios (options = {}) {
  return axios.create(Object.assign({}, { baseURL: BaseUrl }, BaseAxiosOptions, options))
}
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

// 配置管理模块的接口
export const ConfModuleApi = makeFetch(createAxios({ baseURL: `${BaseUrl}/conf/base` }))

// 登录模块接口
export const LoginModuleApi = makeFetch(Axios)

// 文件上传url
export function getUploadUrl (params) {
  return `${BaseUrl}/file/handler/publicUpload?${stringQuery(params)}`
}

// 定义相关接口
// ****************************
// 登录接口
export async function doLogin (params) {
  return LoginModuleApi.get('/doLogin', params)
}
// ****************************
// 产品分类保存接口
export async function saveProductCategory (params) {
  return ConfModuleApi.post('/productCategory/save', params)
}
// 产品分类获取接口
export async function getProductCategory (params) {
  return ConfModuleApi.get('/productCategory/getByPage', params)
}
// 获取子分类产品
export async function getProductByParentId (params) {
  return ConfModuleApi.get('/productCategory/getChildren', params)
}
// 删除产品分类
export async function deleteProduct (params) {
  return ConfModuleApi.get('/productCategory/del', params)
}
// 保存品牌
export async function saveProductBrand (params) {
  return ConfModuleApi.post('/productBrand/save', params)
}
// 获取品牌列表
export async function getProductBrand (params) {
  return ConfModuleApi.get('/productBrand/getByPage', params)
}
// 获取品牌详情
export async function getProductBrandById (params) {
  return ConfModuleApi.get('/productBrand/getById', params)
}
// 删除品牌
export async function deleteProductBrand (params) {
  return ConfModuleApi.get('/productBrand/del', params)
}
// 用户等级保存
export async function saveUserLevel (params) {
  return ConfModuleApi.post('/userLevelManage/save', params)
}
// 获取用户等级列表
export async function getUserLevel (params) {
  return ConfModuleApi.get('/userLevelManage/getByPage', params)
}
// 获取用户等级详情
export async function getUserLevelById (params) {
  return ConfModuleApi.get('/userLevelManage/getById', params)
}
// 获取用户等级详情
export async function deleteUserLevel (params) {
  return ConfModuleApi.get('/userLevelManage/del', params)
}
// spu sku相关配置接口
export async function saveSku (params) {
  return ConfModuleApi.post('/confProductSku/save', params)
}
export async function getSku (params) {
  return ConfModuleApi.get('/confProductSku/getByPage', params)
}
