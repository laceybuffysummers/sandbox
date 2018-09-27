import React from 'react'
import PropsType from 'prop-types'
import { map } from 'lodash'
import MenuArrow from '../../icons/MenuArrow.svg'
import './style.css'

const CompetencyItems = ({competencies, viewCompetency, togglePin, edit}) => (
  <ul className='competency-wrapper'>
    { competencies && map(competencies, ({name, id, pined}, i) => (<li key={i} className={pined ? 'active' : ''}>
      <div className='name'>{name}</div>
      <div className='detail-link'>
        <button className='pined' onClick={() => togglePin(id)}>
          <img className='pined-icon' src={require(`../../icons/${pined ? 'Pined' : 'UnPined'}.svg`)} alt='' />
        </button>
        <button className='view-detail'>
          <span onClick={() => viewCompetency(id)} >View Details</span>
          <span className='edit-btn' onClick={() => edit('COMPETENCY', id)}>Edit</span>
          <img className='arrow-icon' src={MenuArrow} alt='' onClick={() => viewCompetency(id)} />
        </button>
      </div>
    </li>)) }
  </ul>
)

CompetencyItems.propsType = {
  competencies: PropsType.array,
  viewCompetency: PropsType.func,
  togglePin: PropsType.func,
  edit: PropsType.func
}

CompetencyItems.defaultProps = {
  competencies: []
}
export default CompetencyItems
