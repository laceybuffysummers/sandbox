import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const MaturityStatusProgress = ({ progress, name }) => (
  <div className='maturity-status-progres'>
    <div className='progress'>
      <div className='bar' progress={progress} style={{ width: progress + '%' }} />
    </div>
    <div className='label' progress={progress}>{progress}%</div>
    <div className='name'>{name}</div>
  </div>)

MaturityStatusProgress.propTypes = {
  progress: PropTypes.number,
  name: PropTypes.string
}
MaturityStatusProgress.defaultProps = {
  progress: 0,
  name: ''
}
export default MaturityStatusProgress
