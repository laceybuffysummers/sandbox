import React, { Component } from 'react'
import PropTypes from 'prop-types'

import LockIcon from '../../../icons/Lock.svg'
import DetailHeader from '../../../components/DetailHeader'
import Field from '../../../components/Field'
import Space from '../../../components/Space'
import Button from '../../../components/Button'
import { RoleStatus } from '../../../components/Status'
import Form from '../Form'
import './style.css'

class UserDetails extends Component {
  render () {
    const { data, edit, add, saveOrUpdate, getToDetailView, masterData, addUser, editUser, formError } = this.props
    return (<React.Fragment>
      <DetailHeader
        addEditMode={(edit || add)}
        onCancel={getToDetailView}
        title={(edit ? 'Edit' : (add ? 'Add New' : 'Details Info'))}
        onAdd={addUser} />
      { !(edit || add) && data === null && <div className='detail-empty-section'>Select a user <br /> to get detail info</div>}
      { !(edit || add) && data && <div className='detail-section'>
        <div className='detail-section-inner'>
          <Space vspace={20} />
          <Field label='EID' value={data.EID} />
          <Field label='Name' value={data.name} />
          <Field label='Username' value={data.username} />
          <Field label='Role' value={<RoleStatus status={data.role} />} />
          <Field label='Manager EID' value={data.directorEID} />
          <Field label='Status' value={data.status} />
          <Space vspace={20} />
        </div>
        <div className='button-wrapper'>
          <Button type='block' onClick={editUser}><img src={LockIcon} alt='' /> Unlock to make change</Button>
        </div>
      </div> }
      { (edit || add) &&
        <Form
          onSubmit={saveOrUpdate}
          getToDetailView={getToDetailView}
          masterData={masterData}
          formError={formError}
          isCreate={add} />
      }
    </React.Fragment>)
  }
}

UserDetails.propsType = {
  data: PropTypes.object,
  edit: PropTypes.bool,
  add: PropTypes.bool,
  saveOrUpdate: PropTypes.func,
  getToDetailView: PropTypes.func,
  addUser: PropTypes.func,
  editUser: PropTypes.func,
  masterData: PropTypes.object,
  formError: PropTypes.string
}

export default UserDetails
