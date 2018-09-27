import React from 'react'
import './style.css'

const CheckBox = (props) => (
  <label className='form-checkbox'>
    <input type='checkbox' {...props} />
    <span />
  </label>
)
export default CheckBox
