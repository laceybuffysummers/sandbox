import React from 'react'
import './style.css'

const Input = ({error, ...props}) => (
  <input {...props} className={`form-input ${error ? 'error-field' : ''}`} />
)

export default Input
