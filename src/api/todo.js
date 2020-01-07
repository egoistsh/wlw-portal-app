import axios from 'axios'

function listOaTodo (params) {
  const url = '/api/todo/listOaTodo.do'
  return axios.get(url, { params })
}

function listOaToread (params) {
  const url = '/api/todo/listOaToread.do'
  return axios.get(url, { params })
}

function listMssTodo (params) {
  const url = '/api/todo/listMssTodo.do'
  return axios.get(url, { params })
}

export {
  listOaTodo,
  listOaToread,
  listMssTodo
}
