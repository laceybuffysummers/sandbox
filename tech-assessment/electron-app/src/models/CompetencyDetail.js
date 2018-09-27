import { createAction, createReducer } from 'redux-act'
import { pickBy, filter } from 'lodash'
import { initialize } from 'redux-form'
import { takeLatest, put, call, select } from 'redux-saga/effects'
import { loadCompetencyAction, loadSubCompetencyAction, loadLevelsAction, loadActivitiesAction } from './Competency'
import { saveActivity, updateActivity, saveCompetency, updateCompetency, saveSubCompetency, updateSubCompetency, saveLevel, updateLevel } from '../services/CompetencyDetail'

/**
 * Actions
 */
export const setFilterValueAction = createAction('COMPETENCY_DETAIL_FILTER_VALUE/SET')
export const setFiltersAction = createAction('COMPETENCY_DETAIL_FILTER/SET')
export const setCompetency = createAction('COMPETENCY_DETAIL/SET')
export const addNewAction = createAction('COMPETENCY_DETAIL/ADD')
export const editExistingAction = createAction('COMPETENCY_DETAIL/EDIT')
export const getBackAction = createAction('COMPETENCY_DETAIL/GO_BACK')
export const saveOrUpdateAction = createAction('COMPETENCY_DETAIL/SAVE_UPDATE')
export const errorAction = createAction('COMPETENCY_DETAIL/ERROR')

/**
 * Save or update Sub competency or Level
 * @param {Object} action - Redux action
 */
