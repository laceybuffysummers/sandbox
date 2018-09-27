import React from 'react'
import PropsType from 'prop-types'
import { map } from 'lodash'
import Accordion from '../../../components/Accordion'
import './style.css'

const Activity = ({ activities, competencyId, subCompetencyId, levelId, onAdd, onEdit }) => {
  return (
    <div className='activity-content-wrapper'>
      <h1>Activity <button onClick={() => onAdd('ACTIVITY', competencyId, subCompetencyId, levelId)}>Add New</button></h1>
      { activities && map(activities, (activity, i) => (<Accordion
        actionLabel={'Edit'}
        type='secondary'
        onAdd={() => onEdit('ACTIVITY', competencyId, subCompetencyId, levelId, activity.id)}
        key={i}
        title={`${i + 1}. ${activity.name}`}>
        <div className='row-wrappers'>
          { activity['skillAcquired'] &&
            <div className='row-wrapper'>
              <div className='label'>Skill Acquired: </div>
              <div className='value'>{activity['skillAcquired']}</div>
            </div>
          }
          { activity['lifeExperience'] &&
            <div className='row-wrapper'>
              <div className='label'>Life Experience Credit Exceptions: </div>
              <div className='value'>{activity['lifeExperience']}</div>
            </div>
          }
        </div>
      </Accordion>)) }
    </div>
  )
}

Activity.propsType = {
  activities: PropsType.array,
  onAdd: PropsType.func,
  onEdit: PropsType.func
}

export default Activity
