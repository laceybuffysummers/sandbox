import { createAction, createReducer } from 'redux-act'
import { takeLatest, put, call, select } from 'redux-saga/effects'
import { initialize } from 'redux-form'
import { getEmployeeCompetency, setEmployeeCompetencyCompleted, uploadEmployeeCompetency, getCompletedActivities, setEmployeeActivity, saveCompletedActivities, updateCompletedActivities, updateEmployeeActivity } from '../services/EmpCompetency'
import { getCompetency, getSubCompetency, getLevels, getActivities, getLevel } from '../services/Competency'
import { getEmployee } from '../services/Employee'
import { filter, findIndex, find, map, size, intersectionWith } from 'lodash'
/**
 * Actions
 */
export const loadCompetencyAction = createAction('EMPLOYEE_COMPETENCY/LOAD')
export const loadSubCompetencyAction = createAction('EMPLOYEE_SUBCOMPETENCY/LOAD')
export const loadLevelsAction = createAction('EMPLOYEE_SUBCOMPETENCY_LEVELS/SEARCH')
export const loadActivitiesAction = createAction('EMPLOYEE_SUBCOMPETENCY_LEVELS_ACTIVITIES/GET')
export const loadEmployeesAction = createAction('EMPLOYEE_SUBCOMPETENCY_LEVELS_EMPLOYEES/GET')
export const selectEmployeeActivityAction = createAction('EMPLOYEE_COMPETENCY_ACTIVITY/SET')
export const errorAction = createAction('EMPLOYEE_SUBCOMPETENCY_ERROR/LOAD')
export const uploadCompetencyAction = createAction('EMPLOYEE_COMPETENCY_ERROR/UPLOAD')
export const uploadErrorAction = createAction('EMPLOYEE_SUBCOMPETENCY/UPLOAD')
export const addNewAction = createAction('EMPLOYEE_SUBCOMPETENCY/ADD')
export const getBackAction = createAction('EMPLOYEE_SUBCOMPETENCY/GO_BACK')
export const saveOrUpdateAction = createAction('EMPLOYEE_SUBCOMPETENCY/SAVE_UPDATE')
export const selectSubCompetencyAction = createAction('EMPLOYEE_SUB_COMPETENCY/SELECT')
export const setCompetency = createAction('EMPLOYEE_COMPETENCY/SET')
export const setSubCompetency = createAction('EMPLOYEE_SUBCOMPETENCY/SET')
export const setLevels = createAction('EMPLOYEE_SUBCOMPETENCY_LEVELS/SET')
export const setActivities = createAction('EMPLOYEE_SUBCOMPETENCY_ACTIVITIES/SET')
export const setEmployeesCompetency = createAction('EMPLOYEE_SUBCOMPETENCY_LEVELS_EMPLOYEES/SET')
export const setCompletedAction = createAction('EMPLOYEE_COMPETENCY_FILTER/COMPLETED')
export const setBulkCompletedAction = createAction('EMPLOYEE_COMPETENCY_FILTER_BULK/COMPLETED')
export const selectEmployeeActivityEmpAction = createAction('EMPLOYEE_COMPETENCY_ACTIVITY_EMP/SELECT')
export const selectEmployeeActivityEmpAllAction = createAction('EMPLOYEE_COMPETENCY_ACTIVITY_EMP/SELECT_ALL')

/**
 * Load Competency
 */
