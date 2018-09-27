import React from 'react'
import PropsType from 'prop-types'
import './style.css'

const Button = ({ type, children, onClick, ...props }) => (
  <button type='submit' {...props} onClick={onClick} className={`button btn-${type}`}>{children}</button>
)
Button.propsType = {
  type: PropsType.oneOf(['primary', 'secodary', 'block', 'ghost']),
  onClick: PropsType.func
}
export default Button
