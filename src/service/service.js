import axios from 'axios'
import { interceptors } from '@/service/interceptors'
const { stringQuery } = require('@/util/main').default

const TIME_OUT = 50000

export const BasePrefix = __DEV__ ? (0 ? `http://ming849358679.imwork.net` : 'http://8.129.62.222:9085') : ''

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
// 分销商管理模块
export const MerchantModuleApi = makeFetch(createAxios({ baseURL: `${BaseUrl}/merchant` }))
// 登录模块接口
export const LoginModuleApi = makeFetch(createAxios())
// 字典相关接口
export const DictModuleApi = makeFetch(createAxios({ baseURL: `${StructureUrl}/dict` }))
// 权限相关接口
export const AuthModuleApi = makeFetch(createAxios({ baseURL: `${StructureUrl}/auth` }))
// 组织相关接口
export const OrgModuleApi = makeFetch(createAxios({ baseURL: `${StructureUrl}/org` }))
// 订单相关接口
export const OrderModuleApi = makeFetch(createAxios({ baseURL: `${BaseUrl}/order` }))
// 用户相关接口
export const UserModuleApi = makeFetch(createAxios({ baseURL: `${BaseUrl}/user` }))
// 文件上传url
export function getUploadUrl (params) {
  return `${BaseUrl}/file/handler/publicUpload?${stringQuery(params)}`
}

