import React from 'react'
import PropTypes from 'prop-types'
import Pagination from '../../components/Pagination'
import './style.css'

const Table = ({ columns, data, setPagination, onSelect, selectedField, selected }) => (
  <div className='table-wrapper'>
    <table className='table'>
      <thead>
        <tr>
          {columns.map((header, i) => <th className={header.align ? `text-${header.align}` : ''} key={i}>{header.label}</th>)}
        </tr>
      </thead>
      <tbody>
        { data.items.map((item, i) => <tr className={item[selectedField] === selected ? 'selected' : ''} onClick={() => onSelect(item[selectedField])} key={i}>
          { columns.map((header, j) => !header.hide && <td colSpan={header.colSpan} key={j}> {
            header.formatter ? header.formatter(item) : item[header.field]
          }</td>) }
        </tr>)}
      </tbody>
    </table>
    <Pagination
      onChange={setPagination}
      page={data.page}
      pageSize={data.pageSize}
      total={data.items.length} />
  </div>
)

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  selected: PropTypes.string,
  selectedField: PropTypes.string,
  data: PropTypes.object
}

Table.defaultProps = {
  columns: [],
  selected: null,
  selectedField: '',
  data: {
    total: 0,
    page: 1,
    pageSize: 0,
    items: []
  }

}
export default Table
