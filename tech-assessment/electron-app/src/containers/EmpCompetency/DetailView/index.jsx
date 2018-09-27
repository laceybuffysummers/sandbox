import React from 'react'
import PropTypes from 'prop-types'
import './style.css'
import Accordion from '../../../components/Accordion'
import { SubHeading } from '../../../components/FormField'
import Activities from '../../../components/Activities'
import EmployeeTable from '../../../components/EmployeeTable'

const DetailView = ({ levels, loadActivity, selectEmployeeActivity, getFilteredEmployees, getFilteredActivity, setCompleted, setBulkCompleted, subCompetencyId, selectAllEmployee, selectEmployee }) => (
  <div className='detail-levels'>
    { levels && levels.map((level, i) => (<Accordion type='secondary' key={i} title={level.name} levelId={level.id} loadActivity={loadActivity} category='levels' onAdd={false}>
      <div className='level-content'>
        <p className='description'>{ level.description }</p>
        {
          getFilteredActivity(level.id) && getFilteredActivity(level.id).length > 0 &&
            <div>
              <SubHeading>Activity</SubHeading>
              <Activities activities={getFilteredActivity(level.id)} onSelect={(activityId) => selectEmployeeActivity(subCompetencyId, level.id, activityId)} />
            </div>
        }
        <EmployeeTable
          selectEmployee={(empId, checked) => selectEmployee(empId, checked, subCompetencyId, level.id)}
          selectAllEmployee={(checked) => selectAllEmployee(subCompetencyId, level.id, checked)}
          setCompleted={(employeeEID) => setCompleted(employeeEID, subCompetencyId, level.id)}
          setBulkCompleted={() => setBulkCompleted(subCompetencyId, level.id)}
          subCompetencyId={Number(subCompetencyId)}
          checkAll={getFilteredEmployees(level.id, false)}
          employees={getFilteredEmployees(level.id, true)} />
      </div>
    </Accordion>)) }
  </div>
)

DetailView.propTypes = {
  levels: PropTypes.array,
  setCompleted: PropTypes.func,
  subCompetancyId: PropTypes.number
}

DetailView.defaultProps = {
  levels: []
}
export default DetailView
