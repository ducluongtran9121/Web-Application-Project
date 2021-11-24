import axios from 'axios'
import { TokenStorage } from '../helpers'
import Constants from '../constants'
import type { AxiosError } from 'axios'
import type { RefreshSessionPayLoad, ErrorResponsePayload } from '../models/payload'

const axiosInstance = axios.create({
  baseURL: Constants.Api.Base
})

axiosInstance.interceptors.request.use((request) => {
  const accessToken = TokenStorage.getToken('access')
  if (request.headers) request.headers['Authorization'] = `Bearer ${accessToken}`
  return request
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error: AxiosError<ErrorResponsePayload>) => {
    // Not token expired error then reject
    if (
      error.response?.status !== 401 ||
      error.config.url === Constants.Api.RefreshToken ||
      error.response?.data.detail === Constants.Error.NoActiveAccount
    ) {
      return new Promise((_, reject) => reject(error))
    }

    try {
      // Get new access token
      const refreshToken = TokenStorage.getToken('refresh')
      const { data } = await axios.post<RefreshSessionPayLoad>(`${Constants.Api.Base}${Constants.Api.RefreshToken}`, { refresh: refreshToken })

      TokenStorage.storeToken('access', data.access)

      // Resend request
      const config = error.config
      if (config.headers) config.headers['Authorization'] = `Bearer ${data.access}`

      return new Promise((resolve, reject) => {
        axios
          .request(config)
          .then((response) => resolve(response))
          .catch((error) => reject(error))
      })
    } catch (error) {
      Promise.reject(error)
    }
  }
)

export { axiosInstance }
