import React from 'react'
import './style.css'

const Activities = ({ activities, onSelect }) => (
  <ul className='activities-list'>
    { activities && activities.map((activity, i) => <li className={activity.active ? 'active' : ''} onClick={() => onSelect(activity.id)} key={i}>{activity.name}</li>) }
  </ul>
)

Activities.defaultProps = {
  activities: []
}

export default Activities
