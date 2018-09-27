import React, { Component } from 'react'
import PropsType from 'prop-types'
import { filter } from 'lodash'
import RightSideBar from '../../components/RightSideBar'
import { Content, GutterContent } from '../../components/Container'
import Filter from '../../components/Filter'
import { SubHeading } from '../../components/FormField'
import Space from '../../components/Space'
import CompetencyItems from '../../components/CompetencyItems'
import SubCompetencyFrom from '../SubCompetencyFrom'

class Pure extends Component {
  componentDidMount () {
    this.props.loadCompetency()
  }

  componentDidUpdate (prevProps) {
    const { competencyId, subCompetencyId, loadSubCompetency, loadLevels } = this.props
    // Comparing competency ids to check whether page changes, if changed load appropriate data
    if (competencyId && prevProps.competencyId !== competencyId) {
      loadSubCompetency(competencyId)
    }
    if (competencyId && subCompetencyId && prevProps.subCompetencyId !== subCompetencyId) loadLevels(competencyId, subCompetencyId)
  }

  render () {
    const { filters, setFilterValue, setFilter, data, viewCompetency, togglePin, getBack, edit, add, addNew, editExisting, saveOrUpdate, competencyId, subCompetencyId, subCompetencies, levels } = this.props
    // Find appropriate sub competencies from available sub competencies
    const subComp = filter(subCompetencies, (subCompetency) => subCompetency.compId === competencyId)[0]
    // Find appropriate levels belonging to particular competency/sub competency group
    const lvls = filter(levels, (level) => level.compId === competencyId && level.subCompId === subCompetencyId)[0]
    return (<React.Fragment>
      <Content>
        <Filter showFilter={false} queryChange={(value) => setFilterValue({query: value})} query={filters.query} doFilter={setFilter} />
        <GutterContent>
          <SubHeading className='blue-heading add-new'>competencies <div className='add-new-btn' onClick={() => addNew('COMPETENCY', false)}>Add New</div></SubHeading>
          <Space vspace={20} />
          <CompetencyItems
            viewCompetency={viewCompetency}
            togglePin={togglePin}
            edit={editExisting}
            competencies={data.items} />
          <Space vspace={20} />
        </GutterContent>
      </Content>
      <RightSideBar>
        <SubCompetencyFrom
          subCompetencies={subComp ? subComp.items : []}
          levels={lvls ? lvls.items : []}
          onSubmit={saveOrUpdate} masterdata={data.items} addNew={(type, partial) => addNew(type, partial)} getBack={getBack} add={add} edit={edit} />
      </RightSideBar>
    </React.Fragment>)
  }
}

Pure.propsType = {
  filters: PropsType.object,
  setFilter: PropsType.func,
  setFilterValue: PropsType.func,
  data: PropsType.array,
  viewCompetency: PropsType.func,
  subCompetencies: PropsType.array,
  levels: PropsType.array,
  togglePin: PropsType.func,
  getBack: PropsType.func,
  addNew: PropsType.func,
  saveOrUpdate: PropsType.func,
  masterData: PropsType.object,
  add: PropsType.bool,
  edit: PropsType.bool
}

export default Pure
