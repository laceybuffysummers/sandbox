import React, { Component } from 'react'
import PropsType from 'prop-types'
import { findLast, find, filter } from 'lodash'
import RightSideBar from '../../components/RightSideBar'
import { Content, FlexContent, GutterContent } from '../../components/Container'
import Accordion from '../../components/Accordion'
import FileUpload from '../../components/FileUpload'
import { Heading } from '../../components/FormField'
import Space from '../../components/Space'
import LeftMenu from '../../components/LeftMenu'
import DetailView from './DetailView'
import SubCompetencyFrom from '../SubCompetencyFrom'

class Pure extends Component {
  componentDidMount () {
    this.props.loadCompetency()
  }

  componentDidUpdate (prevProps) {
    const { competencyId, subCompetencyId, levelId, loadSubCompetency, loadLevels, loadActivitiesAction } = this.props
    // Comparing competency ids to check whether page changes, if changed load appropriate data
    if (competencyId && prevProps.competencyId !== competencyId) {
      loadSubCompetency(competencyId)
    }
    // Comparing sub competency ids to check whether page changes, if changed load appropriate data
    if (competencyId && subCompetencyId && prevProps.subCompetencyId !== subCompetencyId) loadLevels(competencyId, subCompetencyId)
    // Comparing level ids to check whether page changes, if changed load appropriate data
    if (competencyId && subCompetencyId && levelId && prevProps.levelId !== levelId) loadActivitiesAction(competencyId, subCompetencyId, levelId)
  }

  // Filter sub competencies by competency id
  getSubCompetencies (subCompetencies, compId) {
    const tempSubCompetencies = filter(subCompetencies, subCompetency => subCompetency.compId === compId)[0]
    return tempSubCompetencies ? tempSubCompetencies.items : []
  }

  // Find selected sub competency id
  findSubCompetencyId (subCompetencies, compId) {
    const tempSubCompetencies = this.getSubCompetencies(subCompetencies, compId)
    if (tempSubCompetencies) { return findLast(tempSubCompetencies, { active: true }) && findLast(tempSubCompetencies, { active: true }).id }
    return 0
  }

  // Fetch levels according to Competency/SubCompetency pair
  getLevels (subCompetencies, levels, compId) {
    const subCompetencyId = this.findSubCompetencyId(subCompetencies, compId)
    const lvls = filter(levels, level => level.compId.toString() === compId.toString() && level.subCompId.toString() === subCompetencyId.toString())[0]
    return lvls ? lvls.items : []
  }

  // Fetch activities according to Competency/SubCompetency/Level pair
  getActivities (subCompetencies, compId, levelId) {
    const { loadActivitiesAction } = this.props
    const subCompetencyId = this.findSubCompetencyId(subCompetencies, compId)
    loadActivitiesAction(compId, subCompetencyId, levelId)
  }

  // Filter activity and find right activities belonging to particular Competency/SubCompetency/Level
  getFilteredActivity (subCompetencies, compId, levelId) {
    const { activities } = this.props
    const subCompetencyId = this.findSubCompetencyId(subCompetencies, compId)
    let filteredActivity = filter(activities, activity => activity.compId.toString() === compId.toString() && activity.subCompId.toString() === subCompetencyId && activity.levelId.toString() === levelId)[0]
    filteredActivity = filteredActivity ? filteredActivity.items : []
    // this.getEmployees(filteredActivity, subCompetencyId, compId, levelId)
    return filteredActivity
  }

  // Filter employees and find right employees belonging to particular Competency/SubCompetency/Level
  getFilteredEmployees (subCompetencies, compId, levelId, itemsFlag) {
    const { employees } = this.props
    const subCompetencyId = this.findSubCompetencyId(subCompetencies, compId)
    const activities = this.getFilteredActivity(subCompetencies, compId, levelId)
    if (activities.length > 0) {
      const activeActivity = find(activities, activity => activity.active)
      const filteredEmployees = filter(employees, employee => employee.compId.toString() === compId.toString() && employee.subCompId.toString() === subCompetencyId && employee.levelId.toString() === levelId && employee.activityId.toString() === activeActivity.id.toString())[0]
      if (filteredEmployees) {
        return itemsFlag ? filteredEmployees.items : filteredEmployees.checked
      }
      return []
    }
  }

