import { login } from '../api/identity'

import {
  SET_TOKEN,
  DEL_TOKEN,
  SET_USER_INFO,
  DEL_USER_INFO, DEL_OA_TODO_LIST, DEL_MSS_TODO_LIST, DEL_OTHER_TODO_LIST, DEL_OA_TO_READ_LIST, DEL_INFO_LIST
} from './mutation-types'
import { INIT_STATE_AND_CACHE, RESTORE_STATE_FROM_CACHE, LOGIN } from './action-types'
import Cache from '../utils/cache'
import { CacheKey as AppCacheKey } from '../consts/app'
import { CacheKey as UserCacheKey } from '../consts/user'

export default {
  [INIT_STATE_AND_CACHE] ({ commit }) {
    Cache.clear()
    /*commit(DEL_TOKEN)
    commit(DEL_USER_INFO)
    commit(DEL_OA_TODO_LIST)
    commit(DEL_MSS_TODO_LIST)
    commit(DEL_OTHER_TODO_LIST)
    commit(DEL_OA_TO_READ_LIST)
    commit(DEL_INFO_LIST)*/
  },

  [RESTORE_STATE_FROM_CACHE] ({ commit }) {
    // console.log("==RESTORE_STATE_FROM_CACHE==")
    commit(SET_TOKEN, Cache.get(AppCacheKey.TOKEN))
    // TODO 不直接修改而是调用模块各自的恢复函数
    commit(SET_USER_INFO, Cache.get(UserCacheKey.USER_INFO))
  },

  async [LOGIN] ({ commit, dispatch }, params) {
    // 清除 Web Storage，防止上次退出系统后遗留的缓存数据
    localStorage.clear()
    sessionStorage.clear()

    await dispatch(INIT_STATE_AND_CACHE)

    const logon = await login(params).then((resp) => {
      const data = resp.data.data
      if (data.token || data.tokenExpired) {
        const token = {
          value: data.token || undefined,
          expires: data.tokenExpired || undefined
        }
        commit(SET_TOKEN, token)
        Cache.set(AppCacheKey.TOKEN, token, { expires: token.expires })
      }
      return resp
    })
    return logon
  }
}
