import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import {
  ConnectedRouter
} from 'react-router-redux'
import Home from './containers/Home'
import Login from './containers/Login'

import store, { history } from './store'

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Route exact path='/' component={Login} />
            <Route path='/home' component={Home} />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
