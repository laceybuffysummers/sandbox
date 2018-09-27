import React, { Component } from 'react'
import PropTypes from 'prop-types'
import SearchIcon from '../../icons/Search.svg'
import './style.css'

class SearchInput extends Component {
  constructor () {
    super()
    this.search = this.search.bind(this)
  }
  search (e) {
    if (e.keyCode === 13) {
      this.props.onSearch()
    }
  }
  render () {
    const { placeholder, value, onChange, filterText, onFilter } = this.props
    return (<div className='search-input'>
      <img alt='' src={SearchIcon} className='search-icon' />
      <input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} type='search' onKeyDown={this.search} />
      { onFilter && <button onClick={onFilter}>{filterText}</button> }
    </div>)
  }
}

SearchInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
}
SearchInput.defaultProps = {
  placeholder: 'Search',
  filterText: 'Close Filter'
}
export default SearchInput
