import axios from 'axios'

function getUserInfo (params) {
  const url = '/api/user/getUserInfo.do'
  return axios.get(url, { params })
}

function getEncodedUserName () {
  const url = '/api/user/getEncodedUserName.do'
  return axios.get(url)
}

export {
  getUserInfo,
  getEncodedUserName
}
