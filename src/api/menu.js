import axios from 'axios'

function listMenu () {
  const url = '/api/menu/listMenu.do'
  return axios.get(url)
}

export {
  listMenu
}
