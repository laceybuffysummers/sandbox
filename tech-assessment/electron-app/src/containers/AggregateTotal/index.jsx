import { connect } from 'react-redux'

import Pure from './pure'
import { loadStatisticAction, setFiltersAction, setFilterValueAction,
  loadOptionsAction, setCompetencyAction } from '../../models/Aggregation'

const mapStateToProps = state => {
  return {
    data: state.statistic.data,
    filters: state.statistic.filters,
    searchFilters: state.statistic.searchFilters,
    competencies: state.statistic.competencies,
    subCompetencies: state.statistic.subCompetencies,
    countries: state.statistic.countries,
    divisions: state.statistic.divisions,
    subGroups: state.statistic.subGroups,
    profiles: state.statistic.profiles,
    errorMsg: state.statistic.errorMsg
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadData: () => dispatch(loadStatisticAction()),
    setFilters: () => dispatch(setFiltersAction()),
    setFilterValue: (payload) => dispatch(setFilterValueAction(payload)),
    loadOptions: () => dispatch(loadOptionsAction()),
    setCompetency: (payload) => dispatch(setCompetencyAction(payload))
  }
}

const Home = connect(
  mapStateToProps,
  mapDispatchToProps
)(Pure)

export default Home
