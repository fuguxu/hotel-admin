import axios from 'axios'
import { interceptors } from '@/service/interceptors'
const { stringQuery } = require('@/util/main').default

const TIME_OUT = 50000

export const BasePrefix = __DEV__ ? (0 ? `http://ming849358679.imwork.net` : 'http://8.129.62.222:8083') : ''

const BaseAxiosOptions = {
  withCredentials: true,
  timeout: TIME_OUT,
  headers: { 'content-type': 'application/json' }
}

// 模块相关接口
const BaseUrl = `${BasePrefix}`
const Axios = createAxios()
function createAxios (options = {}) {
  let instance = axios.create(Object.assign({}, { baseURL: BaseUrl }, BaseAxiosOptions, options))
  interceptors(instance)
  return instance
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
// 营销管理模块接口
export const MarketModuleApi = makeFetch(createAxios({ baseURL: `${BaseUrl}/product` }))

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
export async function deleteProductCategory (params) {
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
export async function deleteSku (params) {
  return ConfModuleApi.get('/confProductSku/del', params)
}
export async function saveSpu (params) {
  return ConfModuleApi.post('/confProductSpu/save', params)
}
export async function getSpu (params) {
  return ConfModuleApi.get('/confProductSpu/getByPage', params)
}
export async function deleteSpu (params) {
  return ConfModuleApi.get('/confProductSpu/del', params)
}
// 根据产品分类id获取spu
export async function getConfSpuByCategroy (params) {
  return ConfModuleApi.get('/confProductSpu/getConfSpuByCategroy', params)
}
// 根据产品分类id获取sku
export async function getConfSkuByCategroy (params) {
  return ConfModuleApi.get('/confProductSku/getConfSkuByCategroy', params)
}

// 营销模块接口
// 店铺保存接口
export async function saveProductStroe (params) {
  return MarketModuleApi.post('/store/productStore/save', params)
}
// 店铺详情接口
export async function getProductStoreById (params) {
  return MarketModuleApi.get('/store/productStore/getById', params)
}
// 店铺列表
export async function getProductStore (params) {
  return MarketModuleApi.get('/store/productStore/getByPage', params)
}
// 删除店铺
export async function deleteProductStore (params) {
  return MarketModuleApi.get('/store/productStore/del', params)
}

// 产品保存接口
export async function saveProductInfo (params) {
  return MarketModuleApi.post('/base/productInfo/save', params)
}
// 产品列表分页接口
export async function getProduct (params) {
  return MarketModuleApi.get('/base/productInfo/getByPage', params)
}
// 删除产品
export async function deleteProduct (params) {
  return MarketModuleApi.post('/base/productInfo/del', params)
}
// 获取产品详情
export async function getProductById (params) {
  return MarketModuleApi.get('/base/productInfo/getById', params)
}
// 获取 getSpuValue
export async function getSpuValue (params) {
  return MarketModuleApi.get('/base/productInfo/getSpuValue', params)
}
// 获取 getSkuValue
export async function getSkuValue (params) {
  return MarketModuleApi.get('/base/productInfo/getSkuValue', params)
}
// 商品上下架
export async function handleProduct (params, query) {
  return MarketModuleApi.post(`/base/productInfo/handleProduct?${stringQuery(query)}`, params)
}
