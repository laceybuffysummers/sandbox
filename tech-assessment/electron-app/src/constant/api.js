export const BASE_URL = 'https://techassessment-api-dev.herokuapp.com/api/v1'
export const LOGIN = '/login'
// User
export const SEARCH_USER = '/users'
export const GET_USER = '/users/{EID}'
export const SAVE_USER = '/users'
export const UPDATE_USER = '/users/{EID}'

// Employee
export const SEARCH_EMPLOYEES = '/employees'
export const GET_EMPLOYEE = '/employees/{EID}'
export const SAVE_EMPLOYEE = '/employees'
export const UPDATE_EMPLOYEE = '/employees/{EID}'
export const LOAD_MATURITY = (compId, subCompId) => `competencies/${compId}/sub-competencies/${subCompId}/employees`

export const LOOKUP_EMPLOYEE_COUNTRIES = '/lookup/employees/countries'
export const LOOKUP_EMPLOYEE_DIVISIONS = '/lookup/employees/divisions'
export const LOOKUP_EMPLOYEE_SUB_GROUPS = '/lookup/employees/subGroups'
export const LOOKUP_EMPLOYEE_PROFILES = '/lookup/employees/profiles'

// Employee Competency
export const SEARCH_EMP_COMPETENCY = (compId, subCompId) => `competencies/${compId}/sub-competencies/${subCompId}/employees`
export const SET_EMPLOYEE_COMPETENCY_COMPLETED = (employeeId) => `/employees/${employeeId}/activities`
export const UPLOAD_EMP_COMPETENCY = '/employee-sub-competencies'
export const GET_COMPLETED_ACTIVITIES = (employeeId) => `employees/${employeeId}/activities`
export const SAVE_EMPLOYEE_ACTIVITY = (employeeId) => `employees/${employeeId}/sub-competencies`
export const UPDATE_EMPLOYEE_ACTIVITY = (employeeId, subCompId) => `employees/${employeeId}/sub-competencies/${subCompId}`

// Competency
export const SEARCH_COMPETENCY = '/competencies'
export const SAVE_COMPETENCY = '/competencies'
export const UPDATE_COMPETENCY = (compId) => `/competencies/${compId}`

// Sub Competency
export const SEARCH_SUB_COMPETENCY = (compId) => `competencies/${compId}/sub-competencies`
export const SAVE_SUB_COMPETENCY = (compId) => `/competencies/${compId}/sub-competencies`
export const UPDATE_SUB_COMPETENCY = (compId, subCompId) => `/competencies/${compId}/sub-competencies/${subCompId}`

// Levels
export const SEARCH_LEVELS = (compId, subCompId) => `competencies/${compId}/sub-competencies/${subCompId}/levels`
export const SAVE_LEVEL = (compId, subCompId) => `/competencies/${compId}/sub-competencies/${subCompId}/levels`
export const UPDATE_LEVEL = (compId, subCompId, levelId) => `competencies/${compId}/sub-competencies/${subCompId}/levels/${levelId}`

// Activities
export const GET_ACTIVITY = (compId, subCompId, levelId) => `/competencies/${compId}/sub-competencies/${subCompId}/levels/${levelId}/activities`
export const UPDATE_ACTIVITY = (compId, subCompId, levelId, activityId) => `/competencies/${compId}/sub-competencies/${subCompId}/levels/${levelId}/activities/${activityId}`
export const SAVE_ACTIVITY = (compId, subCompId, levelId) => `/competencies/${compId}/sub-competencies/${subCompId}/levels/${levelId}/activities`

// Statistics
export const GET_STATISTIC = '/statistics'
