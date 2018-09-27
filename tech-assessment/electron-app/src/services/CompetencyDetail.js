import { SEARCH_COMPETENCY_DETAIL, GET_ACTIVITY, SAVE_ACTIVITY, UPDATE_ACTIVITY, SAVE_COMPETENCY, UPDATE_COMPETENCY, SAVE_SUB_COMPETENCY, UPDATE_SUB_COMPETENCY, SAVE_LEVEL, UPDATE_LEVEL } from '../constant/api'
import { generateAuthenticatedFetch as authFetch, fetch } from '../helpers/asyncHelper'

/**
 * Search Competency Detail
 * @param {Object} payload - Search payload
 */
export const getCompetencyDetail = (payload) => fetch.get(SEARCH_COMPETENCY_DETAIL, { params: payload })
/**
 * Get Activity
 * @param payload
 * @returns {*}
 */
export const getActivity = (payload) => fetch.get(GET_ACTIVITY, payload)
/**
 * Save Activity
 * @param payload - activity payload
 * @returns {Object} - Saved Activity
 */
export const saveActivity = (compId, subCompId, levelId, payload) => authFetch().post(SAVE_ACTIVITY(compId, subCompId, levelId), payload)
/**
 * Save competency
 * @param payload - competency payload
 * @returns {Object} - saved competency
 */
export const saveCompetency = (payload) => {
  authFetch().post(SAVE_COMPETENCY, payload)
}

/**
 * Update competency
 * @param payload - competency payload
 * @returns {Object} - saved competency
 */
export const updateCompetency = (compId, payload) => {
  authFetch().put(UPDATE_COMPETENCY(compId), payload)
}

/**
 * Save Sub competency
 * @param payload - sub competency payload
 * @returns {Object} - saved sub competency
 */
export const saveSubCompetency = (compId, payload) => authFetch().post(SAVE_SUB_COMPETENCY(compId), payload)

/**
 * Update Sub competency
 * @param payload - sub competency payload
 * @returns {Object} - saved sub competency
 */
export const updateSubCompetency = (compId, subCompId, payload) => authFetch().put(UPDATE_SUB_COMPETENCY(compId, subCompId), payload)

/**
 * Save Level of particular sub competency
 * @param payload - level payload
 * @returns {Object} - saved level
 */
export const saveLevel = (compId, subCompId, payload) => authFetch().post(SAVE_LEVEL(compId, subCompId), payload)

/**
 * Update Level of particular sub competency
 * @param payload -level payload
 * @returns {Object} - saved level
 */
export const updateLevel = (compId, subCompId, levelId, payload) => authFetch().put(UPDATE_LEVEL(compId, subCompId, levelId), payload)

/**
 * update Activity
 * @param payload - sub Activity
 * @returns {Object} - saved Activity
 */
export const updateActivity = (compId, subCompId, levelId, activityId, payload) => authFetch().put(UPDATE_ACTIVITY(compId, subCompId, levelId, activityId), payload)
