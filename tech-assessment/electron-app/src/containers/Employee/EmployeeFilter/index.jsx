import React from 'react'
import PropsType from 'prop-types'
import Filter from '../../../components/Filter'
import Select from '../../../components/Select'
import Input from '../../../components/Input'
import Row from '../../../components/Row'
import FormField from '../../../components/FormField'

import './style.css'

const EmployeeFilter = ({ setFilterValue, values, setFilter, masterData, resetFilter }) => (
  <Filter query={values.query} queryChange={(value) => setFilterValue({query: value})} doFilter={setFilter} resetFilter={resetFilter}>
    <Row>
      <FormField label='Competency' component={
        <Select value={values.competency} onChange={(e) => setFilterValue({competency: e.target.value})} options={masterData.competencies} />
      } />
      <FormField label='Sub Competency' component={
        <Select value={values.subCompetency} onChange={(e) => setFilterValue({subCompetency: e.target.value})} options={masterData.subCompetencies} />
      } />
      <FormField label='Current Maturity' component={
        <Select disabled={!values.competency || !values.subCompetency} value={values.currentMaturity} onChange={(e) => setFilterValue({currentMaturity: e.target.value})} options={masterData.marturities} />
      } />
      <FormField label='Expected Maturity' component={
        <Select disabled={!values.competency || !values.subCompetency} value={values.expectedMaturity} onChange={(e) => setFilterValue({expectedMaturity: e.target.value})} options={masterData.marturities} />
      } />
    </Row>
    <Row>
      <FormField label='Manager EID' component={
        <Input value={values.managerEID} onChange={(e) => setFilterValue({managerEID: e.target.value})} />
      } />
      <FormField label='Level' component={
        <Select value={values.level} onChange={(e) => setFilterValue({level: e.target.value})} options={masterData.levels} />
      } />
    </Row>
    <Row>
      <FormField label='Country' component={
        <Select value={values.country} onChange={(e) => setFilterValue({country: e.target.value})} options={masterData.regions} />
      } />
      <FormField label='Division' component={
        <Select value={values.division} onChange={(e) => setFilterValue({division: e.target.value})} options={masterData.divisions} />
      } />
      <FormField label='Sub Group' component={
        <Select value={values.subGroup} onChange={(e) => setFilterValue({subGroup: e.target.value})} options={masterData.subGroups} />
      } />
      <FormField label='Profile' component={
        <Select value={values.profile} onChange={(e) => setFilterValue({profile: e.target.value})} options={masterData.profiles} />
      } />
    </Row>
  </Filter>
)

EmployeeFilter.propTypes = {
  setFilterValue: PropsType.func,
  values: PropsType.object,
  setFilter: PropsType.func,
  masterData: PropsType.object,
  resetFilter: PropsType.func
}

export default EmployeeFilter
