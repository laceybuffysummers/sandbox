import React from 'react'
import PropTypes from 'prop-types'
import Filter from '../../../components/Filter'
import Select from '../../../components/Select'
import Row from '../../../components/Row'
import FormField from '../../../components/FormField'

import './style.css'

const UserFilter = ({ setFilterValue, values, setFilter, masterData, resetFilter }) => (
  <Filter resetFilter={resetFilter} query={values.query} queryChange={(value) => setFilterValue({query: value})} doFilter={setFilter}>
    <Row>
      <FormField label='Role' component={
        <Select value={values.role} onChange={(e) => setFilterValue({role: e.target.value})} options={masterData.roles} />
      } />
      <FormField label='Group' component={
        <Select value={values.group} onChange={(e) => setFilterValue({group: e.target.value})} options={masterData.groups} />
      } />
      <FormField label='Status' component={
        <Select value={values.status} onChange={(e) => setFilterValue({status: e.target.value})} options={masterData.statues} />
      } />
    </Row>
  </Filter>
)

UserFilter.propTypes = {
  setFilterValue: PropTypes.func,
  values: PropTypes.object,
  setFilter: PropTypes.func,
  masterData: PropTypes.object,
  resetFilter: PropTypes.func
}

export default UserFilter
