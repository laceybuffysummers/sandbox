import React from 'react'
import PropTypes from 'prop-types'
import DropdownArrow from '../../icons/DropdownArrow.svg'
import './style.css'

const Select = ({ options, label, blank, source, error, ...props }) => (
  <div className='select-wrapper'>
    { label && props.value === '' && <div className='select-watermark'>{label} <span>Select</span></div>}
    <img src={DropdownArrow} alt='' />
    <select {...props} className={`form-select ${error ? 'error-field' : ''}`}>
      { blank && <option value=''>{ label ? '' : 'Select' }</option> }
      {
        source === 'form'
          ? options && options.map((option, i) => <option key={i} value={option.id}>{option.name}</option>)
          : options.map((option, i) => <option key={i} value={option.value}>{option.label}</option>)
      }
    </select>
  </div>
)

Select.propTypes = {
  blank: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  source: PropTypes.string,
  error: PropTypes.bool
}

Select.defaultProps = {
  blank: true,
  options: [],
  error: false
}

export default Select
