import { createAction, createReducer } from 'redux-act'
import { takeLatest, put, call, select } from 'redux-saga/effects'
import { searchUsers, getUser, saveUser, updateUser } from '../services/User'
import findLast from 'lodash/findLast'
import pickBy from 'lodash/pickBy'
import pick from 'lodash/pick'
import { initialize } from 'redux-form'

const initialState = {
  items: [],
  page: 0,
  pageSize: 10,
  total: 0,
  filters: {
    query: '',
    role: '',
    group: '',
    status: ''
  },
  error: '',
  selected: null,
  details: null
}

/**
 * Actions
 */
export const searchUserAction = createAction('USER/SEARCH')
export const resetSearchUserAction = createAction('USER_SEARCH/RESET')
export const saveOrUpdateAction = createAction('USER_SEARCH/SAVE_UPDATE')
export const getUserAction = createAction('USER/LOAD')
export const editUserAction = createAction('USER/EDIT')
export const addUserAction = createAction('USER/ADD')
export const getToDetailViewAction = createAction('USER/DETAIL_VIEW')
export const setUser = createAction('USER/SET')
export const setSearchResponse = createAction('SEARCH/SET')
export const setFilterField = createAction('FILTER_FIELD/SET')
export const setPagination = createAction('PAGINATION/SET')
export const setFilterValueAction = createAction('FILTER_VALUE/SET')
export const setFiltersAction = createAction('FILTER/SET')
export const setError = createAction('USER/ERROR')

/**
 * Search users
 */
const searchUserSaga = function * () {
  try {
    const state = yield select()
    const {user} = state
    const payload = {
      ...pickBy(user.filters),
      page: user.page,
      pageSize: user.pageSize
    }
    const response = yield call(searchUsers, payload)
    const users = response.data
    yield put(setSearchResponse(users))
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
    yield put(searchUserAction())
  } catch (e) {
    console.log(e)
  }
}

/**
 * Set Filters
 */
const setFiltersSaga = function * () {
  try {
    yield put(searchUserAction())
  } catch (e) {
    console.log(e)
  }
}

/**
 * Get user information
 * @param {Object} action - Redux Action
 */
const getUserSaga = function * (action) {
  try {
    const state = yield select()
    const user = findLast(state.user.items, {EID: action.payload})
    yield put(setUser(user))
  } catch (e) {
    console.log(e)
  }
}

/**
 * Edit user information
 * @param {Object} action - Redux Action
 */
const editUserSaga = function * () {
  try {
    const state = yield select()
    const response = yield call(getUser, state.user.details.EID)
    yield put(setError(''))
    yield put(setUser(response.data))
    yield put(initialize('user', response.data, false, {
      keepDirty: false,
      keepSubmitSucceeded: false,
      keepValues: false
    }))
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
    if (state.user.edit) {
      const payload = pick(action.payload, Object.keys(state.form.user.registeredFields))
      const response = yield call(updateUser, payload)
      yield put(setUser(response.data))
      yield put(setError(''))
    } else {
      yield call(saveUser, action.payload)
      yield put(searchUserAction())
      yield put(setError(''))
    }
    yield put(getToDetailViewAction())
  } catch (e) {
    if (e.response && e.response.data && e.response.data.message) {
      yield put(setError(e.response.data.message))
    }
    console.log(e)
  }
}

/**
 * Reset Filter Employee search
 */
const resetSearchUserSaga = function * () {
  try {
    yield put(searchUserAction())
  } catch (e) {
    console.log(e)
  }
}
export const userRootSaga = function * () {
  yield takeLatest(searchUserAction, searchUserSaga)
  yield takeLatest(setPagination, setPaginationSaga)
  yield takeLatest(getUserAction, getUserSaga)
  yield takeLatest(editUserAction, editUserSaga)
  yield takeLatest(setFiltersAction, setFiltersSaga)
  yield takeLatest(resetSearchUserAction, resetSearchUserSaga)
  yield takeLatest(saveOrUpdateAction, saveOrUpdateSaga)
}

/**
 * Reducer
 */
export const userReducer = createReducer({
  [setFilterField]: (state, payload) => ({...state, filters: payload}),
  [searchUserAction]: (state) => ({...state, items: [], selected: null, details: null}),
  [setPagination]: (state, payload) => ({...state, page: payload}),
  [setSearchResponse]: (state, payload) => ({...state, edit: false, ...payload}),
  [getUserAction]: (state, payload) => ({...state, selected: payload, edit: false, add: false}),
  [setUser]: (state, payload) => {
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
  [editUserAction]: (state) => ({...state, edit: true, add: false}),
  [addUserAction]: (state) => ({...state, add: true, edit: false}),
  [getToDetailViewAction]: (state) => ({...state, add: false, edit: false}),
  [setFilterValueAction]: (state, payload) => ({...state, filters: {...state.filters, ...payload}}),
  [setFiltersAction]: (state) => ({...state, filters: {...pickBy(state.filters)}}),
  [resetSearchUserAction]: (state) => ({...state, filters: {...initialState.filters}}),
  [setError]: (state, payload) => ({ ...state, error: payload })
}, initialState)
