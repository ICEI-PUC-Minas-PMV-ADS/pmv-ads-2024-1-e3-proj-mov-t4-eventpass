import axios from 'axios'

const api = axios.create({
  baseURL: 'https://eventpassapi.azurewebsites.net/api/',
})

export default api
