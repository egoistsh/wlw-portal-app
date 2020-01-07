import axios from 'axios'

function listMssSystem () {
  const url = '/api/appSystem/listMssSystem.do'
  return axios.get(url)
}

export {
  listMssSystem
}
