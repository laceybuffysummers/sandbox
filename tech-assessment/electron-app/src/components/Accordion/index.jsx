import React, { Component } from 'react'
import PropsType from 'prop-types'
import Button from '../Button'
import AccordionArrow from '../../icons/AccordionArrow.svg'
import './style.css'

class Accordion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      open: props.open
    }
    this.expand = this.expand.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }
  expand (e) {
    // Calling before changing state because react updates state in batch, so calling order cannot be guaranteed
    // Check if the header is open, then call respective functions to load data
    if (!this.state.open) {
      if (this.props.category === 'subcompetency' || this.props.category === 'empCompetency') this.props.onHeaderClick()
      if (this.props.category === 'levels') {
        this.props.loadActivity(this.props.levelId)
      }
    }
    this.setState({open: !this.state.open})
  }
  onAdd (e) {
    e.stopPropagation()
    this.props.onAdd()
  }
  render () {
    const { title, children, type, onAdd, actionLabel } = this.props
    const { open } = this.state
    return (<div className={`accordion-wrapper ${type}`}>
      <div onClick={this.expand} className={`accordion-header ${open && 'open'}`}>
        {title} <img src={AccordionArrow} alt='' />
        { onAdd && <Button type='ghost' onClick={(event) => this.onAdd(event)}>{actionLabel}</Button>}
      </div>
      { open && <div className='accordion-content'>{children}</div>}
    </div>)
  }
}

Accordion.propsType = {
  type: PropsType.oneOf(['primary', 'primary primary-special', 'secondary', 'default']),
  title: PropsType.string.isRequired,
  open: PropsType.bool,
  onAdd: PropsType.func
}

Accordion.defaultProps = {
  type: 'default',
  actionLabel: 'Edit/Add',
  bool: true,
  onAdd: (e) => {
    e.stopPropagation()
  }
}

export default Accordion
