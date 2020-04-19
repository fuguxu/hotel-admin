// import Vue from 'vue'
import VueRouter from 'vue-router'
import app from '../pages/App/app.vue'
console.log(app)
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
        redirect: '/h/data',
        component: (resolve) => { require(['../pages/Portal/main.vue'], resolve) },
        name: 'protal',
        children: [
          {
            path: '/h/data',
            redirect: '/h/month_sale',
            component: (resolve) => { require(['../pages/Data/main.vue'], resolve) },
            name: '数据统计分析',
            meta: setMeta(),
            children: [
              {
                path: '/h/month_sale',
                component: (resolve) => { require(['../pages/MonthSale/main.vue'], resolve) },
                name: '月度销量',
                meta: setMeta()
              },
              {
                path: '/h/year_sale',
                component: (resolve) => { require(['../pages/YearSale/main.vue'], resolve) },
                name: '年度销量',
                meta: setMeta()
              }
            ]
          },
          {
            path: '/h/order',
            component: (resolve) => { require(['../pages/Order/main.vue'], resolve) },
            name: '订单管理',
            meta: setMeta()
          },

          {
            path: '/h/show',
            component: (resolve) => { require(['../pages/Show/main.vue'], resolve) },
            name: '买家秀管理',
            meta: setMeta()
          }
        ]
      }
    ]
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
