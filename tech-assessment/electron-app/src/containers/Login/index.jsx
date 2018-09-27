import { connect } from 'react-redux'
import { loginAction, checkLoggedInAction } from '../../models/Authentication'
import Pure from './pure'

const mapStateToProps = state => {
  return {
    ...state.authentication
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(loginAction({username, password})),
    checkLoggedIn: () => dispatch(checkLoggedInAction())
  }
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)

export default Home
