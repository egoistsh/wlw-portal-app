import Cache from '../../utils/cache'

import { CacheKey } from '../../consts/user'
import { getUserInfo } from '../../api/user'

import { SET_USER_INFO, DEL_USER_INFO } from '../mutation-types'
import { GET_USER_INFO_SYNC } from '../action-types'

const state = {
  // 用户信息
  userInfo: undefined
}

const getters = {}

const mutations = {
  [SET_USER_INFO] (state, userInfo) {
    state.userInfo = userInfo || undefined
  },

  [DEL_USER_INFO] (state) {
    state.userInfo = undefined
  }
}

const actions = {
  async [GET_USER_INFO_SYNC] ({ commit, rootState }, params) {
   const userInfo = await getUserInfo(params).then((resp) => {
      const userInfo = resp.data.data
      commit(SET_USER_INFO, userInfo)
      Cache.set(CacheKey.USER_INFO, userInfo, { expires: rootState.token.expires })
      return resp
    })
    return userInfo
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
