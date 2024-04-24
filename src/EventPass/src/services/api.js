import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.15.28:5000/',
})

export default api
