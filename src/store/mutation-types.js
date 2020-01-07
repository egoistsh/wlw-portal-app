/**
 * 根级别的 Mutation 事件类型，使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
 */
// ***** 全局 Mutation 事件类型 *****
export const SET_TOKEN = 'SET_TOKEN'
export const DEL_TOKEN = 'DEL_TOKEN'
export const SET_OA_TOKEN = 'SET_OA_TOKEN'
export const DEL_OA_TOKEN = 'DEL_OA_TOKEN'
export const SET_SSO_CMS_URL = 'SET_SSO_CMS_URL'
export const DEL_SSO_CMS_URL = 'DEL_SSO_CMS_URL'

// ***** 用户模块 Mutation 事件类型 *****
export const SET_USER_INFO = 'SET_USER_INFO'
export const DEL_USER_INFO = 'DEL_USER_INFO'

// ***** 页签模块 Mutation 事件类型 *****
export const SET_HASH = 'SET_HASH'
export const SET_HOME_TAB = 'SET_HOME_TAB'
export const RESHOW_HASH = 'RESHOW_HASH'
export const SET_CURRENT_TAB_INDEX = 'SET_CURRENT_TAB_INDEX'
export const OPENED_TABS_PUSH = 'OPENED_TABS_PUSH'
export const OPENED_SUB_TABS_PUSH = 'OPENED_SUB_TABS_PUSH'
export const OPENED_SUB_TABS_BACK = 'OPENED_SUB_TABS_BACK'
export const OPENED_SUB_TABS_REPLACE = 'OPEN_SUB_TABS_REPLACE'
export const OPENED_TABS_REMOVE = 'OPENED_TABS_REMOVE'
export const CLOSE_OTHER_TABS = 'CLOSE_OTHER_TABS'
export const CLOSE_ALL_TABS = 'CLOSE_ALL_TABS'

//* *********待办模块 Mutation 事件类型************
export const SET_OA_TODO_LIST = 'SET_OA_TODO_LIST'
export const DEL_OA_TODO_LIST = 'DEL_OA_TODO_LIST'

export const SET_MSS_TODO_LIST = 'SET_MSS_TODO_LIST'
export const DEL_MSS_TODO_LIST = 'DEL_MSS_TODO_LIST'

export const SET_OTHER_TODO_LIST = 'SET_OTHER_TODO_LIST'
export const DEL_OTHER_TODO_LIST = 'DEL_OTHER_TODO_LIST'

//* *********待阅模块 Mutation 事件类型************
export const SET_OA_TO_READ_LIST = 'SET_OA_TO_READ_LIST'
export const DEL_OA_TO_READ_LIST = 'DEL_OA_TO_READ_LIST'

//* *********信息模块 Mutation 事件类型************
export const SET_INFO_LIST = 'SET_INFO_LIST'
export const DEL_INFO_LIST = 'DEL_INFO_LIST'
