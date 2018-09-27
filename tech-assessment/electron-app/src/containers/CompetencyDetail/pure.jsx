import React, { Component } from 'react'
import PropsType from 'prop-types'
import { map, filter } from 'lodash'
import RightSideBar from '../../components/RightSideBar'
import { Content, GutterContent, FlexContent } from '../../components/Container'
import Accordion from '../../components/Accordion'
import { SubHeading, CompetencyHeading } from '../../components/FormField'
import Space from '../../components/Space'
import LeftMenu from '../../components/LeftMenu'
import Activity from './Activity'
import findLast from 'lodash/findLast'
import SubCompetencyFrom from '../SubCompetencyFrom'

class Pure extends Component {
  componentDidMount () {
    this.props.loadCompetency()
    const compId = this.props.match.params.id
    this.props.loadSubCompetency(compId)
  }

  componentDidUpdate (prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) this.props.loadSubCompetency(this.props.match.params.id)
  }

  // Load level data
  getLevels (levels, compId, subCompId) {
    const lvls = filter(levels, level => level.compId === compId && level.subCompId === subCompId)[0]
    return lvls ? lvls.items : []
  }

  // Load activity data
  getActivities (activities, compId, subCompId, levels) {
    const levelId = this.getLevelDetails(levels, compId, subCompId)
    const actvtes = filter(activities, activity => activity.compId.toString() === compId.toString() && activity.subCompId.toString() === subCompId.toString() && activity.levelId.toString() === levelId.toString())[0]
    return actvtes ? actvtes.items : []
  }

  // Find Level ID
  getLevelDetails (levels, compId, subCompId) {
    const currentLevels = this.getLevels(levels, compId, subCompId)
    if (currentLevels.length > 0) { return Number(findLast(currentLevels, { active: true }) && findLast(currentLevels, { active: true }).id) }
    return 0
  }

  render () {
    const { subCompetencyId, subCompetencies, levels, onLevelSelect, saveOrUpdate, addNew, editExisting, getBack, edit, add, partial, loadLevels, match, activities, competencies } = this.props
    const subComp = filter(subCompetencies, (subCompetency) => subCompetency.compId === match.params.id)[0]
    const lvls = filter(levels, (level) => level.compId === match.params.id && level.subCompId === subCompetencyId)[0]
    const competency = filter(competencies.items, competency => competency.id.toString() === match.params.id.toString())[0]
    return (<React.Fragment>
      <Content>
        <GutterContent>
          <SubHeading className='blue-heading add-new'>COMPETENCIES <div className='add-new-btn' onClick={() => addNew('SUB_COMPETENCY', true, match.params.id)}>Add New</div></SubHeading>
          { competency && <CompetencyHeading title={competency.name} description={competency.description} /> }
          <Space vspace={20} />
          { subComp && map(subComp.items, (subcompetency, i) => (<Accordion key={i} open={subcompetency.active} type='primary primary-special' category='subcompetency' title={subcompetency.name} onHeaderClick={() => {
            loadLevels(match.params.id, subcompetency.id)
          }} actionLabel={'Edit'} onAdd={() => editExisting('SUB_COMPETENCY', match.params.id, subcompetency.id)}>
            <FlexContent>
              <LeftMenu addLabel='Add New Level' compId={match.params.id} parentId={subcompetency.id} onSelect={onLevelSelect} items={this.getLevels(levels, match.params.id, subcompetency.id)} onAdd={() => addNew('LEVEL', true, match.params.id, subcompetency.id)} onEdit={() => editExisting('LEVEL', match.params.id, subcompetency.id, this.getLevelDetails(levels, match.params.id, subcompetency.id))} />
              <Activity
                onAdd={(type, compId, subCompId, levelId) => addNew(type, true, compId, subCompId, levelId)}
                onEdit={editExisting}
                competencyId={match.params.id}
                subCompetencyId={subcompetency.id}
                levelId={this.getLevelDetails(levels, match.params.id, subcompetency.id)}
                activities={this.getActivities(activities, match.params.id, subcompetency.id, levels)} />
            </FlexContent>
          </Accordion>)) }
        </GutterContent>
      </Content>
      <RightSideBar>
        <SubCompetencyFrom
          subCompetencies={subComp ? subComp.items : []}
          levels={lvls ? lvls.items : []}
          disabled={partial}
          onSubmit={saveOrUpdate} masterdata={competencies.items} addNew={addNew} getBack={getBack} add={add} edit={edit} />
      </RightSideBar>
    </React.Fragment>)
  }
}

Pure.propsType = {
  filters: PropsType.object,
  setFilter: PropsType.func,
  setFilterValue: PropsType.func,
  competencyId: PropsType.string,
  subCompetencyId: PropsType.string,
  subCompetencies: PropsType.array,
  levels: PropsType.array,
  data: PropsType.object,
  onLevelSelect: PropsType.func,
  saveOrUpdate: PropsType.func,
  masterData: PropsType.object,
  addNew: PropsType.func,
  editExisting: PropsType.func,
  getBack: PropsType.func,
  edit: PropsType.bool,
  add: PropsType.bool,
  partial: PropsType.bool
}

export default Pure
