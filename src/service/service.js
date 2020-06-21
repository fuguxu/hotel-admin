import axios from 'axios'
import { interceptors } from '@/service/interceptors'
const { stringQuery } = require('@/util/main').default

const TIME_OUT = 50000

export const BasePrefix = __DEV__ ? (1 ? `http://ming849358679.imwork.net` : 'http://8.129.62.222:9085') : ''

const BaseAxiosOptions = {
  withCredentials: true,
  timeout: TIME_OUT,
  headers: { 'content-type': 'application/json' }
}

// 新零售api模块相关接口
const BaseUrl = `${BasePrefix}/marketAdmin`
// 基础架构相关api
const StructureUrl = `${BasePrefix}/ljm`

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
export const LoginModuleApi = makeFetch(createAxios())
// 字典相关接口
export const DictModuleApi = makeFetch(createAxios({ baseURL: `${StructureUrl}/dict` }))
// 权限相关接口
export const AuthModuleApi = makeFetch(createAxios({ baseURL: `${StructureUrl}/auth` }))
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
// 商品制定分类接口
export async function getCustomCategory (params) {
  return MarketModuleApi.get('/base/productInfo/getCustomCategory', params)
}

// 字典保存接口
export async function dictSave (params) {
  return DictModuleApi.post(`/sysDict/save`, params)
}
// 分页获取字典
export async function getDictByPage (params) {
  return DictModuleApi.get(`/sysDict/getByPage`, params)
}
// 删除字典
export async function deleteDict (params) {
  return DictModuleApi.post(`/sysDict/del`, params)
}
// 获取字典详情
export async function getDictById (params) {
  return DictModuleApi.get(`/sysDict/getById`, params)
}
// 保存字典条目
export async function dictItemSave (params) {
  return DictModuleApi.post(`/sysDictItem/save`, params)
}
// 获取字典条目
export async function getDictItemByPage (params) {
  return DictModuleApi.get(`/sysDictItem/getByPage`, params)
}
// 删除字典条目
export async function deleteDictItem (params) {
  return DictModuleApi.post(`/sysDictItem/del`, params)
}

// 项目管理保存接口
export async function projectSave (params) {
  return AuthModuleApi.post(`/sysAuthProject/save`, params)
}
// 分页获取项目
export async function getProjectByPage (params) {
  return AuthModuleApi.get(`/sysAuthProject/getByPage`, params)
}
// 获取所有项目
export async function getAllProject (params) {
  return AuthModuleApi.get(`/sysAuthProject/getAllProject`, params)
}
// 获取项目详情
export async function getProjectById (params) {
  return AuthModuleApi.get(`/sysAuthProject/getById`, params)
}
// 删除项目
export async function deleteProjectById (params) {
  return AuthModuleApi.post(`/sysAuthProject/del?${stringQuery(params)}`)
}

// 应用管理保存接口
export async function appSave (params) {
  return AuthModuleApi.post(`/sysAuthApp/save`, params)
}
// 应用管理保存接口
export async function getAppById (params) {
  return AuthModuleApi.get(`/sysAuthApp/getById`, params)
}
// 分页获取应用
export async function getAppByPage (params) {
  return AuthModuleApi.get(`/sysAuthApp/getByPage`, params)
}
// 删除应用
export async function deleteAppById (params) {
  return AuthModuleApi.get(`/sysAuthApp/del`, params)
}

// 分页获取资源应用
export async function getResourceAppByPage (params) {
  return AuthModuleApi.get(`/sysAuthResource/getAppByPage`, params)
}
// 保存资源
export async function resourceSave (params) {
  return AuthModuleApi.post(`/sysAuthResource/save`, params)
}
// 分页获取资源
export async function getResourceByPage (params) {
  return AuthModuleApi.get(`/sysAuthResource/getResTree`, params)
}
// 获取资源详情
export async function getResourceById (params) {
  return AuthModuleApi.get(`/sysAuthResource/getById`, params)
}
// 删除资源
export async function deleteResourceById (params) {
  return AuthModuleApi.post(`/sysAuthResource/del?${stringQuery(params)}`, params)
}
