import Vue from 'vue'
import VueRouter from 'vue-router'
import app from '@/pages/App/app.vue'
Vue.use(VueRouter)
const setMeta = (leftMuen = true, muenIndex = 0) => ({ leftMuen, muenIndex })
const routesMap = [
  {
    path: '/',
    component: app,
    redirect: '/h',
    name: 'sys',
    children: [
      {
        path: '/h',
        redirect: '/h/product_manage',
        component: (resolve) => { require(['@/pages/Portal/main.vue'], resolve) },
        name: 'protal',
        children: [
          // {
          //   path: '/h/data',
          //   // redirect: '/h/month_sale',
          //   component: (resolve) => { require(['@/pages/Data/main.vue'], resolve) },
          //   name: '数据统计分析',
          //   meta: setMeta()
          // },
          // {
          //   path: '/h/order',
          //   component: (resolve) => { require(['@/pages/Order/main.vue'], resolve) },
          //   name: '订单管理',
          //   meta: setMeta()
          // },
          // {
          //   path: '/h/show',
          //   component: (resolve) => { require(['@/pages/Show/main.vue'], resolve) },
          //   name: '买家秀管理',
          //   meta: setMeta()
          // },
          {
            path: '/h/config',
            component: (resolve) => { require(['@/pages/ConfigManage/main.vue'], resolve) },
            name: '配置管理',
            meta: setMeta(),
            children: [
              {
                path: '/h/product_category',
                component: (resolve) => { require(['@/pages/ConfigManage/ProductCategory/main.vue'], resolve) },
                name: '产品分类',
                meta: setMeta()
              },
              {
                path: '/h/product_brand',
                component: (resolve) => { require(['@/pages/ConfigManage/ProductBrand/main.vue'], resolve) },
                name: '产品品牌',
                meta: setMeta()
              },
              {
                path: '/h/product_brand_detail',
                component: (resolve) => { require(['@/pages/ConfigManage/ProductBrandForm/main.vue'], resolve) },
                name: '品牌表单',
                meta: setMeta(false)
              },
              {
                path: '/h/user_level',
                component: (resolve) => { require(['@/pages/ConfigManage/UserLevel/main.vue'], resolve) },
                name: '用户等级',
                meta: setMeta()
              },
              {
                path: '/h/user_level_detail',
                component: (resolve) => { require(['@/pages/ConfigManage/UserLevelForm/main.vue'], resolve) },
                name: '用户等级表单',
                meta: setMeta(false)
              },
              {
                path: '/h/product_spec',
                component: (resolve) => { require(['@/pages/ConfigManage/ProductSpec/main.vue'], resolve) },
                name: '规格配置',
                meta: setMeta()
              }
            ]
          },
          {
            path: '/h/market',
            component: (resolve) => { require(['@/pages/MarketManage/main.vue'], resolve) },
            name: '营销管理',
            meta: setMeta(),
            children: [
              {
                path: '/h/store',
                component: (resolve) => { require(['@/pages/MarketManage/Store/main.vue'], resolve) },
                name: '店铺管理',
                meta: setMeta()
              },
              {
                path: '/h/store_detail',
                component: (resolve) => { require(['@/pages/MarketManage/StoreForm/main.vue'], resolve) },
                name: '店铺表单',
                meta: setMeta(false)
              },
              {
                path: '/h/product_publish',
                component: (resolve) => { require(['@/pages/MarketManage/ProductPublish/main.vue'], resolve) },
                name: '产品发布',
                meta: setMeta(false)
              },
              {
                path: '/h/product_manage',
                component: (resolve) => { require(['@/pages/MarketManage/ProductManage/main.vue'], resolve) },
                name: '产品管理',
                meta: setMeta()
              },
              {
                path: '/h/product_detail',
                component: (resolve) => { require(['@/pages/MarketManage/ProductForm/main.vue'], resolve) },
                name: '产品配置详情',
                meta: setMeta(false)
              }
            ]
          },
          // {
          //   path: '/h/after_sale',
          //   component: (resolve) => { require(['@/pages/AfterSale/main.vue'], resolve) },
          //   name: '售后管理',
          //   meta: setMeta()
          // },
          // {
          //   path: '/h/distribution',
          //   component: (resolve) => { require(['@/pages/Distribution/main.vue'], resolve) },
          //   name: '分销管理',
          //   meta: setMeta(),
          //   children: [
          //     {
          //       path: '/h/vote',
          //       component: (resolve) => { require(['@/pages/Vote/main.vue'], resolve) },
          //       name: '邀请信息管理',
          //       meta: setMeta()
          //     },
          //     {
          //       path: '/h/distributors',
          //       component: (resolve) => { require(['@/pages/Distributors/main.vue'], resolve) },
          //       name: '分销商管理',
          //       meta: setMeta()
          //     },
          //     {
          //       path: '/h/withdrawal',
          //       component: (resolve) => { require(['@/pages/Withdrawal/main.vue'], resolve) },
          //       name: '提现记录',
          //       meta: setMeta()
          //     }
          //   ]
          // },
          // {
          //   path: '/h/logistics',
          //   component: (resolve) => { require(['@/pages/Logistics/main.vue'], resolve) },
          //   name: '物流管理',
          //   meta: setMeta()
          // },
          // {
          //   path: '/h/user',
          //   component: (resolve) => { require(['@/pages/User/main.vue'], resolve) },
          //   name: '用户设置',
          //   meta: setMeta(),
          //   children: [
          //     {
          //       path: '/h/user_admin',
          //       component: (resolve) => { require(['@/pages/User/UserAdmin/main.vue'], resolve) },
          //       name: '管理员管理',
          //       meta: setMeta()
          //     }
          //   ]
          // },
          {
            path: '/h/set_up',
            component: (resolve) => { require(['@/pages/SetUp/main.vue'], resolve) },
            name: '系统管理',
            meta: setMeta(),
            children: [
              {
                path: '/h/dict',
                component: (resolve) => { require(['@/pages/SetUp/DictManage/main.vue'], resolve) },
                name: '字典配置',
                meta: setMeta()
              },
              {
                path: '/h/dict_detail',
                component: (resolve) => { require(['@/pages/SetUp/DictForm/main.vue'], resolve) },
                name: '字典表单',
                meta: setMeta(false)
              }
            ]
          },
          {
            path: '/h/inventory',
            component: (resolve) => { require(['@/pages/Inventory/main.vue'], resolve) },
            name: '库存管理',
            meta: setMeta()
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    component: (resolve) => { require(['@/pages/Login/main.vue'], resolve) },
    name: 'login'
  }
]

/** 路由配置**/
const router = new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes: routesMap,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router
