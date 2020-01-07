import axios from 'axios'

function listGroupNotice (params) {
  const url = '/api/info/listGroupNotice.do'
  return axios.get(url, { params })
}

function listGroupNews (params) {
  const url = '/api/info/listGroupNews.do'
  return axios.get(url, { params })
}

function listGroupInfo (params) {
  const url = '/api/info/listGroupInfo.do'
  return axios.get(url, { params })
}

function listWlwNews (params) {
  const url = '/api/info/listWlwNews.do'
  return axios.get(url, { params })
}

function listWlwMediaInfo (params) {
  const url = '/api/info/listWlwMediaInfo.do'
  return axios.get(url, { params })
}

function listWlwIntergrityPublicityInfo (params) {
  const url = '/api/info/listWlwIntergrityPublicityInfo.do'
  return axios.get(url, { params })
}

function listWlwNotice (params) {
  const url = '/api/info/listWlwNotice.do'
  return axios.get(url, { params })
}

function listWlwPhotoNews (params) {
  const url = '/api/info/listWlwPhotoNews.do'
  return axios.get(url, { params })
}

function getWlwInfoDetail (params) {
  const url = '/api/info/getWlwInfoDetail.do'
  return axios.get(url, { params })
}

export {
  listGroupNotice,
  listGroupNews,
  listGroupInfo,
  listWlwNews,
  listWlwMediaInfo,
  listWlwIntergrityPublicityInfo,
  listWlwNotice,
  listWlwPhotoNews,
  getWlwInfoDetail
}
