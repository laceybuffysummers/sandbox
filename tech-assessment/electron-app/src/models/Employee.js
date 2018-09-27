import { createAction, createReducer } from 'redux-act'
import { takeLatest, put, call, select } from 'redux-saga/effects'
import { getCompletedActivities, getEmployeeCompetency, setEmployeeActivity, updateEmployeeActivity } from '../services/EmpCompetency'
import { getActivities, getLevel, getLevels } from '../services/Competency'
import { searchEmployee, updateEmployee, saveEmployee, loadMaturity } from '../services/Employee'
import { map, pickBy, findLast, pick, omit, intersectionWith, filter, size, find } from 'lodash'
import { initialize } from 'redux-form'

const initialState = {
  items: [],
  page: 0,
  pageSize: 10,
  total: 0,
  add: false,
  edit: false,
  error: '',
  filters: {
    query: '',
    managerEID: '',
    competency: '',
    subCompetency: '',
    currentMaturity: '',
    expectedMaturity: '',
    level: '',
    country: '',
    division: '',
    subGroup: '',
    profile: ''
  },
  competency: {
    competencyId: '',
    subCompetencyId: ''
  },
  searchFilters: {},
  selected: null,
  details: null
}

/**
 * Actions
 */
export const searchEmployeeAction = createAction('EMPLOYEE/SEARCH')
export const resetSearchEmployeeAction = createAction('EMPLOYEE_SEARCH/RESET')
export const saveOrUpdateAction = createAction('EMPLOYEE_SEARCH/SAVE_UPDATE')
export const getEmployeeAction = createAction('EMPLOYEE/LOAD')
export const editEmployeeAction = createAction('EMPLOYEE/EDIT')
export const addEmployeeAction = createAction('EMPLOYEE/ADD')
export const getToDetailViewAction = createAction('EMPLOYEE/DETAIL_VIEW')
export const setEmployee = createAction('EMPLOYEE/SET')
export const setSearchResponse = createAction('EMPLOYEE_SEARCH/SET')
export const setFilterField = createAction('EMPLOYEE_FILTER_FIELD/SET')
export const setPagination = createAction('EMPLOYEE_PAGINATION/SET')
export const setFilterValueAction = createAction('EMPLOYEE_FILTER_VALUE/SET')
export const setFiltersAction = createAction('EMPLOYEE_FILTER/SET')
export const setCompetencyAction = createAction('EMPLOYEE_COMPETENCY/SET')
export const loadMaturityAction = createAction('EMPLOYEE_MATURITY/LOAD')
export const setError = createAction('EMPLOYEE/ERROR')
/**
 * Search Employee
 */
const searchEmployeeSaga = function * () {
  try {
    const state = yield select()
    const { employee } = state
    const payload = {
      ...employee.searchFilters,
      page: employee.page,
      pageSize: employee.pageSize
    }
    const response = yield call(searchEmployee, payload)
    const employees = response.data
    yield put(setSearchResponse(employees))
  } catch (e) {
    yield put(setSearchResponse(pick(initialState, ['page', 'pageSize', 'items', 'total'])))
    console.log(e)
  }
}

/**
 * Set pagination
 */
const setPaginationSaga = function * () {
  try {
    yield put(searchEmployeeAction())
  } catch (e) {
    console.log(e)
  }
}

/**
 * Set Filters
 */
const setFiltersSaga = function * () {
  try {
    yield put(searchEmployeeAction())
  } catch (e) {
    console.log(e)
  }
}

/**
 * Edit Employee information
 * @param {Object} action - Redux Action
 */
