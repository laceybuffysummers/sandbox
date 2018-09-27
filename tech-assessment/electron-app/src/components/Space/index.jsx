import React from 'react'
import PropTypes from 'prop-types'

const Space = ({ vspace }) => (
  <div style={{height: vspace + 'px'}} />
)
Space.propTypes = {
  vspace: PropTypes.number.isRequired
}

export default Space
