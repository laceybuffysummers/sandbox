import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import createHistory from 'history/createHashHistory'
import { reducer as formReducer } from 'redux-form'
import { authReducer, authRootSaga } from './models/Authentication'
import { userReducer, userRootSaga } from './models/User'
import { commonReducer, commonRootSaga } from './models/Common'
import { employeeRootSaga, employeeReducer } from './models/Employee'
import { employeeCompetencyRootSaga, employeeCompetencyReducer } from './models/EmployeeCompetency'
import { competencyRootSaga, competencyReducer } from './models/Competency'
import { competencyDetailRootSaga, competencyDetailReducer } from './models/CompetencyDetail'
import { statisticRootSaga, statisticReducer } from './models/Aggregation'

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory()
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

// Build the middleware for intercepting and dispatching navigation actions
const routeMiddleware = routerMiddleware(history)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  combineReducers({
    authentication: authReducer,
    user: userReducer,
    common: commonReducer,
    routing: routerReducer,
    employee: employeeReducer,
    form: formReducer,
    employeeCompetency: employeeCompetencyReducer,
    competency: competencyReducer,
    competencyDetail: competencyDetailReducer,
    statistic: statisticReducer
  }),
  composeEnhancers(applyMiddleware(routeMiddleware, sagaMiddleware))
)

// then run the saga
const rootSagas = [
  authRootSaga,
  userRootSaga,
  commonRootSaga,
  employeeRootSaga,
  employeeCompetencyRootSaga,
  competencyDetailRootSaga,
  competencyRootSaga,
  statisticRootSaga
]
rootSagas.forEach(sagaMiddleware.run)

export default store
