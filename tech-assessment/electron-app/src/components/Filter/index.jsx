import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchInput from '../Search'
import Button from '../Button'
import './style.css'

class Filter extends Component {
  constructor () {
    super()
    this.state = {
      filter: false
    }
    this.expandFilter = this.expandFilter.bind(this)
  }

  expandFilter () {
    this.setState({filter: !this.state.filter})
  }

  render () {
    const { children, doFilter, queryChange, query, resetFilter, showFilter } = this.props
    const { filter } = this.state
    return (<div className='filter-section'>
      <SearchInput value={query} onChange={queryChange} onSearch={doFilter} filterText={filter ? 'Close Filter' : 'Filters'} onFilter={showFilter && this.expandFilter} />
      { filter && <div className='filter-inputs'>
        { children }
      </div> }
      { filter && <div className='filter-actions'>
        <Button onClick={resetFilter} type='secondary'>Reset</Button>
        <Button onClick={doFilter}>Apply Filter</Button>
      </div> }
    </div>)
  }
}

Filter.propTypes = {
  children: PropTypes.node,
  doFilter: PropTypes.func,
  queryChange: PropTypes.func,
  resetFilter: PropTypes.func,
  showFilter: PropTypes.bool,
  query: PropTypes.string
}
Filter.defaultProps = {
  children: null,
  showFilter: true
}
export default Filter
