import { LOGIN } from '../constant/api'
import { fetch } from '../helpers/asyncHelper'

/**
 * Login User
 * @param {Object} payload - Login details
 */
export const login = (payload) => fetch.post(LOGIN, payload)

/**
 * Persists auth token
 * @param {string} payload - Token
 */
export const setAuthToken = (payload) => window.localStorage.setItem('token', payload)

/**
 * Fetch auth token from storage
 */
export const getAuthToken = () => window.localStorage.getItem('token')

/**
 * Remove auth token from storage
 */
export const removeAuthToken = () => window.localStorage.removeItem('token')
