import {
  LOOKUP_EMPLOYEE_COUNTRIES,
  LOOKUP_EMPLOYEE_DIVISIONS,
  LOOKUP_EMPLOYEE_SUB_GROUPS,
  LOOKUP_EMPLOYEE_PROFILES,
  GET_STATISTIC
} from '../constant/api'
import { generateAuthenticatedFetch as authFetch } from '../helpers/asyncHelper'
import { map } from 'lodash'

/**
 * Get options data
 */
export const getCountries = () => authFetch().get(LOOKUP_EMPLOYEE_COUNTRIES)
  .then(result => map(result.data, item => ({ label: item, value: item })))
export const getDivisions = () => authFetch().get(LOOKUP_EMPLOYEE_DIVISIONS)
  .then(result => map(result.data, item => ({ label: item, value: item })))
export const getSubGroups = () => authFetch().get(LOOKUP_EMPLOYEE_SUB_GROUPS)
  .then(result => map(result.data, item => ({ label: item, value: item })))
export const getProfiles = () => authFetch().get(LOOKUP_EMPLOYEE_PROFILES)
  .then(result => map(result.data, item => ({ label: item, value: item })))

/**
 * Get Statistic
 * @param {Object} payload - statistic
 */
export const getStatistic = (payload) => authFetch().get(GET_STATISTIC, { params: payload })
