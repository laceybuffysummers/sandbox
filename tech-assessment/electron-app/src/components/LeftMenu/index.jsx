import React from 'react'
import PropsType from 'prop-types'
import './style.css'

const LeftMenu = ({ items, onSelect, compId, onAdd, onEdit, parentId, addLabel }) => (
  <ul className='left-side-nav'>
    { items.map((item, i) => (<li className={item.active ? 'active' : ''} key={i} onClick={() => onSelect(item.id, parentId, compId)}>{item.name} { onEdit && <span className='edit-btn' onClick={onEdit}>Edit</span> }</li>)) }
    { onAdd && <li className='special-li' onClick={onAdd}>{addLabel}</li> }
  </ul>
)

LeftMenu.defaultProps = {
  onAdd: () => {},
  onSelect: () => {},
  items: [],
  addLabel: 'Add New'
}

LeftMenu.propsType = {
  items: PropsType.array,
  onAdd: PropsType.func,
  onSelect: PropsType.func,
  parentId: PropsType.number,
  compId: PropsType.number,
  addLabel: PropsType.string
}

export default LeftMenu