// 定义相关接口
// ****************************
// 登录接口
export async function doLogin (params) {
  return LoginModuleApi.post('/doLogin', params)
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
// 获取某个字典
export async function getDictData (params) {
  return DictModuleApi.get(`/sysDict/getDictData`, params)
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
// 保存角色
export async function roleSave (params) {
  return AuthModuleApi.post(`/sysAuthRole/save`, params)
}
// 分页获取角色
export async function getRoleByPage (params) {
  return AuthModuleApi.get(`/sysAuthRole/getByPage`, params)
}
// 获取角色详情
export async function getRoleById (params) {
  return AuthModuleApi.get(`/sysAuthRole/getById`, params)
}
// 删除角色
export async function deleteRoleById (params) {
  return AuthModuleApi.get(`/sysAuthRole/del`, params)
}
// 获取已授权的资源
export async function getAuthorizedRes (params) {
  return AuthModuleApi.get(`/sysAuthRole/getAuthorizedRes`, params)
}
// 角色授权
export async function roleAuthorize (params) {
  return AuthModuleApi.post(`/sysAuthRole/authorize`, params)
}
// 获取已指派用户
export async function getAppointedUser (params) {
  return AuthModuleApi.post(`/sysAuthRole/getAppointedUser?${stringQuery(params)}`, params)
}
// 指派用户
export async function appointUser (query, params) {
  return AuthModuleApi.post(`/sysAuthRole/appointUser?${stringQuery(query)}`, params)
}
// 取消指派用户
export async function removeAppointedUser (query, params) {
  return AuthModuleApi.post(`/sysAuthRole/removeAppointedUser?${stringQuery(query)}`, params)
}

// 获取顶层组织
export async function getRootOrg (params) {
  return OrgModuleApi.get(`/sysOrgInfo/getRootOrg`, params)
}
// 获取子层组织
export async function getChildOrgByParentOrg (params) {
  return OrgModuleApi.get(`/sysOrgInfo/getChildOrg`, params)
}
// 保存机构
export async function OrgSave (params) {
  return OrgModuleApi.post(`/sysOrgInfo/save`, params)
}
// 获取机构信息
export async function getOrgById (params) {
  return OrgModuleApi.get(`/sysOrgInfo/getById`, params)
}
// 获取所有机构
export async function getAllOrg () {
  return OrgModuleApi.get(`/sysOrgInfo/getAllOrg`)
}
// 删除机构
export async function deleteOrgById (params) {
  return OrgModuleApi.get(`/sysOrgInfo/delOrg`, params)
}

// 获取顶级部门
export async function getRootDept (params) {
  return OrgModuleApi.get(`/sysDept/getRootDept`, params)
}
// 获取子部门
export async function getChildDept (params) {
  return OrgModuleApi.get(`/sysDept/getChildDept`, params)
}
// 保存部门
export async function deptSave (params) {
  return OrgModuleApi.post(`/sysDept/save`, params)
}
// 获取部门详情
export async function getDeptById (params) {
  return OrgModuleApi.get(`/sysDept/getById`, params)
}
// 删除部门
export async function deleteDeptById (params) {
  return OrgModuleApi.post(`/sysDept/del`, params)
}
// 获取所有部门
export async function getAllDepts (params) {
  return OrgModuleApi.get(`/sysDept/getDepts`, params)
}
// 分页获取岗位
export async function getPositionsByPage (params) {
  return OrgModuleApi.get(`/sysPost/getByPage`, params)
}
// 获取岗位信息
export async function getPositionsById (params) {
  return OrgModuleApi.get(`/sysPost/getById`, params)
}
// 保存岗位
export async function positionsSave (params) {
  return OrgModuleApi.post(`/sysPost/save`, params)
}
// 删除岗位
export async function deletePositionsById (params) {
  return OrgModuleApi.post(`/sysPost/del`, params)
}
// 获取所有岗位
export async function getAllPositions (params) {
  return OrgModuleApi.get(`/sysPost/getPositions`, params)
}

// 保存用户信息
export async function userInfoSave (params) {
  return OrgModuleApi.post(`/sysUser/save`, params)
}
// 获取用户信息
export async function getUserInfoById (params) {
  return OrgModuleApi.get(`/sysUser/getById`, params)
}
// 分页获取用户信息
export async function getUserByPage (params) {
  return OrgModuleApi.get(`/sysUser/getByPage`, params)
}
// 删除用户信息
export async function deleteUserById (params) {
  return OrgModuleApi.post(`/sysUser/del`, params)
}
// 分页获取商户信息
export async function getMerchantInfoByPage (params) {
  return MerchantModuleApi.get(`/info/merchantInfo/getByPage`, params)
}
// 保存商户信息
export async function merchantInfoSave (params) {
  return MerchantModuleApi.post(`/info/merchantInfo/save`, params)
}
// 获取商户详情
export async function getMerchantInfoById (params) {
  return MerchantModuleApi.get(`/info/merchantInfo/getById`, params)
}
// 保存商户账户信息
export async function merchantAccountSave (params) {
  return MerchantModuleApi.post(`/info/merchantInfo/saveMerchantAccount`, params)
}
// 获取商户账户信息
export async function getMerchantAccountList (params) {
  return MerchantModuleApi.get(`/info/merchantInfo/getMerchantAccountList`, params)
}
// 删除商户账户信息
export async function deleteMerchantAccountById (params) {
  return MerchantModuleApi.post(`/info/merchantInfo/delMerchantAccount`, params)
}
// 获取账户信息
export async function getMerchantAccountById (params) {
  return MerchantModuleApi.get(`/info/merchantInfo/getMerchantAccount`, params)
}
// 保存商户分润属性
export async function merchantLevelSave (params) {
  return MerchantModuleApi.post(`/info/merchantInfo/saveMerchantLevel`, params)
}
// 获取商户分润等级
export async function getMerchantRebateConf (params) {
  return MerchantModuleApi.get(`/info/merchantInfo/getMerchantRebateConf`, params)
}
// 获取分润属性详情
export async function getMerchantLevel (params) {
  return MerchantModuleApi.get(`/info/merchantInfo/getMerchantLevel`, params)
}
// 商户绑定用户
export async function bindUser (params) {
  return MerchantModuleApi.get(`/info/merchantInfo/bindUser`, params)
}
// 获取商户已绑定用户
export async function getBindUser (params) {
  return MerchantModuleApi.get(`/info/merchantInfo/getBindUser`, params)
}
// 分页获取商户提现记录
export async function getMerchantWithdrawRecordByPage (params) {
  return MerchantModuleApi.get(`/account/merchantWithdrawRecord/getByPage`, params)
}
// 商户提现审核接口
export async function approvalMerchantWithdraw (params) {
  return MerchantModuleApi.post(`/account/merchantWithdrawRecord/approval`, params)
}
// 商户处理转账
export async function saveVoucherMerchantWithdraw (params) {
  return MerchantModuleApi.post(`/account/merchantWithdrawRecord/saveVoucher`, params)
}

// 获取订单分页接口
export async function getOrderListByPage (params) {
  return OrderModuleApi.post(`/base/orderInfo/getByPage`, params)
}
// 获取订单信息接口
export async function getOrderInfo (params) {
  return OrderModuleApi.get(`/base/orderInfo/getOrderInfo`, params)
}
// 获取订单支付信息
export async function getOrderPaymentInfo (params) {
  return OrderModuleApi.get(`/base/orderInfo/getOrderPaymentInfo`, params)
}
// 获取订单售后信息
export async function getOrderReturnInfo (params) {
  return OrderModuleApi.get(`/base/orderInfo/getOrderReturnInfo`, params)
}
// 获取订单评价信息
export async function getOrderAppraiseInfo (params) {
  return OrderModuleApi.get(`/base/orderInfo/getOrderAppraiseInfo`, params)
}

// 获取订单分页评价
export async function getOrderAppraiseByPage (params) {
  return OrderModuleApi.post(`/appraise/orderAppraise/getByPage`, params)
}
// 获取评价详情
export async function getOrderAppraiseByPaId (params) {
  return OrderModuleApi.get(`/appraise/orderAppraise/getById`, params)
}
// 分页获取物流
export async function getDeliverGoods (params) {
  return OrderModuleApi.post(`/base/deliver/getDeliverGoods`, params)
}
// 获取订单物流信息
export async function getOrderLogisticsInfo(params) {
  return OrderModuleApi.get(`/base/orderInfo/getOrderLogisticsInfo`, params)
}
// 发货
export async function deliverGoods(params) {
  return OrderModuleApi.post(`/base/deliver/deliverGoods`, params)
}
// 售后申请分页查询
export async function getReturnsApply (params) {
  return OrderModuleApi.post(`/postsale/orderReturnsApply/getByPage`, params)
}
// 售后处理
export async function handleApply (params) {
  return OrderModuleApi.post(`/postsale/orderReturnsApply/handleApply`, params)
}
// 分页获取买家秀
export async function getBuyerShowByPage (params) {
  return UserModuleApi.get(`/show/userBuyingShow/getByPage`, params)
}
// 获取买家秀详情
export async function getBuyerShowById (params) {
  return UserModuleApi.get(`/show/userBuyingShow/getById`, params)
}
// 审核买家秀
export async function buyerShowApproval (params) {
  return UserModuleApi.post(`/show/userBuyingShow/approval`, params)
}

export async function downloadFileByBlobURL(url, filename) {
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = url;
  tempLink.setAttribute('download', filename);
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }

  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(url);
}
// 下载二维码图片
export async function downLoadFile(url,data={},filename = 'download') {
  return axios({
    url: `${BaseUrl}/${url}`,
    method: 'get',
    responseType: 'blob',
    withCredentials:true,
    params:data,
  }).then(res => {
    console.log(res)
    const data = res.data;
    const blob = new Blob([data], { type: data.type || 'application/octet-stream' });
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
      window.navigator.msSaveBlob(blob, filename);
    } else {
      const blobURL = window.URL.createObjectURL(blob);
      downloadFileByBlobURL(blobURL, filename);
    }
  })
}