const editEmployeeSaga = function * (action) {
  try {
    const state = yield select()
    const employee = find(state.employee.items, e => e.EID === action.payload)
    yield put(setError(''))
    yield put(setEmployee(employee))
    if (employee.currentMaturity || employee.expectedMaturity) {
      const levels = yield call(getLevels, {compId: state.employee.competency.competencyId, subCompId: state.employee.competency.subCompetencyId})
      const cMaturity = find(levels.data.items, level => level.level === Number(employee.currentMaturity))
      const eMaturity = find(levels.data.items, level => level.level === Number(employee.expectedMaturity))
      yield put(initialize('employee', {...employee, competency: state.employee.competency.competencyId, subCompetency: state.employee.competency.subCompetencyId, currentMaturity: cMaturity ? cMaturity.id : null, expectedMaturity: eMaturity ? eMaturity.id : null}))
    } else {
      yield put(initialize('employee', employee))
    }
  } catch (e) {
    console.log(e)
  }
}

/**
 * Get Employee information
 * @param {Object} action - Redux Action
 */
const getEmployeeSaga = function * (action) {
  try {
    const state = yield select()
    const employee = findLast(state.employee.items, { EID: action.payload })
    yield put(setEmployee(employee))
  } catch (e) {
    console.log(e)
  }
}

/**
 * Reset Filter Employee search
 */
const resetSearchEmployeeSaga = function * () {
  try {
    yield put(searchEmployeeAction())
  } catch (e) {
    console.log(e)
  }
}

/**
 * Save/Update Employee
 * @param {Object} action - Redux Action
 */
const saveOrUpdateSaga = function * (action) {
  try {
    const state = yield select()
    if (state.employee.edit) {
      const levels = yield call(getLevels, {compId: action.payload.competency, subCompId: action.payload.subCompetency})
      action.payload.currentMaturity = find(levels.data.items, level => level.id === action.payload.currentMaturity).level
      action.payload.expectedMaturity = find(levels.data.items, level => level.id === action.payload.expectedMaturity).level
      if (Number(action.payload.currentMaturity) <= Number(action.payload.expectedMaturity)) {
        const employeeCompetency = yield call(getEmployeeCompetency, { compId: action.payload.competency, subCompId: action.payload.subCompetency })
        const hasEmployeeCompetency = find(employeeCompetency.data.items, e => e.employeeEID === action.payload.EID)
        if (hasEmployeeCompetency) {
          const payload = {
            competencyId: action.payload.competency,
            currentMaturity: action.payload.currentMaturity,
            expectedMaturity: action.payload.expectedMaturity
          }
          yield call(updateEmployeeActivity, action.payload.EID, action.payload.subCompetency, payload)
        } else {
          yield call(setEmployeeActivity, action.payload.EID, {competencyId: action.payload.competency, subCompetencyId: action.payload.subCompetency, currentMaturity: action.payload.currentMaturity, expectedMaturity: action.payload.expectedMaturity})
        }
        const payload = omit(pick(action.payload, Object.keys(state.form.employee.registeredFields)), ['competency', 'subCompetency', 'currentMaturity', 'expectedMaturity'])
        const response = yield call(updateEmployee, payload)
        yield put(setEmployee(response.data))
        yield put(setError(''))
        yield put(getToDetailViewAction())
        yield put(loadMaturityAction())
      } else {
        yield put(setError('Expected Maturity Should be same or greater than current Maturity'))
      }
    } else {
      yield call(saveEmployee, action.payload)
      yield put(searchEmployeeAction())
      yield put(setError(''))
      yield put(getToDetailViewAction())
      yield put(loadMaturityAction())
    }
  } catch (e) {
    if (e.response && e.response.data && e.response.data.message) {
      yield put(setError(e.response.data.message))
    }
    console.log(e.response)
  }
}

/**
 * Load Maturities of Employees
 */