const loadCompetencySaga = function * () {
  try {
    const response = yield call(getCompetency)
    yield put(setCompetency(response.data))
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Load Sub Competency
 * @param {Object} action - Redux action
 */
const loadSubCompetencySaga = function * (action) {
  try {
    const response = yield call(getSubCompetency, action.payload)
    const tempSubCompetencies = response.data
    let subCompId = null
    map(tempSubCompetencies.items, (subCompetency, index) => {
      subCompetency.active = index === 0
      if (index === 0) subCompId = subCompetency.id
      return subCompetency
    })
    tempSubCompetencies.compId = action.payload
    yield put(setSubCompetency(tempSubCompetencies))
    // Load level belonging to particular Competency/SubCompetency group
    if (subCompId) yield put(loadLevelsAction({compId: action.payload, subCompId}))
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Load Levels belonging to particular Competency/SubCompetency Group
 * @param {Object} action - Redux action
 */
const loadLevelsSaga = function * (action) {
  try {
    const response = yield call(getLevels, action.payload)
    response.data.compId = action.payload.compId
    response.data.subCompId = action.payload.subCompId
    response.data.items = map(response.data.items, (level, index) => {
      level.active = index === 0
      return level
    })
    yield put(setLevels(response.data))
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Load Activities belonging to particular Competency/SubCompetency/Level Group
 * @param {Object} action - Redux action
 */
const loadActivitiesSaga = function * (action) {
  try {
    const response = yield call(getActivities, action.payload)
    response.data.compId = action.payload.compId
    response.data.subCompId = action.payload.subCompId
    response.data.levelId = action.payload.levelId
    let activityId = null
    response.data.items = yield map(response.data.items, (activities, index) => {
      if (index === 0) activityId = activities.id
      activities.active = index === 0
      return activities
    })
    yield put(setActivities(response.data))
    if (activityId) yield put(loadEmployeesAction({compId: action.payload.compId, subCompId: action.payload.subCompId, levelId: action.payload.levelId, activityId}))
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Load Employees belonging to particular Competency/SubCompetency/Level Group
 * @param {Object} action - Redux action
 */
const loadEmployeesSaga = function * (action) {
  try {
    const { compId, subCompId, levelId, activityId } = action.payload
    const response = yield call(getEmployeeCompetency, action.payload)
    const activities = yield call(getActivities, {compId, subCompId, levelId})
    if (activities.data.items.length > 0) {
      let employees = []
      for (let i = 0; i < response.data.items.length; i++) {
        const item = response.data.items[i]
        const employee = yield call(getEmployee, item.employeeEID)
        item.employee = employee.data
        const completedActivities = yield call(getCompletedActivities, item.employeeEID)
        const completedCurrentActiveActivity = find(completedActivities.data.items, activity => activity.id.toString() === activityId.toString())
        if (completedCurrentActiveActivity) {
          item.completed = completedCurrentActiveActivity.completed
          if (item.expectedMaturity) {
            const expectedLevel = yield call(getLevel, { compId, subCompId, levelId: item.expectedMaturity })
            const expectedMaturityActivities = yield call(getActivities, {compId, subCompId, levelId: expectedLevel.data.id})
            const completed = size(filter(intersectionWith(completedActivities.data.items, expectedMaturityActivities.data.items, (a, b) => a.id === b.id && a.subCompetencyLevelId === b.subCompetencyLevelId), activity => activity.completed))
            const expectedMaturityLevel = yield call(getLevel, { compId, subCompId, levelId: item.expectedMaturity })
            item.expectedMaturityLabel = expectedMaturityLevel.data.name
            item.progress = Math.floor(completed / expectedMaturityActivities.data.items.length * 100)
          } else {
            item.progress = 0
          }
          employees.push(item)
        }
      }
      response.data.compId = action.payload.compId
      response.data.subCompId = action.payload.subCompId
      response.data.levelId = action.payload.levelId
      response.data.activityId = action.payload.activityId
      yield put(setEmployeesCompetency({...response.data, items: employees}))
    }
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * set Sub Employee Competency
 * @param {Object} action - Redux action
 */
const selectSubCompetencySaga = function * (action) {
  try {
    const state = yield select()
    const subCompetencies = state.employeeCompetency.subCompetencies
    const tempSubCompetencies = filter(subCompetencies, subCompetency => subCompetency.compId === action.payload.competencyId)[0]
    if (tempSubCompetencies) {
      tempSubCompetencies.items.map(subCompetency => {
        subCompetency.active = subCompetency.id === action.payload.subCompetencyId
        return subCompetency
      })
      yield put(setSubCompetency(tempSubCompetencies))
      yield put(loadLevelsAction({compId: action.payload.competencyId, subCompId: action.payload.subCompetencyId}))
    }
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Upload Employee Competency file
 * @param {Object} action - Redux Action
 */
const uploadCompetencySaga = function * (action) {
  try {
    yield call(uploadEmployeeCompetency, action.payload)
    yield put(loadCompetencyAction())
    yield put(uploadErrorAction(false))
  } catch (e) {
    yield put(uploadErrorAction(true))
  }
}

/**
 * Add new
 * @param {Object} action - Redux action
 */
const addNewSaga = function * () {
  try {
    yield put(initialize('competency', {}))
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Save or update employee
 * @param {Object} action - Redux action
 */
const saveOrUpdateSaga = function * (action) {
  try {
    const state = yield select()
    const add = state.employeeCompetency.add
    if (add === 'EMPLOYEE') {
      const competencyId = action.payload.competency
      const subCompetencyId = action.payload.subCompetency
      const levelId = action.payload.level
      const activityId = action.payload.activity
      const employeeId = action.payload.employeeEID
      const employeeCompetencies = yield call(getEmployeeCompetency, { compId: competencyId, subCompId: subCompetencyId })
      const employeeActivity = find(employeeCompetencies.data.items, item => item.employeeEID === employeeId)
      if (!employeeActivity) yield call(setEmployeeActivity, employeeId, {competencyId, subCompetencyId})
      let completedActivities = yield call(getCompletedActivities, employeeId)
      const activity = find(completedActivities.data.items, completedActivity => completedActivity.id === activityId && completedActivity.subCompetencyLevelId === levelId)
      if (!activity) {
        if (action.payload.completed === 'true') {
          yield call(updateCompletedActivities, employeeId, { activityId })
          completedActivities = yield call(getCompletedActivities, employeeId)
          const activities = yield call(getActivities, {compId: competencyId, subCompId: subCompetencyId, levelId})
          const completed = size(filter(intersectionWith(completedActivities.data.items, activities.data.items, (a, b) => a.id === b.id && a.subCompetencyLevelId === b.subCompetencyLevelId), activity => activity.completed))
          if (completed === activities.data.items.length) {
            const levels = yield call(getLevels, {compId: competencyId, subCompId: subCompetencyId})
            const level = find(levels.data.items, level => level.id.toString() === levelId.toString())
            const payload = {
              competencyId,
              currentMaturity: level.level
            }
            yield call(updateEmployeeActivity, employeeId, subCompetencyId, payload)
          }
        } else {
          yield call(saveCompletedActivities, employeeId, { activityId })
        }
      } else {
        const completed = activity.completed
        if (!completed) {
          if (action.payload.completed === 'true') {
            yield call(updateCompletedActivities, employeeId, { activityId })
            completedActivities = yield call(getCompletedActivities, employeeId)
            const activities = yield call(getActivities, {compId: competencyId, subCompId: subCompetencyId, levelId})
            const completed = size(filter(intersectionWith(completedActivities.data.items, activities.data.items, (a, b) => a.id === b.id && a.subCompetencyLevelId === b.subCompetencyLevelId), activity => activity.completed))
            if (completed === activities.data.items.length) {
              const levels = yield call(getLevels, {compId: competencyId, subCompId: subCompetencyId})
              const level = find(levels.data.items, level => level.id.toString() === levelId.toString())
              const payload = {
                competencyId: competencyId,
                currentMaturity: level.level
              }
              yield call(updateEmployeeActivity, employeeId, subCompetencyId, payload)
            }
          }
        }
      }
      yield put(loadEmployeesAction({compId: competencyId, subCompId: subCompetencyId, levelId: levelId, activityId: activityId}))
    }
    yield put(getBackAction())
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Select Employee Activity Employee table
 * @param {Object} action - Redux action
 */
const selectEmployeeActivityEmpSaga = function * (action) {
  try {
    const state = yield select()
    const { employeeCompetency } = state
    const activities = filter(employeeCompetency.activities, activity => activity.compId === action.payload.compId.toString() && activity.subCompId === action.payload.subCompId.toString() && activity.levelId === action.payload.levelId.toString())[0]
    const activeActivity = find(activities.items, activity => activity.active)
    const employees = filter(employeeCompetency.employees, employee => employee.compId.toString() === action.payload.compId.toString() && employee.subCompId.toString() === action.payload.subCompId.toString() && employee.levelId.toString() === action.payload.levelId.toString() && employee.activityId.toString() === activeActivity.id.toString())[0]
    if (employees) {
      employees.items.map(employeeItem => {
        if (employeeItem.competencyId.toString() === action.payload.compId.toString() && employeeItem.subCompetencyId.toString() === action.payload.subCompId.toString() && employeeItem.employeeEID === action.payload.employeeId) {
          employeeItem.checked = action.payload.checked
        }
        return employeeItem
      })
      if (!action.payload.checked) employees.checked = action.payload.checked
      yield put(setEmployeesCompetency(employees))
    }
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Select Employee Activity
 * @param {Object} action - Redux action
 */
const selectEmployeeActivitySaga = function * (action) {
  try {
    const state = yield select()
    const activities = filter(state.employeeCompetency.activities, activity => activity.compId === action.payload.compId && activity.subCompId === action.payload.subCompId && activity.levelId === action.payload.levelId)[0]
    if (activities) {
      activities.items = yield map(activities.items, activity => {
        activity.active = activity.id === action.payload.activityId
        return activity
      })
      activities.compId = action.payload.compId
      activities.subCompId = action.payload.subCompId
      activities.levelId = action.payload.levelId
      yield put(setActivities(activities))
      yield put(loadEmployeesAction({compId: action.payload.compId, subCompId: action.payload.subCompId, levelId: action.payload.levelId, activityId: action.payload.activityId}))
    }
  } catch (e) {
    console.log(e)
  }
}

/**
 * Select all Employee Activity Employee table
 * @param {Object} action - Redux action
 */
const selectEmployeeActivityEmpAllSaga = function * (action) {
  try {
    const state = yield select()
    const { employeeCompetency } = state
    const activities = filter(employeeCompetency.activities, activity => activity.compId === action.payload.compId.toString() && activity.subCompId === action.payload.subCompId.toString() && activity.levelId === action.payload.levelId.toString())[0]
    const activeActivity = find(activities.items, activity => activity.active)
    const employees = filter(employeeCompetency.employees, employee => employee.compId.toString() === action.payload.compId.toString() && employee.subCompId.toString() === action.payload.subCompId.toString() && employee.levelId.toString() === action.payload.levelId.toString() && employee.activityId.toString() === activeActivity.id.toString())[0]
    if (employees) {
      employees.checked = action.payload.checked
      map(employees.items, employee => {
        employee.checked = action.payload.checked
      })
      yield put(setEmployeesCompetency(employees))
    }
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Set Employee Competency completed in bulk
 * @param {Object} action - Redux Action
 */
const setBulkCompletedSaga = function * (action) {
  try {
    const state = yield select()
    const { employeeCompetency } = state
    const activities = filter(employeeCompetency.activities, activity => activity.compId === action.payload.compId && activity.subCompId === action.payload.subCompId && activity.levelId === action.payload.levelId)[0]
    const activeActivity = find(activities.items, activity => activity.active)
    const employees = filter(employeeCompetency.employees, employee => employee.compId.toString() === action.payload.compId.toString() && employee.subCompId.toString() === action.payload.subCompId.toString() && employee.levelId.toString() === action.payload.levelId.toString() && employee.activityId.toString() === activeActivity.id.toString())[0]
    if (employees) {
      const selectedEmployees = filter(employees.items, employeeItem => employeeItem.checked)
      yield * map(selectedEmployees, function * (selectedEmployee) {
        // If not already completed, call to complete
        if (!selectedEmployee.completed) {
          yield put(setCompletedAction({employeeId: selectedEmployee.employeeEID, competencyId: action.payload.compId, subCompetencyId: action.payload.subCompId, levelId: action.payload.levelId}))
        }
      })
    }
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Set Employee Competency completed
 * @param {Object} action - Redux Action
 */
const setCompletedSaga = function * (action) {
  try {
    const state = yield select()
    const { employeeCompetency } = state
    const activities = filter(employeeCompetency.activities, activity => activity.compId === action.payload.competencyId && activity.subCompId === action.payload.subCompetencyId && activity.levelId === action.payload.levelId)[0]
    if (activities) {
      const activeActivity = find(activities.items, activity => activity.active)
      const payload = {
        activityId: activeActivity.id
      }
      yield call(setEmployeeCompetencyCompleted, action.payload.employeeId, payload)
      const employeeSubCompetency = yield call(getEmployeeCompetency, { compId: action.payload.competencyId, subCompId: action.payload.subCompetencyId })
      const individualEmployeeSubCompetency = filter(employeeSubCompetency.data.items, item => item.employeeEID === action.payload.employeeId)[0]
      if (individualEmployeeSubCompetency) {
        if (individualEmployeeSubCompetency.currentMaturity !== individualEmployeeSubCompetency.expectedMaturity) {
          const level = Number(individualEmployeeSubCompetency.currentMaturity) + 1
          const actualLevelId = yield call(getLevel, { compId: action.payload.competencyId, subCompId: action.payload.subCompetencyId, levelId: level })
          const completedActivities = yield call(getCompletedActivities, action.payload.employeeId)
          const newLevelActivities = yield call(getActivities, {compId: action.payload.competencyId, subCompId: action.payload.subCompetencyId, levelId: actualLevelId.data.id})
          const completed = size(filter(intersectionWith(completedActivities.data.items, newLevelActivities.data.items, (a, b) => a.id === b.id && a.subCompetencyLevelId === b.subCompetencyLevelId), activity => activity.completed))
          if (completed === newLevelActivities.data.items.length) {
            const payload = {
              competencyId: action.payload.competencyId,
              currentMaturity: level.toString(),
              expectedMaturity: individualEmployeeSubCompetency.expectedMaturity
            }
            yield call(updateEmployeeActivity, action.payload.employeeId, action.payload.subCompetencyId, payload)
          }
        }
      }
      yield put(loadEmployeesAction({compId: action.payload.competencyId, subCompId: action.payload.subCompetencyId, levelId: action.payload.levelId, activityId: activeActivity.id}))
    }
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

export const employeeCompetencyRootSaga = function * () {
  yield takeLatest(loadCompetencyAction, loadCompetencySaga)
  yield takeLatest(loadSubCompetencyAction, loadSubCompetencySaga)
  yield takeLatest(loadLevelsAction, loadLevelsSaga)
  yield takeLatest(loadActivitiesAction, loadActivitiesSaga)
  yield takeLatest(loadEmployeesAction, loadEmployeesSaga)
  yield takeLatest(selectEmployeeActivityAction, selectEmployeeActivitySaga)
  yield takeLatest(selectSubCompetencyAction, selectSubCompetencySaga)
  yield takeLatest(uploadCompetencyAction, uploadCompetencySaga)
  yield takeLatest(addNewAction, addNewSaga)
  yield takeLatest(saveOrUpdateAction, saveOrUpdateSaga)
  yield takeLatest(setCompletedAction, setCompletedSaga)
  yield takeLatest(setBulkCompletedAction, setBulkCompletedSaga)
  yield takeLatest(selectEmployeeActivityEmpAction, selectEmployeeActivityEmpSaga)
  yield takeLatest(selectEmployeeActivityEmpAllAction, selectEmployeeActivityEmpAllSaga)
}

/**
 * Reducer
 */
const initialState = {
  data: {},
  subCompetencies: [],
  levels: [],
  activities: [],
  employees: [],
  add: null,
  edit: null,
  uploadFailed: false,
  loadError: false
}

/** SubCompetency Reducer helper function which checks whether subcompetency is present, if present replace
 * or else add
*/
const combineSubCompetencyReducer = function (state, payload) {
  if (payload) {
    const index = findIndex(state.subCompetencies, (subCompetency) => subCompetency.compId.toString() === payload.compId.toString())
    let subCompetencies = [...state.subCompetencies]
    if (index >= 0) {
      subCompetencies[index] = payload
    } else {
      subCompetencies = subCompetencies.concat([payload])
    }
    return {
      ...state,
      subCompetencies: subCompetencies
    }
  }
  return state
}

/** Level Reducer helper function which checks whether level is present, if present replace
 * or else add
*/
const combineLevelsReducer = function (state, payload) {
  const index = findIndex(state.levels, (level) => level.compId.toString() === payload.compId.toString() && level.subCompId.toString() === payload.subCompId.toString())
  let levels = [...state.levels]
  if (index >= 0) {
    levels[index] = payload
  } else {
    levels = levels.concat([payload])
  }
  return {
    ...state,
    levels
  }
}

/** Activities Reducer helper function which checks whether activity is present, if present replace
 * or else add
*/
const combineActivitiesReducer = function (state, payload) {
  const index = findIndex(state.activities, (activity) => activity.compId.toString() === payload.compId.toString() && activity.subCompId.toString() === payload.subCompId.toString() && activity.levelId.toString() === payload.levelId.toString())
  let activities = [...state.activities]
  if (index >= 0) {
    activities[index] = payload
  } else {
    activities = activities.concat([payload])
  }
  return {
    ...state,
    activities
  }
}

/** Employees Reducer helper function which checks whether employee is present, if present replace
 * or else add
*/
const combineEmployeesReducer = function (state, payload) {
  const index = findIndex(state.employees, (employee) => employee.compId.toString() === payload.compId.toString() && employee.subCompId.toString() === payload.subCompId.toString() && employee.levelId.toString() === payload.levelId.toString() && employee.activityId.toString() === payload.activityId.toString())
  let employees = [...state.employees]
  if (index >= 0) {
    employees[index] = payload
  } else {
    employees = employees.concat([payload])
  }
  return {
    ...state,
    employees
  }
}

export const employeeCompetencyReducer = createReducer({
  [setCompetency]: (state, payload) => ({ ...state, data: payload }),
  [setSubCompetency]: (state, payload) => combineSubCompetencyReducer(state, payload),
  [setLevels]: (state, payload) => combineLevelsReducer(state, payload),
  [setActivities]: (state, payload) => combineActivitiesReducer(state, payload),
  [setEmployeesCompetency]: (state, payload) => combineEmployeesReducer(state, payload),
  [addNewAction]: (state, payload) => ({ ...state, add: 'EMPLOYEE', edit: null }),
  [getBackAction]: (state) => ({ ...state, add: null, edit: null }),
  [uploadErrorAction]: (state, payload) => ({ ...state, uploadFailed: payload }),
  [errorAction]: (state, payload) => ({ ...state, loadError: payload })
}, initialState)
