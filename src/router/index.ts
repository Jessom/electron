import { createRouter, createWebHashHistory } from "vue-router"

import BasicLayout from "../layout/basiclayout.vue"

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [{
    path: "/",
    component: BasicLayout,
    redirect: "/dashboard",
    children: [{
      path: "/dashboard",
      name: "仪表盘",
      component: () => import("../pages/dashboard/index.vue"),
      meta: {}
    }, {
      path: "/mine/setting",
      name: "设置中心",
      component: () => import("../pages/mine/setting/index.vue")
    }]
  }, {
    path: "/login",
    name: "登录",
    component: () => import("../pages/mine/login/index.vue")
  }]
})

router.beforeEach((to, from, next) => {
  next()
})
