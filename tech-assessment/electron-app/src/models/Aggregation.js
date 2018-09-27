import { createAction, createReducer } from 'redux-act'
import { takeLatest, put, call, select } from 'redux-saga/effects'
import { getStatistic, getCountries, getDivisions, getSubGroups, getProfiles } from '../services/Aggregation'
import { getCompetency, getSubCompetency } from '../services/Competency'
import { pickBy, map } from 'lodash'

const LARGE_INT = 1000000

/**
 * Actions
 */
export const loadStatisticAction = createAction('STATISTIC/LOAD')
export const setStatisticAction = createAction('STATISTIC/SET')
export const setFilterValueAction = createAction('STATISTIC_FILTER/SET')
export const setFiltersAction = createAction('STATISTIC_FILTER/SET')

export const loadOptionsAction = createAction('STATISTIC/OPTIONS/LOAD')
export const setOptionsAction = createAction('STATISTIC/OPTIONS/SET')
export const setCompetencyAction = createAction('STATISTIC/COMPETENCY/SET')
export const setSubCompetenciesAction = createAction('STATISTIC/SUB_COMPETENCIES/SET')
export const setErrorMsgAction = createAction('STATISTIC/ERROR_MSG/SET')

/**
 * Load Statistic data
 */
const loadStatisticSaga = function * () {
  try {
    const state = yield select()
    const { statistic } = state
    const payload = {
      ...statistic.searchFilters
    }
    if (!payload.competencyId || payload.competencyId.length === 0) {
      yield put(setErrorMsgAction('Competency should be selected.'))
      return
    }
    if (!payload.subCompetencyId || payload.subCompetencyId.length === 0) {
      yield put(setErrorMsgAction('Sub competency should be selected.'))
      return
    }
    if (payload.country && payload.country.length === 0) delete payload.country
    if (payload.division && payload.division.length === 0) delete payload.division
    if (payload.subGroup && payload.subGroup.length === 0) delete payload.subGroup
    if (payload.profile && payload.profile.length === 0) delete payload.profile

    const response = yield call(getStatistic, payload)
    yield put(setStatisticAction(response.data))
  } catch (e) {
    console.log(e)
  }
}

/**
 * Set Filters
 */
const setFiltersSaga = function * () {
  try {
    yield put(loadStatisticAction())
  } catch (e) {
    console.log(e)
  }
}

/**
 * Load options
 * @param {Object} action - Redux Action
 */
const loadOptionsSaga = function * (action) {
  try {
    const competencies1 = yield call(getCompetency, { pageSize: LARGE_INT })
    const competencies = map(competencies1.data.items, comp => ({ label: comp.name, value: comp.id }))
    const countries = yield call(getCountries)
    const divisions = yield call(getDivisions)
    const subGroups = yield call(getSubGroups)
    const profiles = yield call(getProfiles)
    yield put(setOptionsAction({ competencies, countries, divisions, subGroups, profiles }))
    // select first competency is available
    if (competencies.length > 0) {
      yield put(setCompetencyAction({ competencyId: competencies[0].value }))
    }
  } catch (e) {
    console.log(e)
  }
}

/**
 * Set competency
 * @param {Object} action - Redux Action
 */
const setCompetencySaga = function * (action) {
  try {
    const competencyId = action.payload.competencyId
    let subCompetencies = { data: { items: [] } }
    if (competencyId && competencyId.length > 0) {
      subCompetencies = yield call(getSubCompetency, competencyId)
    }
    const subC = map(subCompetencies.data.items, subComp => ({ label: subComp.name, value: subComp.id }))
    yield put(setSubCompetenciesAction(subC))
    // select first sub competency is available
    if (subC.length > 0) {
      yield put(setFilterValueAction({ subCompetencyId: subC[0].value }))
    }
  } catch (e) {
    console.log(e)
  }
}

export const statisticRootSaga = function * () {
  yield takeLatest(loadStatisticAction, loadStatisticSaga)
  yield takeLatest(setFiltersAction, setFiltersSaga)
  yield takeLatest(loadOptionsAction, loadOptionsSaga)
  yield takeLatest(setCompetencyAction, setCompetencySaga)
}

/**
 * Reducer
 */
const initialState = {
  data: {
  },
  competencies: [],
  subCompetencies: [],
  countries: [],
  divisions: [],
  subGroups: [],
  profiles: [],
  filters: {
    competencyId: '',
    subCompetencyId: '',
    country: '',
    division: '',
    subGroup: '',
    profile: ''
  },
  searchFilters: {
    competencyId: '',
    subCompetencyId: '',
    country: '',
    division: '',
    subGroup: '',
    profile: ''
  },
  errorMsg: null
}
export const statisticReducer = createReducer({
  [loadStatisticAction]: (state, payload) => ({ ...state, data: {}, errorMsg: null }),
  [setStatisticAction]: (state, payload) => ({ ...state, data: payload }),
  [setFilterValueAction]: (state, payload) => ({ ...state, filters: { ...state.filters, ...payload } }),
  [setFiltersAction]: (state) => ({ ...state, searchFilters: { ...pickBy(state.filters) } }),
  [setOptionsAction]: (state, payload) => ({ ...state, ...payload }),
  [setSubCompetenciesAction]: (state, payload) => ({ ...state, subCompetencies: payload }),
  [setCompetencyAction]: (state, payload) => ({ ...state, filters: { ...state.filters, ...payload, subCompetencyId: '' } }),
  [setErrorMsgAction]: (state, payload) => ({ ...state, errorMsg: payload })
}, initialState)
