import React, { Component } from 'react'
import PropsType from 'prop-types'
import RightSideBar from '../../components/RightSideBar'
import MaturityStatus from '../../components/MaturityStatus'
import EmployeeFilter from './EmployeeFilter'
import EmployeeDetail from './EmployeeDetail'
import { Content } from '../../components/Container'
import Row from '../../components/Row'
import FormField, { FormWrapper, ExportButton } from '../../components/FormField'
import Select from '../../components/Select'
import Table from '../../components/Table'
import { filter, map, omit } from 'lodash'
import Button from '../../components/Button'

const columns = [
  {
    label: 'EID',
    field: 'EID'
  },
  {
    label: 'Name',
    field: 'name'
  },
  {
    label: 'Country/ Region',
    field: 'country'
  },
  {
    label: 'Division',
    field: 'division'
  },
  {
    label: 'Sub Group',
    field: 'subGroup'
  },
  {
    label: 'Profile',
    field: 'profile'
  },
  {
    label: 'Manager\'s Name',
    field: 'manager'
  },
  {
    label: 'Mngr\'s EID',
    field: 'managerEID'
  },
  {
    label: 'Current Maturity',
    colSpan: 2,
    formatter: (row) => <MaturityStatus levels={row.levels} completedActivities={row.activitiesCompleted} totalActivities={row.activitiesCount} currentMaturity={row.currentMaturityLabel} expectedMaturity={row.expectedMaturityLabel} />
  },
  {
    label: 'Expected Maturity',
    hide: true,
    align: 'right'
  }
]

class Pure extends Component {
  componentDidMount () {
    this.props.searchEmployee()
    this.props.loadCompetency()
  }

  onCompetencySelected (compId) {
    this.props.loadSubCompetency(compId.toString())
    this.props.setCompetency({competencyId: compId, subCompetencyId: ''})
    this.props.change('subComp', '')
  }

  convertToCSV (data) {
    var result, ctr, keys, columnDelimiter, lineDelimiter

    if (data == null || !data.length) {
      return null
    }

    columnDelimiter = ','
    lineDelimiter = '\n'

    keys = Object.keys(data[0])

    result = ''
    result += keys.join(columnDelimiter)
    result += lineDelimiter

    data.forEach(function (item) {
      ctr = 0
      keys.forEach(function (key) {
        if (ctr > 0) result += columnDelimiter

        result += item[key]
        ctr++
      })
      result += lineDelimiter
    })

    return result
  }

  downloadCSV () {
    const { data: { items, competency: { competencyId, subCompetencyId } } } = this.props
    let data
    let filename
    let link
    let filteredItems = items
    filteredItems = map(items, item => {
      item = omit(item, ['currentMaturityLabel', 'activitiesCount', 'activitiesCompleted', 'expectedMaturityLabel', 'employeeEID'])
      if (!item.currentMaturity) item.currentMaturity = null
      if (!item.expectedMaturity) item.expectedMaturity = null
      item.employeeEID = item.EID
      delete item.EID
      item = {
        ...item,
        competencyId: competencyId || null,
        subCompetencyId: subCompetencyId || null
      }
      return item
    })
    let csv = this.convertToCSV(filteredItems)
    if (csv === null) return null
    filename = 'employees.csv'
    if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv
    }
    data = encodeURI(csv)
    link = document.createElement('a')
    link.setAttribute('href', data)
    link.setAttribute('download', filename)
    link.click()
  }

  render () {
    const { data, setPagination, addEmployee, getEmployee, masterData, competencies, subCompetencies, levels,
      getToDetailView, saveOrUpdate, setCompetency, loadSubCompetency, loadLevels,
      setFilter, setFilterValue, resetFilter, editEmployee, competencyId, subCompetencyId, change } = this.props
    const subCompetencyOptions = filter(subCompetencies, subCompetency => subCompetency.compId === data.competency.competencyId.toString())[0]
    return (<React.Fragment>
      <Content>
        <EmployeeFilter
          resetFilter={resetFilter}
          masterData={masterData}
          values={data.filters}
          setFilter={setFilter}
          setFilterValue={setFilterValue}
        />
        <FormWrapper>
          <Row>
            <FormField label='Competency' name='comp' component={
              <Select onChange={(e) => this.onCompetencySelected(e.target.value)} options={competencies.items} source='form' />
            } />
            <FormField label='Sub Competency' name='subComp' component={
              <Select onChange={(e) => setCompetency({subCompetencyId: e.target.value})} options={subCompetencyOptions ? subCompetencyOptions.items : []} source='form' />
            } />
            <ExportButton>
              <Button onClick={() => this.downloadCSV()}>Export</Button>
            </ExportButton>
          </Row>
        </FormWrapper>
        <Table
          selected={data.selected}
          selectedField='EID'
          onSelect={getEmployee}
          setPagination={setPagination}
          columns={columns}
          data={data} />
      </Content>
      <RightSideBar>
        <EmployeeDetail
          saveOrUpdate={saveOrUpdate}
          getToDetailView={getToDetailView}
          addEmployee={addEmployee}
          masterData={masterData}
          loadSubCompetency={loadSubCompetency}
          loadLevels={loadLevels}
          competencies={competencies}
          subCompetencies={subCompetencies}
          levels={levels}
          competencyId={competencyId}
          subCompetencyId={subCompetencyId}
          edit={data.edit}
          add={data.add}
          change={change}
          editEmployee={editEmployee}
          formError={data.error}
          data={data.details} />
      </RightSideBar>
    </React.Fragment>)
  }
}

Pure.propsType = {
  data: PropsType.array,
  setPagination: PropsType.func,
  addEmployee: PropsType.func,
  getEmployee: PropsType.func,
  masterData: PropsType.object,
  getToDetailView: PropsType.func,
  saveOrUpdate: PropsType.func,
  setFilter: PropsType.func,
  setFilterValue: PropsType.func,
  resetFilter: PropsType.func,
  editEmployee: PropsType.func
}

export default Pure
