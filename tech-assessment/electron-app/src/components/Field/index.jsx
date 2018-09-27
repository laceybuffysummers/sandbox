import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Field = ({ label, value }) => (
  <div className='field-wrapper'>
    <div className='lable-wrapper'>{label}</div>
    <div className='value-wrapper'>: {value}</div>
  </div>
)

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
}

export default Field
