/**
 * 系统全局常量
 */

/**
 * API返回码
 */
export const ApiResultCodes = {
  SUCCESS: '0',
  ERROR: '-1',
  UNKNOWN_ERROR: '1000',

  /**
   * 验证模块
   */
  TOKEN_NULL: '2001', // TOKEN为空
  USER_NULL: '2002', // 用户和密码输入错误 前后端
  USER_INIT_LOGIN: '2003', // 用户初次登录需强制修改密码  前后端
  PASSWORD_ABOUT_TO_EXPIRE: '2004', // 密码即将超时  前后端
  PASSWORD_EXPIRE: '2005', // 密码过期 前后端
  PASSWORD_IS_INITIALIZE: '2006', // 密码为初始化密码需强制修改密码  前后端
  LOGIN_FAIL_WIRITER_EXCESS: '2007', // 输入密码错误超过限定次数，请等待后在登陆  前后端
  JWT_ERR_CODE_FAIL: '2007', // JWT签名错误  前后端

  /**
   * 用户模块
   */
  OLD_PASSWORD_FAIL_CODE: '3001',
  NEW_PASSWORD_FAIL_CODE: '3002',
  PARAMS_VERIFICATION_FAIL_CODE: '3003',
  FORCE_UPDATE_PASSWORD: '3004',
  USER_NOT_EXIST: '3005',
  NICKNAME_ALREADY_EXIST: '3006',

  /**
   * 文章模块
   */
  NO_CONTRIBUTE_POWER: '9001', // 栏目没有投稿权限，不能修改或删除
  IS_AUDITING: '9002', // 正在审核，不能修改或删除

  /**
   * 评论模块
   */
  NO_POWER: '10001', // 没有权限操作
  HAS_REPLY: '10002', // 有回复的评论不能删除

  /**
   * 短信模块
   */
  CAN_NOT_FOUND_USER: '13001', // 系统找不到该手机的用户 前后端
  SMS_CAN_NOT_FOUND: '13002', // 系统找不到该短信  前后端
  SMS_OVERTIME: '13003', // 短信超时  前后端
  SMS_TOO_FAST: '13005', // 系统找不到该手机的用户 前后端
  SMS_QUEEN_ERROR: '13006', // 组装短信队列报错
  MOBILE_HAS_REGISTER: '13008' // 系统已有用户使用了该手机号码
}

/**
 * 分页
 */
export const Pagination = {
  PAGE_INDEX: 1,
  PAGE_SIZE: 10
}

/**
 * 应用级别的消息
 */
export const Message = {
  LOADING: '加载中...',
  EMPTY: '暂无数据',
  ERROR: '出错啦，请稍后重试！',
  UNKNOWN_ERROR: '未知错误'
}

/**
 * 加载状态
 */
export const LOADING_STATUS = {
  GET_DATA_SUCCESS: '0', // 获取数据，关闭loading
  GET_DATA_BEFORE: '1', // 开始获取数据，显示loading
  GET_DATA_FAILSURE: '3' // 开始获取数据，关闭loading
}

/**
 * 缓存键
 */
export const CacheKey = {
  TOKEN: 'token',
  OA_TOKEN: 'oaToken',
  SSO_CMS_URL: 'ssoCmsUrl'
}

/**
 * 通知标题
 */
export const NotificationTitles = {
  REQUEST_API_ERROR: '请求API错误'
}
