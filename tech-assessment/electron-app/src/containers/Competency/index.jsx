import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { formValueSelector } from 'redux-form'

import Pure from './pure'
import { loadCompetencyAction,
  setFilterValueAction,
  togglePinAction,
  setFiltersAction,
  loadSubCompetencyAction,
  loadLevelsAction } from '../../models/Competency'
import { addNewAction, editExistingAction, getBackAction, saveOrUpdateAction } from '../../models/CompetencyDetail'

const selector = formValueSelector('competency')
const mapStateToProps = state => {
  return {
    data: state.competency.data,
    subCompetencies: state.competency.subCompetencies,
    levels: state.competency.levels,
    add: state.competencyDetail.add,
    edit: state.competencyDetail.edit,
    filters: state.competency.filters,
    masterData: state.common.masterData,
    competencyId: selector(state, 'competency'),
    subCompetencyId: selector(state, 'subCompetency')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    viewCompetency: (id) => dispatch(push(`/home/competency/${id}`)),
    togglePin: (id) => dispatch(togglePinAction(id)),
    loadCompetency: () => dispatch(loadCompetencyAction()),
    loadSubCompetency: (compId) => dispatch(loadSubCompetencyAction(compId)),
    loadLevels: (compId, subCompId) => dispatch(loadLevelsAction({compId: compId, subCompId: subCompId})),
    setFilterValue: (payload) => dispatch(setFilterValueAction(payload)),
    addNew: (type, partial, compId, subCompId, levelId) => dispatch(addNewAction({type, partial, compId, subCompId, levelId})),
    editExisting: (type, compId, subCompId, levelId, activityId) => dispatch(editExistingAction({type, compId, subCompId, levelId, activityId})),
    getBack: () => dispatch(getBackAction()),
    saveOrUpdate: (value) => dispatch(saveOrUpdateAction(value)),
    setFilter: () => dispatch(setFiltersAction())
  }
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)

export default Home