  render () {
    const { data, selectSubCompetency, onUpload, uploadFailed, selectEmployeeActivity, setCompleted, setBulkCompleted, selectAllEmployee, selectEmployee, loadSubCompetency, subCompetencies, levels, activities, competencyId, subCompetencyId, levelId, add, edit, addNew, getBack, saveOrUpdate } = this.props
    // Find appropriate sub competencies from available sub competencies
    const subComp = filter(subCompetencies, (subCompetency) => subCompetency.compId === competencyId)[0]
    // Find appropriate levels belonging to particular competency/sub competency group
    const lvls = filter(levels, (level) => level.compId === competencyId && level.subCompId === subCompetencyId)[0]
    // Find appropriate activities belonging to particular competency/sub competency/level group
    const act = filter(activities, (activity) => activity.compId === competencyId && activity.subCompId === subCompetencyId && activity.levelId === levelId)[0]
    return (<React.Fragment>
      <Content>
        <GutterContent>
          <Space vspace={20} />
          <Heading>Employee Competency Management <FileUpload onUpload={onUpload} error={uploadFailed} /></Heading>
          <Space vspace={20} />
          { data && data.items && data.items.map((competency, i) => (<Accordion key={i} open={competency.active} type='primary' category='empCompetency' title={competency.name} onHeaderClick={() => {
            loadSubCompetency(competency.id)
          }}>
            <FlexContent>
              <LeftMenu parentId={competency.id} onSelect={selectSubCompetency} items={this.getSubCompetencies(subCompetencies, competency.id)} onAdd={false} />
              <DetailView
                selectAllEmployee={(subCompId, levelId, checked) => selectAllEmployee(competency.id, subCompId, levelId, checked)}
                selectEmployee={(empId, checked, subCompId, levelId) => selectEmployee(competency.id, subCompId, levelId, empId, checked)}
                setCompleted={(employeeEID, subCompId, levelId) => setCompleted(employeeEID, competency.id, subCompId, levelId)}
                selectEmployeeActivity={(subCompetencyId, levelId, activityId) => selectEmployeeActivity(competency.id, subCompetencyId, levelId, activityId)}
                setBulkCompleted={(subCompId, levelId) => setBulkCompleted(competency.id, subCompId, levelId)}
                subCompetencyId={this.findSubCompetencyId(subCompetencies, competency.id)}
                levels={this.getLevels(subCompetencies, levels, competency.id)}
                loadActivity={(levelId) => this.getActivities(subCompetencies, competency.id, levelId)}
                getFilteredActivity={(levelId) => this.getFilteredActivity(subCompetencies, competency.id, levelId)}
                getFilteredEmployees={(levelId, items) => this.getFilteredEmployees(subCompetencies, competency.id, levelId, items)} />
            </FlexContent>
          </Accordion>)) }
          <Space vspace={20} />
        </GutterContent>
      </Content>
      <RightSideBar>
        <SubCompetencyFrom
          add={add}
          edit={edit}
          addNew={addNew}
          masterdata={data ? data.items : []}
          subCompetencies={subComp ? subComp.items : []}
          levels={lvls ? lvls.items : []}
          activities={act ? act.items : []}
          onSubmit={saveOrUpdate}
          getBack={getBack}
          employeeComp />
      </RightSideBar>
    </React.Fragment>)
  }
}

Pure.propsType = {
  data: PropsType.array,
  selectSubCompetancy: PropsType.func,
  setCompleted: PropsType.func,
  onUpload: PropsType.func,
  uploadFailed: PropsType.bool,
  setBulkCompleted: PropsType.func,
  selectAllEmployee: PropsType.func,
  selectEmployee: PropsType.func,
  loadSubCompetency: PropsType.func,
  subCompetencies: PropsType.array,
  levels: PropsType.array
}

export default Pure
