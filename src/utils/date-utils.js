import moment from 'moment'

/**
 * 日期工具方法集
 */
export default {
  /**
   * 转换为开始时间字符串
   *
   * @param {Date} dateTime 日期时间
   */
  toStartTimeStr (dateTime) {
    if (dateTime) {
      return `${moment(dateTime).format('YYYY-MM-DD')} 00:00:00`
    }
    return undefined
  },

  /**
   * 转换成结束时间字符串
   *
   * @param {Date} dateTime 日期时间
   */
  toEndTimeStr (dateTime) {
    if (dateTime) {
      return `${moment(dateTime).format('YYYY-MM-DD')} 23:59:59`
    }
    return undefined
  }
}
