import axios from 'axios'

const baseUrl = import.meta.env.VITE_API_URL

const httpClient = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
})

httpClient.interceptors.request.use((config) => {
  return config
})

export { httpClient }
