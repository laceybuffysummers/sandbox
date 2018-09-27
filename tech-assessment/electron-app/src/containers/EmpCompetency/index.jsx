import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'
import Pure from './pure'
import { loadCompetencyAction,
  loadSubCompetencyAction,
  loadLevelsAction,
  loadActivitiesAction,
  loadEmployeesAction,
  uploadCompetencyAction,
  setCompletedAction,
  setBulkCompletedAction,
  selectEmployeeActivityAction,
  selectEmployeeActivityEmpAction,
  selectEmployeeActivityEmpAllAction,
  selectSubCompetencyAction,
  addNewAction,
  getBackAction,
  saveOrUpdateAction } from '../../models/EmployeeCompetency'

const selector = formValueSelector('competency')
const mapStateToProps = state => {
  return {
    data: state.employeeCompetency.data,
    subCompetencies: state.employeeCompetency.subCompetencies,
    levels: state.employeeCompetency.levels,
    activities: state.employeeCompetency.activities,
    employees: state.employeeCompetency.employees,
    uploadFailed: state.employeeCompetency.uploadFailed,
    competencyId: selector(state, 'competency'),
    subCompetencyId: selector(state, 'subCompetency'),
    levelId: selector(state, 'level'),
    add: state.employeeCompetency.add,
    edit: state.employeeCompetency.edit
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCompetency: () => dispatch(loadCompetencyAction()),
    loadSubCompetency: (compId) => dispatch(loadSubCompetencyAction(compId)),
    loadLevels: (compId, subCompId) => dispatch(loadLevelsAction({compId, subCompId})),
    loadActivitiesAction: (compId, subCompId, levelId) => dispatch(loadActivitiesAction({compId, subCompId, levelId})),
    loadEmployeesAction: (compId, subCompId, levelId, activityId) => dispatch(loadEmployeesAction({compId, subCompId, levelId, activityId})),
    selectSubCompetency: (subCompetencyId, competencyId) => dispatch(selectSubCompetencyAction({subCompetencyId, competencyId})),
    selectEmployeeActivity: (compId, subCompId, levelId, activityId) => dispatch(selectEmployeeActivityAction({compId, subCompId, levelId, activityId})),
    onUpload: (payload) => dispatch(uploadCompetencyAction(payload)),
    addNew: (type, partial, compId, subCompId, levelId) => dispatch(addNewAction({type, partial, compId, subCompId, levelId})),
    getBack: () => dispatch(getBackAction()),
    saveOrUpdate: (value) => dispatch(saveOrUpdateAction(value)),
    setCompleted: (employeeId, competencyId, subCompetencyId, levelId) => dispatch(setCompletedAction({employeeId, competencyId, subCompetencyId, levelId})),
    setBulkCompleted: (compId, subCompId, levelId) => dispatch(setBulkCompletedAction({compId, subCompId, levelId})),
    selectAllEmployee: (compId, subCompId, levelId, checked) => dispatch(selectEmployeeActivityEmpAllAction({compId, subCompId, levelId, checked})),
    selectEmployee: (compId, subCompId, levelId, employeeId, checked) => dispatch(selectEmployeeActivityEmpAction({compId, subCompId, levelId, employeeId, checked}))
  }
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)

export default Home
