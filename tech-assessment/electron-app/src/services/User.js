import { SEARCH_USER, GET_USER, SAVE_USER, UPDATE_USER } from '../constant/api'
import { generateAuthenticatedFetch as authFetch } from '../helpers/asyncHelper'

/**
 * Search User
 * @param {Object} payload - Search payload
 */
export const searchUsers = (payload) => {
  return authFetch().get(SEARCH_USER, {params: {...payload}})
}

/**
 * Get user by ID
 * @param {String} payload - User ID
 */
export const getUser = (payload) => {
  const url = GET_USER.replace('{EID}', payload)
  return authFetch().get(url)
}

/**
 * Save User
 * @param {Object} payload - User Detail
 */
export const saveUser = (payload) => {
  return authFetch().post(SAVE_USER, payload)
}

/**
 * Update User
 * @param {Object} payload - User Detail
 */
export const updateUser = (payload) => {
  const url = UPDATE_USER.replace('{EID}', payload.EID)
  if (payload.password === '') {
    delete payload.password
  }
  delete payload.EID
  return authFetch().put(url, payload)
}