const saveOrUpdateSaga = function * (action) {
  try {
    const state = yield select()
    const add = state.competencyDetail.add
    const edit = state.competencyDetail.edit
    if (add === 'ACTIVITY' || edit === 'ACTIVITY') {
      const compId = action.payload.competency
      const subCompId = action.payload.subCompetency
      const level = action.payload.level
      delete action.payload.competency
      delete action.payload.subCompetency
      delete action.payload.level
      if (edit === 'ACTIVITY') {
        const activityId = Number(action.payload.activityId)
        delete action.payload.activityId
        yield call(updateActivity, compId, subCompId, level, activityId, action.payload)
      }
      if (add === 'ACTIVITY') yield call(saveActivity, compId, subCompId, level, action.payload)
      yield put(loadActivitiesAction({compId, subCompId, levelId: level}))
    } else if (add === 'COMPETENCY' || edit === 'COMPETENCY') {
      if (edit === 'COMPETENCY') {
        const compId = action.payload.competency
        delete action.payload.competency
        yield call(updateCompetency, compId, action.payload)
      }
      if (add === 'COMPETENCY') yield call(saveCompetency, action.payload)
      yield put(loadCompetencyAction())
    } else if (add === 'SUB_COMPETENCY' || edit === 'SUB_COMPETENCY') {
      const compId = action.payload.competency
      delete action.payload.competency
      if (edit === 'SUB_COMPETENCY') {
        const subCompId = action.payload.subCompetency
        delete action.payload.subCompetency
        yield call(updateSubCompetency, compId, subCompId, action.payload)
      }
      if (add === 'SUB_COMPETENCY') yield call(saveSubCompetency, compId, action.payload)
      yield put(loadSubCompetencyAction(compId))
    } else if (add === 'LEVEL' || edit === 'LEVEL') {
      const compId = action.payload.competency
      const subCompId = action.payload.subCompetency
      delete action.payload.competency
      delete action.payload.subCompetency
      if (edit === 'LEVEL') {
        const levelId = action.payload.levelId
        delete action.payload.levelId
        yield call(updateLevel, compId, subCompId, levelId, action.payload)
      }
      if (add === 'LEVEL') {
        yield call(saveLevel, compId, subCompId, action.payload)
      }
      yield put(loadLevelsAction({compId, subCompId}))
    }
    yield put(getBackAction())
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Load activity for Edit
 * @param {Object} action - Redux action
 */
const editExistingSaga = function * (action) {
  try {
    const state = yield select()
    let activityForm
    switch (action.payload.type) {
      case 'COMPETENCY':
        const competency = filter(state.competency.data.items, competency => competency.id === action.payload.compId)[0]
        if (competency) {
          activityForm = {
            competency: action.payload.compId,
            name: competency.name,
            description: competency.description
          }
        }
        break
      case 'SUB_COMPETENCY':
        const subCompetencies = filter(state.competency.subCompetencies, subCompetency => subCompetency.compId.toString() === action.payload.compId.toString())[0]
        if (subCompetencies) {
          const subCompetency = filter(subCompetencies.items, subCompetency => subCompetency.id.toString() === action.payload.subCompId.toString())[0]
          activityForm = {
            competency: action.payload.compId,
            subCompetency: action.payload.subCompId,
            name: subCompetency.name,
            description: subCompetency.description
          }
        }
        break
      case 'LEVEL':
        const levels = filter(state.competency.levels, level => level.compId.toString() === action.payload.compId.toString() && level.subCompId.toString() === action.payload.subCompId.toString())[0]
        if (levels) {
          const level = filter(levels.items, level => level.id.toString() === action.payload.levelId.toString())[0]
          activityForm = {
            competency: action.payload.compId.toString(),
            subCompetency: action.payload.subCompId.toString(),
            levelId: action.payload.levelId.toString(),
            level: level.level,
            name: level.name,
            description: level.description
          }
        }
        break
      case 'ACTIVITY':
        const activities = filter(state.competency.activities, activity => activity.compId.toString() === action.payload.compId.toString() && activity.subCompId.toString() === action.payload.subCompId.toString() && activity.levelId.toString() === action.payload.levelId.toString())[0]
        if (activities) {
          const activity = filter(activities.items, activity => activity.id === action.payload.activityId)[0]
          activityForm = {
            competency: action.payload.compId,
            subCompetency: action.payload.subCompId,
            level: action.payload.levelId.toString(),
            activityId: action.payload.activityId,
            name: activity.name,
            skillAcquired: activity.skillAcquired,
            lifeExperience: activity.lifeExperience
          }
        }
        break
      default:
        activityForm = {}
    }
    yield put(initialize('competency', activityForm))
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Add new
 * @param {Object} action - Redux action
 */
const addNewSaga = function * (action) {
  try {
    if (action.payload.partial) {
      if (action.payload.type) {
        let activityForm
        switch (action.payload.type) {
          case 'ACTIVITY':
            activityForm = {
              competency: action.payload.compId.toString(),
              subCompetency: action.payload.subCompId.toString(),
              level: action.payload.levelId.toString()
            }
            break
          case 'LEVEL':
            activityForm = {
              competency: action.payload.compId.toString(),
              subCompetency: action.payload.subCompId.toString()
            }
            break
          case 'SUB_COMPETENCY':
            activityForm = {
              competency: action.payload.compId.toString()
            }
            break
          default:
            activityForm = {}
        }
        yield put(initialize('competency', activityForm))
      }
    } else {
      yield put(initialize('competency', {}))
    }
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}
/**
 * Set Filters
 */
const setFiltersSaga = function * (action) {
  try {
    yield put(loadSubCompetencyAction(action.payload))
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

export const competencyDetailRootSaga = function * () {
  yield takeLatest(setFiltersAction, setFiltersSaga)
  yield takeLatest(saveOrUpdateAction, saveOrUpdateSaga)
  yield takeLatest(editExistingAction, editExistingSaga)
  yield takeLatest(addNewAction, addNewSaga)
}

/**
 * Reducer
 */
const initialState = {
  data: {},
  filters: {
    query: ''
  },
  add: null,
  edit: null,
  partial: false,
  searchFilters: {},
  error: false
}
export const competencyDetailReducer = createReducer({
  [setFilterValueAction]: (state, payload) => ({ ...state, filters: { ...state.filters, ...payload } }),
  [setFiltersAction]: (state) => ({ ...state, searchFilters: { ...pickBy(state.filters) } }),
  [setCompetency]: (state, payload) => ({ ...state, data: payload }),
  [addNewAction]: (state, payload) => ({ ...state, add: payload.type, edit: null, partial: payload.partial }),
  [editExistingAction]: (state, payload) => ({ ...state, add: null, edit: payload.type, partial: true }),
  [getBackAction]: (state) => ({ ...state, add: null, edit: null, partial: false }),
  [errorAction]: (state, payload) => ({ ...state, error: payload })
}, initialState)
