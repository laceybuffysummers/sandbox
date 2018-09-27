import React from 'react'
import PropTypes from 'prop-types'
import times from 'lodash/times'
import ceil from 'lodash/ceil'
import TriangleRight from '../../icons/TriangleRight.svg'
import TriangleLeft from '../../icons/TriangleLeft.svg'
import './style.css'

const Pagination = ({ total, pageSize, page, onChange }) => (
  <div className='pagination'>
    <ul>
      { page > 0 && <li onClick={() => onChange(--page)} className='prev'><a className='prev-icon'><img src={TriangleLeft} alt='' /></a></li> }
      { times(ceil(total / pageSize), Number).map((i) => <li key={i} className={page === i ? 'active' : ''}>
        <a onClick={() => onChange(i)}>{i + 1}</a>
      </li>) }
      { page < ceil(total / pageSize) - 1 && <li onClick={() => onChange(++page)} className='next'><a className='next-icon'><img src={TriangleRight} alt='' /></a></li> }
    </ul>
  </div>
)
Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Pagination