const loadMaturitySaga = function * () {
  try {
    const state = yield select()
    if (state.employee.competency.competencyId && state.employee.competency.subCompetencyId) {
      const response = yield call(loadMaturity, state.employee.competency.competencyId, state.employee.competency.subCompetencyId)
      const employees = yield call(searchEmployee, {})
      const employeeData = yield map(employees.data.items, function * (item) {
        const employee = find(response.data.items, e => e.employeeEID === item.EID)
        if (employee) {
          if (employee.currentMaturity) {
            const currentLevel = yield call(getLevel, { compId: state.employee.competency.competencyId, subCompId: state.employee.competency.subCompetencyId, levelId: employee.currentMaturity })
            item = {
              ...item,
              currentMaturity: employee.currentMaturity,
              currentMaturityLabel: currentLevel.data.name
            }
          }
          if (employee.expectedMaturity) {
            const expectedLevel = yield call(getLevel, { compId: state.employee.competency.competencyId, subCompId: state.employee.competency.subCompetencyId, levelId: employee.expectedMaturity })
            const activities = yield call(getActivities, {compId: state.employee.competency.competencyId, subCompId: state.employee.competency.subCompetencyId, levelId: expectedLevel.data.id})
            const completedActivities = yield call(getCompletedActivities, employee.employeeEID)
            const completed = size(filter(intersectionWith(completedActivities.data.items, activities.data.items, (a, b) => a.id === b.id && a.subCompetencyLevelId === b.subCompetencyLevelId), activity => activity.completed))
            item = {
              ...item,
              activitiesCount: activities.data.items.length,
              activitiesCompleted: completed,
              expectedMaturity: employee.expectedMaturity,
              expectedMaturityLabel: expectedLevel.data.name
            }
          }
        }
        return item
      })
      yield put(setSearchResponse({items: employeeData}))
    } else {
      yield put(searchEmployeeAction())
    }
  } catch (e) {
    console.log(e)
  }
}

export const employeeRootSaga = function * () {
  yield takeLatest(searchEmployeeAction, searchEmployeeSaga)
  yield takeLatest(setPagination, setPaginationSaga)
  yield takeLatest(editEmployeeAction, editEmployeeSaga)
  yield takeLatest(getEmployeeAction, getEmployeeSaga)
  yield takeLatest(setFiltersAction, setFiltersSaga)
  yield takeLatest(resetSearchEmployeeAction, resetSearchEmployeeSaga)
  yield takeLatest(saveOrUpdateAction, saveOrUpdateSaga)
  yield takeLatest(loadMaturityAction, loadMaturitySaga)
  yield takeLatest(setCompetencyAction, loadMaturitySaga)
}

/**
 * Reducer
 */
export const employeeReducer = createReducer({
  [setFilterField]: (state, payload) => ({ ...state, filters: payload }),
  [searchEmployeeAction]: (state) => ({ ...state, items: [], selected: null, details: null }),
  [setPagination]: (state, payload) => ({ ...state, page: payload }),
  [setSearchResponse]: (state, payload) => ({ ...state, edit: false, ...payload }),
  [getEmployeeAction]: (state, payload) => ({ ...state, selected: payload, edit: false, add: false }),
  [setEmployee]: (state, payload) => {
    const index = state.items.findIndex(i => i.EID === payload.EID)
    return {
      ...state,
      details: payload,
      items: (index > -1
        ? [...state.items.slice(0, index),
          payload,
          ...state.items.slice(index + 1)]
        : [...state.items])
    }
  },
  [editEmployeeAction]: (state) => ({ ...state, edit: true, add: false }),
  [addEmployeeAction]: (state) => ({ ...state, add: true, edit: false }),
  [getToDetailViewAction]: (state) => ({ ...state, add: false, edit: false }),
  [setFilterValueAction]: (state, payload) => ({ ...state, filters: { ...state.filters, ...payload } }),
  [setFiltersAction]: (state) => ({ ...state, searchFilters: { ...pickBy(state.filters) } }),
  [setCompetencyAction]: (state, payload) => ({ ...state, competency: { ...state.competency, ...payload } }),
  [resetSearchEmployeeAction]: (state) => ({ ...state, searchFilters: {}, filters: { ...initialState.filters } }),
  [setError]: (state, payload) => ({ ...state, error: payload })
}, initialState)
