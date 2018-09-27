import React from 'react'
import { map } from 'lodash'
import PropTypes from 'prop-types'
import './style.css'

const RadioButtons = ({ options, error, ...props }) => (
  <div className='radio-group-wrapper'>
    <div className='radio-group-container'>
      {
        map(options, (option, index) => (
          <label key={index}>
            <input {...props} type='radio' value={option.value} />
            {option.label}
          </label>
        ))
      }
    </div>
    { error && <span>Please Select One Option</span> }
  </div>
)

RadioButtons.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object)
}

RadioButtons.defaultProps = {
  options: []
}

export default RadioButtons
