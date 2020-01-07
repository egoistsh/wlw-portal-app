import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

import menu from './module/menu'
import user from './module/user'

Vue.use(Vuex)
const state = {
  // 登录Token
  token: {
    value: undefined,
    // 登录过期时间
    expires: undefined
  },
  // 单点OA的Token
  oaToken: undefined,
  ssoOaToken: undefined,
  // 单点信息管理系统URL
  ssoCmsUrl: undefined
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    menu,
    user
  },
  strict: debug
})
