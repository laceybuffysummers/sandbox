import { GET_EMPLOYEE, SEARCH_EMPLOYEES, SAVE_EMPLOYEE, UPDATE_EMPLOYEE, LOAD_MATURITY } from '../constant/api'
import { generateAuthenticatedFetch as authFetch } from '../helpers/asyncHelper'

/**
 * Search Employee
 * @param {Object} payload - Search Payload
 */
export const searchEmployee = (payload) => {
  return authFetch().get(SEARCH_EMPLOYEES, { params: { ...payload } })
}

/**
 * Get Employee detail by ID
 * @param {String} payload - Employee ID
 */
export const getEmployee = (payload) => {
  const url = GET_EMPLOYEE.replace('{EID}', payload)
  return authFetch().get(url, payload)
}

/**
 * Save Employee
 * @param {Object} payload - Employee detail
 */
export const saveEmployee = (payload) => {
  return authFetch().post(SAVE_EMPLOYEE, payload)
}

/**
 * Update Employee
 * @param {Object} payload - Employee detail
 */
export const updateEmployee = (payload) => {
  const url = UPDATE_EMPLOYEE.replace('{EID}', payload.EID)
  delete payload.EID
  return authFetch().put(url, payload)
}

/**
 * Load Maturity
 * @param {Object} payload - Employee Details
 */
export const loadMaturity = (compId, subCompId) => {
  return authFetch().get(LOAD_MATURITY(compId, subCompId))
}
