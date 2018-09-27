import { connect } from 'react-redux'
import { loadMenuDataAction, expandMenuAction, logoutAction } from '../../models/Authentication'
import { loadMasterDataAction } from '../../models/Common'
import { push } from 'react-router-redux'
import Pure from './pure'

const mapStateToProps = state => {
  return {
    user: state.authentication.user,
    menu: state.authentication.menu,
    activeMenu: state.authentication.activeMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadMenuData: () => dispatch(loadMenuDataAction()),
    loadMasterData: () => dispatch(loadMasterDataAction()),
    expandMenu: (index) => dispatch(expandMenuAction(index)),
    goTo: (url) => dispatch(push(url)),
    logout: () => dispatch(logoutAction())
  }
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)

export default Home
