import React, { Component } from 'react'
import PropTypes from 'prop-types'
import RightSideBar from '../../components/RightSideBar'
import UserDetail from './UserDetail'
import UserFilter from './UserFilter'
import { Content } from '../../components/Container'
import Table from '../../components/Table'
import { Status, RoleStatus } from '../../components/Status'

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
    label: 'Username',
    field: 'username'
  },
  {
    label: 'Role',
    formatter: (row) => <RoleStatus status={row.role} />
  },
  {
    label: 'Manager EID',
    field: 'directorEID'
  },
  {
    label: 'Status',
    formatter: (row) => <Status status={row.status} />
  }
]

class Pure extends Component {
  componentDidMount () {
    this.props.searchUser()
  }
  render () {
    const { data, setPagination, getUser,
      getToDetailView, addUser, editUser, resetFilter,
      setFilterValue, setFilter, masterData, saveOrUpdate } = this.props
    return (<React.Fragment>
      <Content>
        <UserFilter
          resetFilter={resetFilter}
          masterData={masterData}
          values={data.filters}
          setFilter={setFilter}
          setFilterValue={setFilterValue}
        />
        <Table
          selected={data.selected}
          selectedField='EID'
          onSelect={getUser}
          setPagination={setPagination}
          columns={columns}
          data={data} />
      </Content>
      <RightSideBar>
        <UserDetail
          saveOrUpdate={saveOrUpdate}
          getToDetailView={getToDetailView}
          addUser={addUser}
          masterData={masterData}
          edit={data.edit}
          add={data.add}
          editUser={editUser}
          formError={data.error}
          data={data.details} />
      </RightSideBar>
    </React.Fragment>)
  }
}

Pure.propTypes = {
  data: PropTypes.object,
  setPagination: PropTypes.func,
  getUser: PropTypes.func,
  getToDetailView: PropTypes.func,
  addUser: PropTypes.func,
  editUser: PropTypes.func,
  resetFilter: PropTypes.func,
  setFilterValue: PropTypes.func,
  setFilter: PropTypes.func,
  masterData: PropTypes.object,
  saveOrUpdate: PropTypes.func
}
export default Pure
