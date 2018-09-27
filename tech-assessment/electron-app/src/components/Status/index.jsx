import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

export const RoleStatus = ({ status }) => (
  <span className={`role-status ${status.toLowerCase()}`}>{status}</span>
)
RoleStatus.propTypes = {
  status: PropTypes.oneOf(['Leader', 'Manager', 'Director']).isRequired
}

export const Status = ({ status }) => (
  <span className={`status ${status.toLowerCase()}`}>{status}</span>
)
Status.propTypes = {
  status: PropTypes.oneOf(['Active', 'Inactive']).isRequired
}
