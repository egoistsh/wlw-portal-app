import Vue from 'vue'
import VueRouter from 'vue-router'
import identity from './modules/identity'
import article from './modules/article'
import { RESTORE_STATE_FROM_CACHE } from '../store/action-types'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '首页',
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    component: () => import('../views/app/Home.vue')
  },
  ...identity,
  ...article
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const store = router.app.$options.store
  // 页面刷新的时候通过缓存恢复 state
  // eslint-disable-next-line no-undef
  store.dispatch(RESTORE_STATE_FROM_CACHE)
  if (to.meta.requireAuth) {
    // console.log(router.app.$options.store)
    // 从 Vuex state 读取 token，token 设置了有效时间，如果失效就超时
    const state = router.app.$options.store.state
    if (state && state.token.value) {
      next()
    } else {
      next({
        name: 'login',
        params: { historyAddress: window.location.href }
      })
    }
  } else {
    next()
  }
})

export default router
