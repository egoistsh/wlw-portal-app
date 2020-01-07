import axios from 'axios'
import store from '../store/index'
import {
  DEL_MSS_TODO_LIST,
  DEL_OA_TODO_LIST,
  DEL_OA_TOKEN,
  DEL_SSO_CMS_URL,
  DEL_TOKEN,
  DEL_USER_INFO
} from '../store/mutation-types'
import { ApiResultCodes } from '../consts/app'
import vuecookies from 'vue-cookies'
import x2js from 'x2js'

axios.defaults.headers.common['Authentication-Token'] = vuecookies.get('WLWPORTALTOKEN')

// http request 拦截器
axios.interceptors.request.use(function (config) {
  if (vuecookies.get('WLWPORTALTOKEN') !== undefined && vuecookies.get('WLWPORTALTOKEN') !== null && vuecookies.get('WLWPORTALTOKEN') !== '' && vuecookies.get('WLWPORTALTOKEN') !== '""') {
    config.headers.common['Authentication-Token'] = vuecookies.get('WLWPORTALTOKEN')
  }

  if (store.state.user.userInfo) {
    config.headers.common.UserId = store.state.user.userInfo.userId
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// http response 拦截器
axios.interceptors.response.use(function (response) {
    let code = ''
    // console.log(response.request.responseURL)
    // console.log(response)
    // console.log(response.data)

    /*
    JSON.parse(row.selections)
      console.log(response.request.responseURL)
      console.log(response.data)
      console.log(typeof (response.data))
     */
    if (typeof (response.data) === 'string') {
      if (response.data.indexOf('?xml version') !== -1) {
        const a = new x2js() // eslint-disable-line
        response.data = a.xml2js(response.data)
        // console.log(response.data.RESPONSE.RESULT)
      } else if (response.data.indexOf('fun(') !== -1) {
        let txtdata = response.data.substr(response.data.indexOf('fun(') + 4, response.data.length)
        txtdata = txtdata.substr(0, txtdata.lastIndexOf(')'))
        response.data = JSON.parse(txtdata)
      }
    }

    if (response.data.code !== null && response.data.code !== undefined) {
      code = response.data.code
    } else if (response.data.errcode !== null && response.data.errcode !== undefined) {
      code = `${response.data.errcode}`
    } else if (response.data.RESPONSE !== null && response.data.RESPONSE !== undefined && response.data.RESPONSE.RESULT !== null && response.data.RESPONSE.RESULT !== undefined) {
      if (response.data.RESPONSE.RESULT === '1') {
        code = '0'
      }
    } else if (response.data.count !== null && response.data.count !== undefined) {
      code = '0'
    } else if (response.data.workflow !== null && response.data.workflow !== undefined) {
      code = '0'
    }
    // console.log('code+' + typeof (code) + '==' + code)
    const tokenError = code !== undefined && (code === ApiResultCodes.JWT_ERRCODE_EXPIRE || code === ApiResultCodes.JWT_ERRCODE_FAIL || code === ApiResultCodes.TOKEN_NULL)
    if (tokenError === true) {
      store.commit(DEL_TOKEN)
      store.commit(DEL_USER_INFO)
      store.commit(DEL_OA_TOKEN)
      store.commit(DEL_SSO_CMS_URL)
      store.commit(DEL_OA_TODO_LIST)
      store.commit(DEL_MSS_TODO_LIST)
      /* index.replace({
        name: 'login'
      }) */
      return Promise.reject(response.data)
    } else {
      if (code === ApiResultCodes.SUCCESS || response.config.responseType === 'arraybuffer'
        || response.config.responseType === 'blob') {
        return response
      } else {
        // 统一输出接口返回的错误信息，业务组件无需再输出
        console.error('API Error: %o', response.data)
        return Promise.reject(response.data)
      }
    }
  },

  function (error) {
    // 统一输出错误信息
    console.error('Error: %o', error)
    return Promise.reject(error)
  }
)
