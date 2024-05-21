import axios from 'axios'

const api = axios.create({
  baseURL: 'https://eventpass-api.azurewebsites.net/api/',
})

export default api
