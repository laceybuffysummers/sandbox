import { connect } from 'react-redux'
import { formValueSelector, change } from 'redux-form'
import { searchEmployeeAction,
  setPagination,
  getEmployeeAction,
  addEmployeeAction,
  editEmployeeAction,
  saveOrUpdateAction,
  getToDetailViewAction,
  setFilterValueAction,
  setFiltersAction,
  setCompetencyAction,
  resetSearchEmployeeAction } from '../../models/Employee'
import { loadCompetencyAction, loadSubCompetencyAction, loadLevelsAction } from '../../models/Competency'
import Pure from './pure'

const selector = formValueSelector('employee')
const mapStateToProps = state => {
  return {
    data: state.employee,
    competencies: state.competency.data,
    subCompetencies: state.competency.subCompetencies,
    levels: state.competency.levels,
    masterData: state.common.masterData,
    competencyId: selector(state, 'competency'),
    subCompetencyId: selector(state, 'subCompetency')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCompetency: () => dispatch(loadCompetencyAction()),
    loadSubCompetency: (compId) => dispatch(loadSubCompetencyAction(compId)),
    loadLevels: (compId, subCompId) => dispatch(loadLevelsAction({compId: compId, subCompId: subCompId})),
    searchEmployee: () => dispatch(searchEmployeeAction()),
    setCompetency: (payload) => dispatch(setCompetencyAction(payload)),
    setPagination: (page) => dispatch(setPagination(page)),
    getEmployee: (id) => dispatch(getEmployeeAction(id)),
    editEmployee: (id) => dispatch(editEmployeeAction(id)),
    setFilterValue: (payload) => dispatch(setFilterValueAction(payload)),
    setFilter: () => dispatch(setFiltersAction()),
    addEmployee: () => dispatch(addEmployeeAction()),
    getToDetailView: () => dispatch(getToDetailViewAction()),
    saveOrUpdate: (value) => dispatch(saveOrUpdateAction(value)),
    resetFilter: () => dispatch(resetSearchEmployeeAction()),
    change: (name, value) => dispatch(change(name, value))
  }
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)

export default Home
