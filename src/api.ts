import axios from 'axios'

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_FUNCTIONS_API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

export default httpClient
