import axios from 'axios'

function listGroupEmail (params) {
  const url = '/api/email/listGroupEmail.do'
  return axios.get(url, { params })
}

function getGroupEmailSsoUrl () {
  const url = '/api/email/getGroupEmailSsoUrl.do'
  return axios.get(url)
}

function getGroupEmailDetailsSsoUrl (params) {
  const url = '/api/email/getGroupEmailDetailsSsoUrl.do'
  return axios.get(url, { params })
}

export {
  listGroupEmail,
  getGroupEmailSsoUrl,
  getGroupEmailDetailsSsoUrl
}
