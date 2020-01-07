import {
  SET_SYS_NAV_MENUS,
  DEL_SYS_NAV_MENUS,
  SET_SYS_COMMON_MENUS,
  DEL_SYS_COMMON_MENUS,
  SET_CUSTOM_NAV_MENUS,
  DEL_CUSTOM_NAV_MENUS,
  SET_CUSTOM_COMMON_MENUS,
  DEL_CUSTOM_COMMON_MENUS,
  SET_CUSTOM_MENU_EDIT_DIALOG_VISIBLE,
  SET_CUSTOM_MENU_CODE
} from '../mutation-types'
import Cache from '../../utils/cache'
import { CacheKey } from '../../consts/menu'

const state = {
  systemNavigateMenus: undefined,
  systemCommonlyUsedMenus: undefined,
  customNavigateMenus: undefined,
  customCommonlyUsedMenus: undefined,
  customMenuEditDialogVisible: false,
  customMenuCode: ''
}

const getters = {
  systemNavigateMenus: (state) => state.systemNavigateMenus ? state.systemNavigateMenus : Cache.get(CacheKey.SYS_NAV_MENUS),
  systemCommonlyUsedMenus: (state) => state.systemCommonlyUsedMenus ? state.systemCommonlyUsedMenus : Cache.get(CacheKey.SYS_COMMON_MENUS),
  customNavigateMenus: (state) => state.customNavigateMenus ? state.customNavigateMenus : Cache.get(CacheKey.CUSTOM_NAV_MENUS),
  customCommonlyUsedMenus: (state) => state.customCommonlyUsedMenus ? state.customCommonlyUsedMenus : Cache.get(CacheKey.CUSTOM_COMMON_MENUS),
  customMenuEditDialogVisible: (state) => state.customMenuEditDialogVisible,
  customMenuCode: (state) => state.customMenuCode
}

const mutations = {
  [SET_SYS_NAV_MENUS] (state, systemNavigateMenus) {
    state.systemNavigateMenus = systemNavigateMenus
    Cache.set(CacheKey.SYS_NAV_MENUS, systemNavigateMenus)
  },

  [DEL_SYS_NAV_MENUS] (state) {
    state.systemNavigateMenus = undefined
    Cache.remove(CacheKey.SYS_NAV_MENUS)
  },

  [SET_SYS_COMMON_MENUS] (state, systemCommonlyUsedMenus) {
    state.systemCommonlyUsedMenus = systemCommonlyUsedMenus
    Cache.set(CacheKey.SYS_COMMON_MENUS, systemCommonlyUsedMenus)
  },

  [DEL_SYS_COMMON_MENUS] (state) {
    state.systemCommonlyUsedMenus = undefined
    Cache.remove(CacheKey.SYS_COMMON_MENUS)
  },

  [SET_CUSTOM_NAV_MENUS] (state, customNavigateMenus) {
    state.customNavigateMenus = customNavigateMenus
    Cache.set(CacheKey.CUSTOM_NAV_MENUS, customNavigateMenus)
  },

  [DEL_CUSTOM_NAV_MENUS] (state) {
    state.customNavigateMenus = undefined
    Cache.remove(CacheKey.CUSTOM_NAV_MENUS)
  },

  [SET_CUSTOM_COMMON_MENUS] (state, customCommonlyUsedMenus) {
    state.customCommonlyUsedMenus = customCommonlyUsedMenus
    Cache.set(CacheKey.CUSTOM_COMMON_MENUS, customCommonlyUsedMenus)
  },

  [DEL_CUSTOM_COMMON_MENUS] (state) {
    state.customCommonlyUsedMenus = undefined
    Cache.remove(CacheKey.CUSTOM_COMMON_MENUS)
  },

  [SET_CUSTOM_MENU_EDIT_DIALOG_VISIBLE] (state, visible) {
    state.customMenuEditDialogVisible = visible
  },

  [SET_CUSTOM_MENU_CODE] (state, code) {
    state.customMenuCode = code
  }
}

export default {
  state,
  getters,
  mutations
}
