/**
 * 根级别的 Action 事件类型，使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
 */
// ***** 全局 Action 事件类型 *****
// 初始化 state 及其缓存
export const INIT_STATE_AND_CACHE = 'clearCache'
// 从缓存恢复 state
export const RESTORE_STATE_FROM_CACHE = 'restoreStateFromCache'
export const LOGIN = 'login'
export const LOGIN_BY_LOGIN_ID = 'loginByLoginId'
export const GET_OA_TOKEN = 'getOaToken'
export const GET_SSO_CMS_URL = 'getSsoCmsUrl'

// ***** 用户模块 Action 事件类型 *****
export const GET_USER_INFO_SYNC = 'getUserInfoSync'

// ***** 菜单模块 Action 事件类型 *****
export const LIST_USER_TOP_NAV_MENUS = 'listUserTopNavMenus'
export const LIST_USER_NAV_MENUS = 'listUserNavMenus'

// ***** 页面区块 Action 事件类型 *****
export const LIST_PAGE_BLOCKS = 'listPageBlocks'
