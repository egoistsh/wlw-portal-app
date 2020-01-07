import axios from 'axios'
import { JSEncrypt } from 'jsencrypt'
import key from '../../public/key/publickey'

/**
 * 用户账号密码登录
 * @param {Object} params 参数对象
 * @return {AxiosPromise<any>} AxiosPromise对象
 */
function login (params) {
  const url = '/api/identity/login.do'
  const jse = new JSEncrypt()
  const publicKey = key.publicKey
  jse.setPublicKey(publicKey)
  params.password = jse.encrypt(params.password)
  return axios.get(url, { params })
}

/**
 * 登出系统
 * @param {Object} params 参数对象
 * @return {AxiosPromise<any>} AxiosPromise对象
 */
function logout (params) {
  const url = '/api/identity/logout.do'
  return axios.get(url, { params })
}

function setMssCookiet () {
  const url = '/api/identity/setMssCookie.do'
  return axios.get(url)
}

export {
  login,
  logout,
  setMssCookiet
}
