import { createAction, createReducer } from 'redux-act'
import { findIndex, pickBy, map, filter } from 'lodash'
import { takeLatest, put, call, select } from 'redux-saga/effects'
import { getCompetency, getSubCompetency, getLevels, getActivities } from '../services/Competency'
import { removeMenuItemAction, addMenuItemAction } from './Authentication'

/**
 * Actions
 */
export const setFilterValueAction = createAction('COMPETENCY_FILTER_VALUE/SET')
export const setFiltersAction = createAction('COMPETENCY_FILTER/SET')
export const loadCompetencyAction = createAction('COMPETENCY/SEARCH')
export const loadSubCompetencyAction = createAction('SUBCOMPETENCY/SEARCH')
export const loadLevelsAction = createAction('LEVELS/SEARCH')
export const loadActivitiesAction = createAction('ACTIVITIES/GET')
export const errorAction = createAction('COMPETENCY/ERROR')
export const setCompetency = createAction('COMPETENCY/SET')
export const setSubCompetency = createAction('SUBCOMPETENCY/SET')
export const setLevels = createAction('LEVELS/SET')
export const setActivities = createAction('ACTIVITIES/SET')
export const onLevelSelectAction = createAction('COMPETENCY/SELECT_LEVEL')
export const togglePinAction = createAction('COMPETENCY/TOGGLE_PIN')
export const setPinAction = createAction('COMPETENCY/SET_TOGGLE_PIN')

/**
 * Load Competency
 */
const loadCompetencySaga = function * () {
  try {
    const state = yield select()
    const { competency } = state
    const payload = {
      ...competency.searchFilters
    }
    const response = yield call(getCompetency, payload)
    // Check if particular competency is already present in left menu sidebar, if present pin it
    if (localStorage.getItem('menu')) { // eslint-disable-line
      const menu = JSON.parse(localStorage.getItem('menu')) // eslint-disable-line
      map(response.data.items, competency => {
        const index = findIndex(menu[1].nodes, (menu) => menu.id === competency.id)
        if (index !== -1) competency.pined = true
      })
    }
    yield put(setCompetency(response.data))
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Load SubCompetency
 * @param {Object} action - Redux action
 */
const loadSubCompetencySaga = function * (action) {
  try {
    const state = yield select()
    const { competency } = state
    yield * map(competency.subCompetencies, function * (subCompetency) {
      map(subCompetency.items, item => {
        item.active = false
      })
      yield put(setSubCompetency(subCompetency))
    })
    const response = yield call(getSubCompetency, action.payload)
    response.data.compId = action.payload
    yield put(setSubCompetency(response.data))
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Load Levels belonging to particular Competency/SubCompetency Pair
 * @param {Object} action - Redux action
 */
const loadLevelsSaga = function * (action) {
  try {
    const response = yield call(getLevels, action.payload)
    response.data.compId = action.payload.compId
    response.data.subCompId = action.payload.subCompId
    let levelId = null
    response.data.items = map(response.data.items, (level, index) => {
      level.active = index === 0
      if (index === 0) levelId = level.id
      return level
    })
    yield put(setLevels(response.data))
    if (levelId) yield put(loadActivitiesAction({compId: action.payload.compId, subCompId: action.payload.subCompId, levelId}))
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Load Activities belonging to particular Competency/SubCompetency/Level Pair
 * @param {Object} action - Redux action
 */
const loadActivitiesSaga = function * (action) {
  try {
    const response = yield call(getActivities, action.payload)
    response.data.compId = action.payload.compId
    response.data.subCompId = action.payload.subCompId
    response.data.levelId = action.payload.levelId
    yield put(setActivities(response.data))
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Pin Competency
 */
const togglePinSaga = function * (action) {
  try {
    const state = yield select()
    const { competency } = state
    const index = findIndex(competency.data.items, { id: action.payload })
    const menu = {
      id: competency.data.items[index].id,
      name: competency.data.items[index].name,
      route: '/home/competency/' + competency.data.items[index].id
    }
    if (competency.data.items[index].pined) {
      yield put(removeMenuItemAction(action.payload))
    } else {
      yield put(addMenuItemAction(menu))
    }
    yield put(setPinAction(index))
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Set Filters
 */
const setFiltersSaga = function * () {
  try {
    yield put(loadCompetencyAction())
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * On selecting particular Level, load activities belonging to that level
 * @param {Object} action - Redux action
 */
const onLevelSelectSaga = function * (action) {
  try {
    const state = yield select()
    let levels = state.competency.levels
    const lvls = filter(levels, level => level.compId === action.payload.competencyId && level.subCompId === action.payload.subCompetencyId)[0]
    if (lvls) {
      map(lvls.items, (level) => {
        level.active = level.id === action.payload.levelId
      })
      yield put(setLevels(lvls))
      yield put(loadActivitiesAction({compId: action.payload.competencyId, subCompId: action.payload.subCompetencyId, levelId: action.payload.levelId}))
    }
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

export const competencyRootSaga = function * () {
  yield takeLatest(loadCompetencyAction, loadCompetencySaga)
  yield takeLatest(loadSubCompetencyAction, loadSubCompetencySaga)
  yield takeLatest(loadLevelsAction, loadLevelsSaga)
  yield takeLatest(loadActivitiesAction, loadActivitiesSaga)
  yield takeLatest(togglePinAction, togglePinSaga)
  yield takeLatest(onLevelSelectAction, onLevelSelectSaga)
  yield takeLatest(setFiltersAction, setFiltersSaga)
}

/**
 * Reducer
 */
const initialState = {
  data: {},
  subCompetencies: [],
  levels: [],
  activities: [],
  filters: {
    query: ''
  },
  searchFilters: {},
  error: false
}

/** SubCompetency Reducer helper function which checks whether subcompetency is present, if present replace
 * or else add
*/
const combineSubCompetencyReducer = function (state, payload) {
  const index = findIndex(state.subCompetencies, (subCompetency) => subCompetency.compId === payload.compId)
  let subCompetencies = [...state.subCompetencies]
  if (index >= 0) {
    subCompetencies[index] = payload
  } else {
    subCompetencies = subCompetencies.concat([payload])
  }
  return {
    ...state,
    subCompetencies
  }
}

/** Level Reducer helper function which checks whether level is present, if present replace
 * or else add
*/
const combineLevelsReducer = function (state, payload) {
  const index = findIndex(state.levels, (level) => level.compId === payload.compId && level.subCompId === payload.subCompId)
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
  const index = findIndex(state.activities, (activity) => activity.compId === payload.compId && activity.subCompId === payload.subCompId && activity.levelId === payload.levelId)
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

export const competencyReducer = createReducer({
  [setFilterValueAction]: (state, payload) => ({ ...state, filters: { ...state.filters, ...payload } }),
  [setFiltersAction]: (state) => ({ ...state, searchFilters: { ...pickBy(state.filters) } }),
  [setCompetency]: (state, payload) => ({ ...state, data: payload }),
  [setSubCompetency]: (state, payload) => combineSubCompetencyReducer(state, payload),
  [setLevels]: (state, payload) => combineLevelsReducer(state, payload),
  [setActivities]: (state, payload) => combineActivitiesReducer(state, payload),
  [setPinAction]: (state, payload) => ({ ...state,
    data: {
      ...state.data,
      items: [...state.data.items.slice(0, payload), Object.assign({}, state.data.items[payload], {pined: !state.data.items[payload].pined}),
        ...state.data.items.slice(payload + 1)]
    }
  })
}, initialState)
