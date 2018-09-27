import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import { size, filter } from 'lodash'
import MaturityStatusProgress from '../MaturityStatusProgress'
import SearchIcon from '../../icons/Search.svg'
import CheckBox from '../CheckBox'
import './style.css'

const EmployeeTable = ({employees, setCompleted, setBulkCompleted, selectEmployee, selectAllEmployee, checkAll}) => (
  <React.Fragment>{ size(employees) > 0 && <div className={'emp-table'}><table className='employee-table'>
    <thead>
      <tr>
        <th><CheckBox checked={checkAll || false} onClick={(e) => selectAllEmployee(e.target.checked)} /></th>
        <th>Employee<img src={SearchIcon} alt='' /></th>
        <th>Position</th>
        <th>Expected Maturity</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      { employees && employees.map((employee, i) => (<tr key={i}>
        <td><CheckBox checked={employee.checked ? employee.checked : false} onChange={(e) => selectEmployee(employee.employeeEID, e.target.checked)} /></td>
        <td><a>{employee.employee.name}</a></td>
        <td>{employee.employee.profile}</td>
        <td><MaturityStatusProgress progress={Number(employee.progress)} name={employee.expectedMaturityLabel} /></td>
        <td>{employee && !employee.completed && <Button onClick={() => setCompleted(employee.employeeEID)}>Set Completed</Button>}</td>
      </tr>)) }
    </tbody>
  </table>
    { (size(filter(employees, employee => employee.checked && !employee.completed)) > 0) && (<div className='button-header'><Button onClick={setBulkCompleted}>Complete for all selected</Button></div>) /* eslint-disable-line */ }
  </div> }
  </React.Fragment>
)
EmployeeTable.propTypes = {
  employees: PropTypes.array,
  setCompleted: PropTypes.func,
  setBulkCompleted: PropTypes.func,
  selectEmployee: PropTypes.func,
  selectAllEmployee: PropTypes.func,
  subCompetencyId: PropTypes.number
}

EmployeeTable.defaultProps = {
  employees: [],
  setCompleted: () => {}
}

export default EmployeeTable
