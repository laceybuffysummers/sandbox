import { SEARCH_EMP_COMPETENCY, SET_EMPLOYEE_COMPETENCY_COMPLETED, UPLOAD_EMP_COMPETENCY, GET_COMPLETED_ACTIVITIES, SAVE_EMPLOYEE_ACTIVITY, UPDATE_EMPLOYEE_ACTIVITY } from '../constant/api'
import { generateAuthenticatedFetch as authFetch } from '../helpers/asyncHelper'

/**
 * Search Employee Competency
 * @param {Object} payload - Search payload
 */
export const getEmployeeCompetency = (payload) => {
  return authFetch().get(SEARCH_EMP_COMPETENCY(payload.compId, payload.subCompId))
}

/**
 * Set Employee Competency completed
 * @param { String } employeeId the Employee ID
 * @param { Object } payload the payload
 */
export const setEmployeeCompetencyCompleted = (employeeId, payload) => {
  return authFetch().put(SET_EMPLOYEE_COMPETENCY_COMPLETED(employeeId), payload)
}

/**
 * Upload Employee from file
 * @param {Object} payload - Competnce details
 */
export const uploadEmployeeCompetency = (payload) => {
  const formData = new FormData() // eslint-disable-line
  formData.append('file', payload.file)
  return authFetch(true).post(UPLOAD_EMP_COMPETENCY, formData)
}

/**
 * Get completed activities of an Employee
 * @param {Object} payload - Employee EID
 */
export const getCompletedActivities = (payload) => {
  return authFetch().get(GET_COMPLETED_ACTIVITIES(payload))
}

/**
 * Save activity as incomplete for an Employee
 * @param {Object} employeeEID - Employee EID
 * @param {Object} payload - Object containing activityId
 */
export const saveCompletedActivities = (employeeEID, payload) => {
  return authFetch().post(GET_COMPLETED_ACTIVITIES(employeeEID), payload)
}

/**
 * Save activity as complete for an Employee
 * @param {Object} employeeEID - Employee EID
 * @param {Object} payload - Object containing activityId
 */
export const updateCompletedActivities = (employeeEID, payload) => {
  return authFetch().put(GET_COMPLETED_ACTIVITIES(employeeEID), payload)
}

/**
 * Associate an employee to an activity
 * @param {Object} payload - Employee EID
 */
export const setEmployeeActivity = (employeeEID, payload) => {
  return authFetch().post(SAVE_EMPLOYEE_ACTIVITY(employeeEID), payload)
}

/**
 * Update Association of an employee to an activity
 * @param {Object} payload - Employee EID
 */
export const updateEmployeeActivity = (employeeEID, subCompId, payload) => {
  return authFetch().put(UPDATE_EMPLOYEE_ACTIVITY(employeeEID, subCompId), payload)
}
