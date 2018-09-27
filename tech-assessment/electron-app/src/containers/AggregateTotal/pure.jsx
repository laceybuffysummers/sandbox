import React, { Component } from 'react'
import { BarChart, PieChart, ChartWrapper, ExpertiseLevelChart } from '../../components/Chart'
import { forEach } from 'lodash'
import FormField from '../../components/FormField'
import Select from '../../components/Select'
import Button from '../../components/Button'
import './style.css'
import PropsType from 'prop-types'

const Legend = ({ maturities }) => (
  <div className='chart-legend'>
    { maturities.length >= 1 && (<div><i />{maturities[0]}</div>) }
    { maturities.length >= 2 && (<div><i className='blue' />{maturities[1]}</div>) }
    { maturities.length >= 3 && (<div><i className='purple' />{maturities[2]}</div>) }
    { maturities.length >= 4 && (<div><i className='green' />{maturities[3]}</div>) }
    { maturities.length > 4 && forEach(maturities.slice(4), (m, index) => (
      <div key={index}><i />{m}</div>
    ))}
  </div>
)

class AggregateTotal extends Component {
  componentDidMount () {
    this.props.loadOptions()
    this.print = this.print.bind(this)
  }

  print () {
    window.print()
  }
  render () {
    const { setFilterValue, filters, searchFilters, setFilters, competencies, subCompetencies,
      setCompetency, errorMsg, countries, divisions, subGroups, profiles } = this.props
    // convert back end statistics data to be used by front end
    let totalCurrent = 0
    let totalExpected = 0
    const maturities = []
    const data = {
      expertiseLevel: [],
      population: [],
      current: [],
      expected: []
    }
    forEach(this.props.data.data, (item) => {
      totalCurrent += item.currentCount
      totalExpected += item.expectedCount
      maturities.push(item.maturityLevel)
      data.expertiseLevel.push({ label: item.maturityLevel, value: item.currentCount, total: item.expectedCount })
    })
    forEach(this.props.data.data, (item) => {
      const c = totalCurrent === 0 ? 0 : Math.round(item.currentCount * 100 / totalCurrent)
      const e = totalExpected === 0 ? 0 : Math.round(item.expectedCount * 100 / totalExpected)
      data.population.push(c)
      data.current.push(c)
      data.expected.push(e)
    })

    const barChartTitleTexts = []
    if (searchFilters.country && searchFilters.country.length > 0) barChartTitleTexts.push(searchFilters.country)
    if (searchFilters.division && searchFilters.division.length > 0) barChartTitleTexts.push(searchFilters.division)
    if (searchFilters.subGroup && searchFilters.subGroup.length > 0) barChartTitleTexts.push(searchFilters.subGroup)
    const barChartTitleSuffix = barChartTitleTexts.length === 0 ? '' : ' ' + barChartTitleTexts.join(', ')

    return (
      <div className='blue-bg'>
        { errorMsg && (<div className='statistics-error-msg'>{errorMsg}</div>) }
        <div className='filter-section'>
          <FormField label='Competency' component={<Select value={filters.competencyId} onChange={(e) => setCompetency({competencyId: e.target.value})} options={competencies} />} />
          <FormField label='Sub Competency' component={<Select value={filters.subCompetencyId} onChange={(e) => setFilterValue({subCompetencyId: e.target.value})} options={subCompetencies} />} />
          <FormField label='Country' component={<Select value={filters.country} onChange={(e) => setFilterValue({country: e.target.value})} options={countries} />} />
          <FormField label='Division' component={<Select value={filters.division} onChange={(e) => setFilterValue({division: e.target.value})} options={divisions} />} />
          <FormField label='Sub Group' component={<Select value={filters.subGroup} onChange={(e) => setFilterValue({subGroup: e.target.value})} options={subGroups} />} />
          <FormField label='Profile' component={<Select value={filters.profile} onChange={(e) => setFilterValue({profile: e.target.value})} options={profiles} />} />
          <Button onClick={setFilters}>Apply Now</Button>
        </div>
        <div className='button-wrapper'>
          <Button onClick={() => this.print()}>Convert as PDF</Button>
        </div>
        <div className='charts'>
          <ChartWrapper className='half-width'>
            <h4>Population <Legend maturities={maturities} /></h4>
            <div className='chart-container center'>
              <PieChart data={data.population} title={'Population'} />
            </div>
          </ChartWrapper>
          <ChartWrapper className='half-width'>
            <h4>
              Expertise Level
              <p>Total Employee <strong>{totalCurrent}</strong></p>
            </h4>
            <div className='chart-container'>
              { data && data.expertiseLevel && <ExpertiseLevelChart data={data.expertiseLevel || []} /> }
            </div>
          </ChartWrapper>
        </div>
        <div className='charts'>
          <ChartWrapper className='full-width'>
            <h4>Current vs Expected<Legend maturities={maturities} /></h4>
            <div className='chart-container'>
              <BarChart data={data.current} title={`Current${barChartTitleSuffix}`} />
              <BarChart data={data.expected} title={`Expected${barChartTitleSuffix}`} />
            </div>
          </ChartWrapper>
        </div>
      </div>
    )
  }
}

AggregateTotal.propsType = {
  loadOptions: PropsType.func,
  filters: PropsType.object,
  searchFilters: PropsType.object,
  setFilters: PropsType.func,
  setFilterValue: PropsType.func,
  setCompetency: PropsType.func,
  data: PropsType.object,
  competencies: PropsType.array,
  subCompetencies: PropsType.array,
  countries: PropsType.array,
  divisions: PropsType.array,
  subGroups: PropsType.array,
  profiles: PropsType.array,
  errorMsg: PropsType.string
}

export default AggregateTotal
