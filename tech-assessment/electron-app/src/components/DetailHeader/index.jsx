import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const DetailHeader = ({ title, onAdd, addEditMode, onCancel }) => (
  <div className='detail-header'>
    <h2>{title}</h2>
    { addEditMode && onCancel && <button onClick={onCancel}>Cancel</button> }
    { !addEditMode && onAdd && <button onClick={onAdd}>Add New</button> }
  </div>
)

DetailHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onAdd: PropTypes.func,
  onCancel: PropTypes.func,
  addEditMode: PropTypes.bool
}

export default DetailHeader
