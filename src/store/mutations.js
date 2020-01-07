import * as types from './mutation-types'

/**
 *  根级别的 Mutation
 */
export default {
  [types.SET_TOKEN] (state, { value, expires } = {}) {
    state.token = {
      value: value || undefined,
      expires: expires || undefined
    }
  },

  [types.DEL_TOKEN] (state) {
    state.token = {
      value: undefined,
      expires: undefined
    }
  },

  [types.SET_OA_TOKEN] (state, token = {}) {
    state.oaToken = token.oaToken || undefined
    state.ssoOaToken = token.ssoOaToken || undefined
  },

  [types.DEL_OA_TOKEN] (state) {
    state.oaToken = undefined
    state.ssoOaToken = undefined
  },

  [types.SET_SSO_CMS_URL] (state, url) {
    state.ssoCmsUrl = url || undefined
  },

  [types.DEL_SSO_CMS_URL] (state) {
    state.ssoCmsUrl = undefined
  }
}
