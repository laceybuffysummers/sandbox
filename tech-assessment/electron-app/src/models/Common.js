import { createAction, createReducer } from 'redux-act'
import { takeLatest, put, call } from 'redux-saga/effects'
import {
  getMasterData,
  getMasterCompetency,
  getMasterGroups,
  getMasterSubGroups,
  getMasterRegions,
  getMasterDivisions,
  getMasterManagers,
  getMasterLevels,
  getMasterProfiles,
  getMasterSubCompetency
} from '../services/Common'

/**
 * Actions
 */
export const loadMasterDataAction = createAction('MASTER_DATA/LOAD')
export const setMasterData = createAction('MASTER_DATA/SET')

/**
 * Load master data
 */
const loadMasterDataSaga = function * () {
  try {
    const masterData = yield call(getMasterData)
    const competenceData = yield call(getMasterCompetency)
    const subCompetenceData = yield call(getMasterSubCompetency)
    const groupsData = yield call(getMasterGroups)
    const subgroupsData = yield call(getMasterSubGroups)
    const regionsData = yield call(getMasterRegions)
    const divisionsData = yield call(getMasterDivisions)
    const managersData = yield call(getMasterManagers)
    const levelsData = yield call(getMasterLevels)
    const profilesData = yield call(getMasterProfiles)
    const data = {
      ...masterData,
      subCompetencies: subCompetenceData,
      profiles: profilesData,
      groups: groupsData,
      managers: managersData,
      levels: levelsData,
      divisions: divisionsData,
      subGroups: subgroupsData,
      regions: regionsData,
      competencies: competenceData
    }
    yield put(setMasterData(data))
  } catch (e) {
    console.log(e)
  }
}
export const commonRootSaga = function * () {
  yield takeLatest(loadMasterDataAction, loadMasterDataSaga)
}

/**
 * Reducer
 */
const initialState = {
  masterData: {}
}
export const commonReducer = createReducer({
  [setMasterData]: (state, payload) => ({...state, masterData: payload})
}, initialState)
