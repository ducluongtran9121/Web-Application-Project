import axios from 'axios'

const baseUrl = process.env.REACT_APP_API_URL

const httpClient = axios.create({
  baseURL: baseUrl,
  withCredentials: false,
})

export { httpClient }
