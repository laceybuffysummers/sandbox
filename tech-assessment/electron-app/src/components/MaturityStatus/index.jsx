import React from 'react'
import PropTypes from 'prop-types'
import { times } from 'lodash'
import './style.css'

const MaturityStatus = ({ currentMaturity, expectedMaturity, totalActivities, completedActivities }) => (
  <div className='maturity-status'>
    <div className='labels'>
      <div className='label'>{currentMaturity}</div>
      <div className='label'>{expectedMaturity}</div>
    </div>
    <div className='bars'>
      {
        times(totalActivities, i => <div key={i} className={`bar ${(i + 1) <= completedActivities ? 'active' : ''}`} />)
      }
    </div>
  </div>
)
MaturityStatus.propTypes = {
  currentMaturity: PropTypes.string,
  expectedMaturity: PropTypes.string
}
MaturityStatus.defaultProps = {
  currentMaturity: '',
  expectedMaturity: ''
}
export default MaturityStatus
