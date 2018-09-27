import { BASE_URL } from '../constant/api'
import axios from 'axios'
import { getAuthToken } from '../services/Authentication'

const baseConfig = {
  baseURL: BASE_URL,
  timeout: 2000
}
export const fetch = axios.create(baseConfig)

export const generateAuthenticatedFetch = (sendFile = null) => {
  const token = getAuthToken()
  // Check if file upload or normal request, if file upload we need to add extra special header
  if (sendFile) {
    return axios.create({
      ...baseConfig,
      headers: {
        'Authorization': `Bearer ${token}`,
        'content-type': 'multipart/form-data'
      }
    })
  }
  return axios.create({
    ...baseConfig,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
