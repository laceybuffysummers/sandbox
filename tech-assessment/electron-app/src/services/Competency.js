import { SEARCH_COMPETENCY, SEARCH_SUB_COMPETENCY, SEARCH_LEVELS, GET_ACTIVITY, UPDATE_LEVEL } from '../constant/api'
import { generateAuthenticatedFetch as authFetch } from '../helpers/asyncHelper'

const LARGE_INT = 1000000

/**
 * Search Competency
 * @param {Object} payload - Search payload
 */
export const getCompetency = (payload) => authFetch().get(SEARCH_COMPETENCY, { params: payload })

/**
 * Search SubCompetency
 * @param {Object} payload - Search payload
 */
export const getSubCompetency = (payload) => authFetch().get(SEARCH_SUB_COMPETENCY(payload), { params: { pageSize: LARGE_INT } })

/**
 * Get Levels
 * @param {Object} payload - Search payload
 */
export const getLevels = (payload) => authFetch().get(SEARCH_LEVELS(payload.compId, payload.subCompId), { params: { pageSize: LARGE_INT } })

/**
 * Get Single Level
 * @param {Object} payload - Search payload
 */
export const getLevel = (payload) => authFetch().get(UPDATE_LEVEL(payload.compId, payload.subCompId, payload.levelId))

/**
 * Get Activities
 * @param {Object} payload - Search payload
 */
export const getActivities = (payload) => authFetch().get(GET_ACTIVITY(payload.compId, payload.subCompId, payload.levelId))
