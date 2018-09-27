import { connect } from 'react-redux'
import {
  searchUserAction,
  setPagination,
  addUserAction,
  getUserAction,
  getToDetailViewAction,
  saveOrUpdateAction,
  setFilterValueAction,
  resetSearchUserAction,
  setFiltersAction,
  editUserAction
} from '../../models/User'
import Pure from './pure'

const mapStateToProps = state => {
  return {
    data: state.user,
    masterData: state.common.masterData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchUser: () => dispatch(searchUserAction()),
    editUser: (id) => dispatch(editUserAction(id)),
    getUser: (id) => dispatch(getUserAction(id)),
    addUser: () => dispatch(addUserAction()),
    saveOrUpdate: (value) => dispatch(saveOrUpdateAction(value)),
    getToDetailView: () => dispatch(getToDetailViewAction()),
    setFilterValue: (payload) => dispatch(setFilterValueAction(payload)),
    setFilter: () => dispatch(setFiltersAction()),
    setPagination: (page) => dispatch(setPagination(page)),
    resetFilter: () => dispatch(resetSearchUserAction())
  }
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)

export default Home
