import { connect } from 'react-redux'
import { formValueSelector } from 'redux-form'

import Pure from './pure'
import { loadCompetencyAction, loadSubCompetencyAction, loadLevelsAction, loadActivitiesAction, onLevelSelectAction } from '../../models/Competency'
import {
  editExistingAction,
  addNewAction, saveOrUpdateAction, getBackAction
} from '../../models/CompetencyDetail'

const selector = formValueSelector('competency')
const mapStateToProps = state => {
  return {
    competencies: state.competency.data,
    subCompetencies: state.competency.subCompetencies,
    levels: state.competency.levels,
    activities: state.competency.activities,
    partial: state.competencyDetail.partial,
    add: state.competencyDetail.add,
    edit: state.competencyDetail.edit,
    masterData: state.common.masterData,
    competencyId: selector(state, 'competency'),
    subCompetencyId: selector(state, 'subCompetency')
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadCompetency: () => dispatch(loadCompetencyAction()),
    loadSubCompetency: (compId) => dispatch(loadSubCompetencyAction(compId)),
    loadLevels: (compId, subCompId) => dispatch(loadLevelsAction({compId, subCompId})),
    loadActivitiesAction: (compId, subCompId, levelId) => dispatch(loadActivitiesAction({compId, subCompId, levelId})),
    onLevelSelect: (levelId, subCompetencyId, competencyId) => dispatch(onLevelSelectAction({levelId, subCompetencyId, competencyId})),
    addNew: (type, partial, compId, subCompId, levelId) => dispatch(addNewAction({type, partial, compId, subCompId, levelId})),
    editExisting: (type, compId, subCompId, levelId, activityId) => dispatch(editExistingAction({type, compId, subCompId, levelId, activityId})),
    getBack: () => dispatch(getBackAction()),
    saveOrUpdate: (value) => dispatch(saveOrUpdateAction(value))
  }
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)

export default Home
