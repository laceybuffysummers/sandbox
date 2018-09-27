import React from 'react'
import PropsType from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Input from '../../../components/Input'
import Select from '../../../components/Select'
import Button from '../../../components/Button'
import ReadOnlyField from '../../../components/Field'
import { FormWrapper, DetailSection, DetailSectionInner, ButtonWrapper } from '../../../components/FormField'
import Space from '../../../components/Space'
import { required } from '../../../helpers/validation'
import './style.css'

const EIDComponent = ({ input, meta: { touched, error } }) => <Input placeholder='EID' {...input} error={touched ? error : undefined} type='text' />
const readOnlyEIDComponent = ({ input }) => <ReadOnlyField {...input} label={'EID'} />
const nameComponent = ({ input, meta: { touched, error } }) => <Input placeholder='Name' {...input} error={touched ? error : undefined} type='text' />
const usernameComponent = ({ input, meta: { touched, error } }) => <Input placeholder='Username' {...input} error={touched ? error : undefined} type='text' />
const passwordComponent = ({ input, meta: { touched, error } }) => <Input placeholder='Password' {...input} error={touched ? error : undefined} type='password' />
const roleComponent = (masterData) => ({ input, meta: { touched, error } }) => <Select options={masterData.roles} error={touched ? error : undefined} label={'Role'} {...input} />
const directorEIDComponent = ({ input, meta: { touched, error } }) => <Input placeholder='Manager EID' {...input} error={touched ? error : undefined} type='text' />
const statusComponent = (masterData) => ({ input, meta: { touched, error } }) => <Select options={masterData.statues} error={touched ? error : undefined} label={'Status'} {...input} />

const Form = props => {
  const { handleSubmit, masterData, getToDetailView, isCreate, formError } = props
  return (
    <form onSubmit={handleSubmit}>
      <DetailSection>
        <DetailSectionInner>
          <FormWrapper>
            <Space vspace={20} />
            <Field name='EID' component={isCreate ? EIDComponent : readOnlyEIDComponent} />
            <Field validate={[required]} name='name' component={nameComponent} />
            <Field validate={[required]} name='username' component={usernameComponent} />
            <Field validate={isCreate ? [required] : null} name='password' component={passwordComponent} />
            <Field validate={[required]} name='role' component={roleComponent(masterData)} />
            <Field name='directorEID' component={directorEIDComponent} />
            <Field validate={[required]} name='status' component={statusComponent(masterData)} />
            <span className='error-text'>{formError}</span>
            <Space vspace={15} />
          </FormWrapper>
        </DetailSectionInner>
        <ButtonWrapper>
          <Button onClick={getToDetailView} type='secondary'>Cancel</Button>
          <Button>Save</Button>
        </ButtonWrapper>
      </DetailSection>
    </form>
  )
}

Form.propsType = {
  handleSubmit: PropsType.func,
  getToDetailView: PropsType.func,
  masterData: PropsType.object,
  isCreate: PropsType.bool,
  formError: PropsType.string
}

export default reduxForm({
  form: 'user'
})(Form)
