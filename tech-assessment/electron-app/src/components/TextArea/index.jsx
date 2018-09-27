import React from 'react'
import './style.css'

const Input = ({ error, ...props }) => (
  <textarea {...props} className={`form-textarea ${error ? 'error-field' : ''}`} />
)

export default Input
