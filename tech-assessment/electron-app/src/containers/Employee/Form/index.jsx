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
const nameComponent = ({ input, meta: { touched, error } }) => <Input placeholder='Name' {...input} error={touched ? error : undefined} />
const countryComponent = (masterData) => ({ input, meta: { touched, error } }) => <Select options={masterData.regions} label={'Country/Region'} {...input} error={touched ? error : undefined} />
const divisionComponent = (masterData) => ({ input, meta: { touched, error } }) => <Select options={masterData.divisions} label={'Division'} {...input} error={touched ? error : undefined} />
const subGroupComponent = (masterData) => ({ input, meta: { touched, error } }) => <Select options={masterData.subGroups} label={'SubGroup'} {...input} error={touched ? error : undefined} />
const profileComponent = (masterData) => ({ input, meta: { touched, error } }) => <Select options={masterData.profiles} label={'Profile'} {...input} error={touched ? error : undefined} />
const managerEIDComponent = ({ input, meta: { touched, error } }) => <Input placeholder={'Manager\'s EID'} {...input} error={touched ? error : undefined} />
const genericSelect = (label, options, change) => ({ input, meta: { touched, error } }) => {
  const { onChange } = input
  const _onChange = event => {
    onChange(event.target.value)
    // Toggle the values of select fields according to hierarchical selection
    switch (input.name) {
      case 'competency':
        change('subCompetency', '')
        change('currentMaturity', '')
        change('expectedMaturity', '')
        break
      case 'subCompetency':
        change('currentMaturity', '')
        change('expectedMaturity', '')
        break
      default:
        return null
    }
  }
  return <Select options={options} label={label} {...input} onChange={_onChange} source='form' error={touched ? error : undefined} />
}

const Form = props => {
  const { handleSubmit, masterData, getToDetailView, isCreate, formError, competencies, subCompetencies, levels, change } = props
  return (
    <form onSubmit={handleSubmit}>
      <DetailSection>
        <DetailSectionInner>
          <FormWrapper>
            <Space vspace={20} />
            <Field name='EID' component={isCreate ? EIDComponent : readOnlyEIDComponent} />
            <Field validate={[required]} name='name' component={nameComponent} type='text' />
            <Field validate={[required]} name='country' component={countryComponent(masterData)} />
            <Field validate={[required]} name='division' component={divisionComponent(masterData)} />
            <Field validate={[required]} name='subGroup' component={subGroupComponent(masterData)} />
            <Field validate={[required]} name='profile' component={profileComponent(masterData)} />
            <Field validate={[required]} name='managerEID' component={managerEIDComponent} type='text' />
            { !isCreate && <Field validate={[required]} name='competency' component={genericSelect('Competency', competencies, change)} /> }
            { !isCreate && <Field validate={[required]} name='subCompetency' component={genericSelect('Sub Competency', subCompetencies, change)} /> }
            { !isCreate && <Field validate={[required]} name='currentMaturity' component={genericSelect('Current Maturity', levels, change)} /> }
            { !isCreate && <Field validate={[required]} name='expectedMaturity' component={genericSelect('Expected Maturity', levels, change)} /> }
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
  masterData: PropsType.object,
  getToDetailView: PropsType.func.func,
  isCreate: PropsType.bool,
  formError: PropsType.string
}
export default reduxForm({
  form: 'employee'
})(Form)
