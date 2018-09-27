import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { filter } from 'lodash'
import LockIcon from '../../../icons/Lock.svg'
import DetailHeader from '../../../components/DetailHeader'
import Field from '../../../components/Field'
import Space from '../../../components/Space'
import Button from '../../../components/Button'
import Form from '../Form'
import './style.css'

class EmployeeDetails extends Component {
  componentDidUpdate (prevProps) {
    const { competencyId, subCompetencyId, loadSubCompetency, loadLevels } = this.props
    // Comparing competency ids to check whether page changes, if changed load appropriate data
    if (competencyId && prevProps.competencyId !== competencyId) {
      loadSubCompetency(competencyId)
    }
    if (competencyId && subCompetencyId && prevProps.subCompetencyId !== subCompetencyId) loadLevels(competencyId, subCompetencyId)
  }

  render () {
    const { data, edit, add, editEmployee, masterData, addEmployee, getToDetailView, saveOrUpdate, formError, competencyId, subCompetencyId, competencies, subCompetencies, levels, change } = this.props
    const subCompetencyOptions = filter(subCompetencies, subCompetency => subCompetency.compId === competencyId)[0]
    const levelsOptions = filter(levels, level => level.compId === competencyId && level.subCompId === subCompetencyId)[0]
    return (<React.Fragment>
      <DetailHeader addEditMode={(edit || add)}
        onCancel={getToDetailView}
        title={(edit ? 'Edit' : (add ? 'Add New' : 'Details Info'))}
        onAdd={addEmployee} />
      { !(edit || add) && data === null && <div className='detail-empty-section'>Select an employee<br /> to get detail info</div>}
      { !(edit || add) && data && <div className='detail-section'>
        <div className='detail-section-inner'>
          <Space vspace={20} />
          <Field label='EID' value={data.EID} />
          <Field label='Name' value={data.name} />
          <Field label='Country/Region' value={data.country} />
          <Field label='Division' value={data.division} />
          <Field label='SubGroup' value={data.subGroup} />
          <Field label='Profile' value={data.profile} />
          <Field label='Managers Name' value={data.manager} />
          <Field label={'Manager\'s EID'} value={data.managerEID} />
          <Field label='Current Maturity' value={data.currentMaturityLabel} />
          <Field label='Expected Maturity' value={data.expectedMaturityLabel} />
          <Space vspace={20} />
        </div>
        <div className='button-wrapper'>
          <Button type='block' onClick={() => editEmployee(data.EID)}><img src={LockIcon} alt='' /> Unlock to make change</Button>
        </div>
      </div> }
      { (edit || add) && <Form onSubmit={saveOrUpdate} getToDetailView={getToDetailView} masterData={masterData} isCreate={add} formError={formError} competencies={competencies ? competencies.items : []} subCompetencies={subCompetencyOptions ? subCompetencyOptions.items : []} levels={levelsOptions ? levelsOptions.items : []} change={change} /> }
    </React.Fragment>)
  }
}

EmployeeDetails.propsType = {
  data: PropTypes.object,
  edit: PropTypes.bool,
  add: PropTypes.bool,
  editEmployee: PropTypes.func,
  masterData: PropTypes.object,
  addEmployee: PropTypes.func,
  getToDetailView: PropTypes.func,
  saveOrUpdate: PropTypes.func,
  formError: PropTypes.string
}

export default EmployeeDetails
