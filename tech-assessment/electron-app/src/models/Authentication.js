import { createAction, createReducer } from 'redux-act'
import { takeLatest, put, call, select } from 'redux-saga/effects'
import { map, remove, findIndex } from 'lodash'
import { push } from 'react-router-redux'
import { login, setAuthToken, getAuthToken, removeAuthToken } from '../services/Authentication'
import { LOCATION_CHANGE } from 'react-router-redux/reducer'
import jwtDecode from '../helpers/jwtDecode'
import directorMenu from '../constant/menu-DIRECTOR'
import leaderMenu from '../constant/menu-LEADER'
import managerMenu from '../constant/menu-MANAGER'

/**
 * Actions
 */
export const loginAction = createAction('LOGIN')
export const checkLoggedInAction = createAction('CHECK_LOGGED_IN')
export const loadMenuDataAction = createAction('MENU_DATA/LOAD')
export const errorAction = createAction('LOGIN/ERROR')
export const setMenu = createAction('MENU/SET')
export const expandMenuAction = createAction('MENU/EXPAND')
export const setActiveMenu = createAction('MENU_ACTIVE/SET')
export const removeMenuItemAction = createAction('MENU_ACTIVE/REMOVE')
export const addMenuItemAction = createAction('MENU_ACTIVE/ADD')
export const setLoginDetail = createAction('LOGIN/SET')
export const setLoginFailed = createAction('LOGIN/FAILED')
export const logoutAction = createAction('LOGOUT')
export const reset = createAction('LOGIN/RESET')

/**
 * Login
 * @param {Object} action - Redux action
 */
const loginSaga = function * (action) {
  try {
    const response = yield call(login, action.payload)
    if (response.status === 200) {
      const {token} = response.data
      yield call(setAuthToken, token)
      const user = jwtDecode(token)
      yield put(setLoginDetail(user))
      if (user.role === 'Leader') {
        yield put(push('/home/user'))
      } else {
        yield put(push('/home/aggregatetotal'))
      }
    } else {
      yield put(setLoginFailed())
    }
  } catch (e) {
    yield put(setLoginFailed())
  }
}

/**
 * Check whether user is logged in or not, if logged in, redirect user according to role
 */
const checkLoggedInSaga = function * () {
  try {
    const state = yield select()
    const { authentication } = state
    const { user } = authentication
    if (user.role) {
      if (user.role === 'Leader') yield put(push('/home/user'))
      else yield put(push('/home/aggregatetotal'))
    } else {
      // If user role is not present, the user might still be logged in, so checking whether JWT token is present
      if (getAuthToken()) {
        yield call(setAuthToken, getAuthToken())
        const user = jwtDecode(getAuthToken())
        yield put(setLoginDetail(user))
        yield put(loadMenuDataAction())
        if (user.role === 'Leader') yield put(push('/home/user'))
        else yield put(push('/home/aggregatetotal'))
      }
    }
    yield put(errorAction(false))
  } catch (e) {
    yield put(errorAction(true))
  }
}

/**
 * Load Masterdata i.e., menu data
 * All the data is written to localStorage
 */
const loadMasterDataSaga = function * () {
  const state = yield select()
  if (state.authentication.user.role) {
    if (!localStorage.getItem('menu')) { // eslint-disable-line
      switch (state.authentication.user.role.toLowerCase()) {
        case 'leader':
          localStorage.setItem('menu', JSON.stringify(leaderMenu)) // eslint-disable-line
          break
        case 'director':
          localStorage.setItem('menu', JSON.stringify(directorMenu)) // eslint-disable-line
          break
        case 'manager':
          localStorage.setItem('menu', JSON.stringify(managerMenu)) // eslint-disable-line
          break
        default:
          yield put(push('/'))
      }
    }
    yield put(setMenu(JSON.parse(localStorage.getItem('menu')))) // eslint-disable-line
  } else {
    if (getAuthToken()) {
      yield call(setAuthToken, getAuthToken())
      const user = jwtDecode(getAuthToken())
      yield put(setLoginDetail(user))
      yield put(loadMenuDataAction())
    } else {
      yield put(push('/'))
    }
  }
}

/**
 * remove menu item
 * @param {Object} action - Redux action
 */
const removeMenuItemSaga = function * (action) {
  let menu = JSON.parse(localStorage.getItem('menu')) // eslint-disable-line
  menu = map(menu, (item, i) => {
    if (i === 1) {
      remove(item.nodes, (node) => node.id === action.payload)
    }
    return item
  })
  localStorage.setItem('menu', JSON.stringify(menu)) // eslint-disable-line
  yield put(setMenu(menu))
}

/**
 * add menu item
 * @param {Object} action - Redux action
 */
const addMenuItemSaga = function * (action) {
  let menu = JSON.parse(localStorage.getItem('menu')) // eslint-disable-line
  menu = map(menu, (item, i) => {
    if (i === 1) {
      // Check whether item is already added to menu list, only add if not present
      const index = findIndex(item.nodes, node => node.id === action.payload.id)
      if (index === -1) item.nodes.splice(item.nodes.length - 1, 0, action.payload)
    }
    return item
  })
  localStorage.setItem('menu', JSON.stringify(menu)) // eslint-disable-line
  yield put(setMenu(menu))
}

/**
 * Location change
 * @param {Object} action - Redux action
 */
const changeLocationSaga = function * (action) {
  yield put(setActiveMenu(action.payload.pathname))
}

/**
 * Log out Saga
 */
const logoutSaga = function * () {
  localStorage.clear() // eslint-disable-line
  yield call(removeAuthToken)
  yield put(reset())
  yield put(push('/'))
}

/**
 * Auth Root Saga
 */
export const authRootSaga = function * () {
  yield takeLatest(loginAction, loginSaga)
  yield takeLatest(checkLoggedInAction, checkLoggedInSaga)
  yield takeLatest(loadMenuDataAction, loadMasterDataSaga)
  yield takeLatest(removeMenuItemAction, removeMenuItemSaga)
  yield takeLatest(addMenuItemAction, addMenuItemSaga)
  yield takeLatest(LOCATION_CHANGE, changeLocationSaga)
  yield takeLatest(logoutAction, logoutSaga)
}

/**
 * Initial Reducer State
 */
const initialState = {
  user: {},
  menu: [],
  activeMenu: '',
  fail: false,
  error: false
}
export const authReducer = createReducer({
  [setLoginDetail]: (state, payload) => ({...state, user: payload, fail: false}),
  [setLoginFailed]: (state) => ({...state, fail: true, user: {}}),
  [setMenu]: (state, payload) => ({...state, menu: payload}),
  [setActiveMenu]: (state, payload) => ({...state, activeMenu: payload}),
  [expandMenuAction]: (state, payload) => ({
    ...state,
    menu: [...state.menu.slice(0, payload), Object.assign({}, state.menu[payload], {expand: !state.menu[payload].expand}),
      ...state.menu.slice(payload + 1)]
  }),
  [reset]: () => ({...initialState}),
  [errorAction]: (state, payload) => ({ ...state, error: payload })
}, initialState)
