import React from 'react'
import PropsType from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Input from '../../components/Input'
import RadioButtons from '../../components/RadioButtons'
import Select from '../../components/Select'
import DetailHeader from '../../components/DetailHeader'
import Button from '../../components/Button'
import TextArea from '../../components/TextArea'
import { GutterContent } from '../../components/Container'
import FormField, { Heading, ActionMenu, FormWrapper, DetailSection, DetailSectionInner, ButtonWrapper } from '../../components/FormField'
import { required } from '../../helpers/validation'

const InputField = (props) => {
  const { meta: { touched, error }, input, label, type, disabled } = props
  return <FormField label={label} component={<Input placeholder={label} {...input} error={touched && error ? error : undefined} type={type || 'text'} disabled={disabled} />} />
}

const TextAreaField = (props) => {
  const { meta: { touched, error }, input, label } = props
  return <FormField label={label} component={<TextArea placeholder={label} {...input} error={touched && error ? error : undefined} type='text' />} />
}

const RadioButtonsField = (props) => {
  const { meta: { touched, error }, input } = props
  return <FormField label='Completed' component={<RadioButtons options={[{label: 'Completed', value: true}, {label: 'InComplete', value: false}]} {...input} error={touched && error ? error : undefined} />} />
}

const Form = props => {
  const { handleSubmit, masterdata, getBack, employeeComp, add, edit, addNew, subCompetencies, levels, activities, disabled } = props
  return (
    <React.Fragment>
      {
        !employeeComp
          ? (add === null && edit === null) && <GutterContent>
            <Heading>Add New</Heading>
            <ActionMenu onClick={() => addNew('SUB_COMPETENCY', false)}>Sub Competency</ActionMenu>
            <ActionMenu onClick={() => addNew('LEVEL', false)}>Level</ActionMenu>
            <ActionMenu onClick={() => addNew('ACTIVITY', false)}>Activity</ActionMenu>
          </GutterContent>
          : (add === null && edit === null) && <GutterContent>
            <Heading>Add New</Heading>
            <ActionMenu onClick={() => addNew('EMPLOYEE')}>Employee</ActionMenu>
          </GutterContent>
      }
      { (add || edit) && <form onSubmit={handleSubmit}>
        <React.Fragment>
          <DetailHeader addEditMode={(edit !== null || add !== null)}
            onCancel={getBack}
            title={(edit ? (edit === 'ACTIVITY' ? 'Edit Activity' : (edit === 'LEVEL') ? 'Edit Level' : (edit === 'COMPETENCY') ? 'Edit Competency' : 'Edit Sub Competency') : (add ? (add === 'ACTIVITY' ? 'New Activity' : (add === 'LEVEL') ? 'New Level' : (add === 'COMPETENCY') ? 'New Competency' : (add === 'EMPLOYEE') ? 'New Employee' : 'New Sub Competency') : 'Details Info'))} />
          <DetailSection>
            <DetailSectionInner>
              { (edit === 'COMPETENCY' || add === 'COMPETENCY') && <FormWrapper>
                <Field name='competency' component={({ input, meta: { touched, error } }) => <Input {...input} error={touched ? error : undefined} type='hidden' />} />
                <Field validate={[required]} name='name' label='Competency Name' component={InputField} />
                <Field validate={[required]} name='description' label='Competency Description' component={TextAreaField} />
              </FormWrapper> }
              { (edit === 'SUB_COMPETENCY' || add === 'SUB_COMPETENCY') && <FormWrapper>
                <Field name='subCompetency' component={({ input, meta: { touched, error } }) => <Input {...input} error={touched ? error : undefined} type='hidden' />} />
                <Field validate={[required]} name='competency' component={
                  ({ input, meta: { touched, error } }) => <FormField label='Select Competency' component={<Select options={masterdata} {...input} disabled={disabled} source='form' error={touched ? error : undefined} />} />} />
                <Field validate={[required]} name='name' label='Sub Competency Name' component={InputField} />
                <Field validate={[required]} name='description' label='Sub Competency Description' component={TextAreaField} />
              </FormWrapper> }
              { (edit === 'LEVEL' || add === 'LEVEL') && <FormWrapper>
                <Field name='levelId' component={({ input, meta: { touched, error } }) => <Input {...input} error={touched ? error : undefined} type='hidden' />} />
                <Field validate={[required]} name='competency' component={
                  ({ input, meta: { touched, error } }) => <FormField label='Select Competency' component={<Select options={masterdata} {...input} source='form' disabled={disabled} error={touched ? error : undefined} />} />} />
                <Field validate={[required]} name='subCompetency' component={
                  ({ input, meta: { touched, error } }) => <FormField label='Select Sub Competency' component={<Select options={subCompetencies} {...input} source='form' disabled={disabled} error={touched ? error : undefined} />} />} />
                <Field validate={[required]} name='level' label='Level No.' type='number' component={InputField} disabled={edit === 'LEVEL' && disabled} />
                <Field validate={[required]} name='name' label='Level Name' component={InputField} />
                <Field validate={[required]} name='description' label='Level Description' component={TextAreaField} />
              </FormWrapper> }
              { (edit === 'ACTIVITY' || add === 'ACTIVITY') && <FormWrapper>
                <Field name='activityId' component={({ input, meta: { touched, error } }) => <Input {...input} error={touched ? error : undefined} type='hidden' />} />
                <Field validate={[required]} name='competency' component={
                  ({ input, meta: { touched, error } }) => <FormField label='Select Competency' component={<Select options={masterdata} {...input} source='form' disabled={disabled} error={touched ? error : undefined} />} />} />
                <Field validate={[required]} name='subCompetency' component={
                  ({ input, meta: { touched, error } }) => <FormField label='Select Sub Competency' component={<Select options={subCompetencies} {...input} source='form' disabled={disabled} error={touched ? error : undefined} />} />} />
                <Field validate={[required]} name='level' component={
                  ({ input, meta: { touched, error } }) => <FormField label='Select Level' component={<Select options={levels} {...input} disabled={disabled} source='form' error={touched ? error : undefined} />} />} />
                <Field validate={[required]} name='name' label='Activity Name' component={InputField} />
                <Field validate={[required]} name='skillAcquired' label='Skills Acquired' component={InputField} />
                <Field validate={[required]} name='lifeExperience' label='Life Experience' component={InputField} />
              </FormWrapper> }
              { (edit === 'EMPLOYEE' || add === 'EMPLOYEE') && <FormWrapper>
                <Field validate={[required]} name='competency' component={
                  ({ input, meta: { touched, error } }) => <FormField label='Select Competency' component={<Select options={masterdata} {...input} source='form' disabled={disabled} error={touched ? error : undefined} />} />} />
                <Field validate={[required]} name='subCompetency' component={
                  ({ input, meta: { touched, error } }) => <FormField label='Select Sub Competency' component={<Select options={subCompetencies} {...input} source='form' disabled={disabled} error={touched ? error : undefined} />} />} />
                <Field validate={[required]} name='level' component={
                  ({ input, meta: { touched, error } }) => <FormField label='Select Level' component={<Select options={levels} {...input} disabled={disabled} source='form' error={touched ? error : undefined} />} />} />
                <Field validate={[required]} name='activity' component={
                  ({ input, meta: { touched, error } }) => <FormField label='Select Activity' component={<Select options={activities} {...input} disabled={disabled} source='form' error={touched ? error : undefined} />} />} />
                <Field validate={[required]} name='employeeEID' label='Employee EID' component={InputField} />
                <Field validate={[required]} name='completed' component={RadioButtonsField} />
              </FormWrapper> }
            </DetailSectionInner>
            <ButtonWrapper>
              <Button onClick={getBack} type='secondary'>Cancel</Button>
              <Button>Save</Button>
            </ButtonWrapper>
          </DetailSection>
        </React.Fragment>
      </form> }
    </React.Fragment>
  )
}

Form.propsType = {
  handleSubmit: PropsType.func,
  masterdata: PropsType.object,
  getBack: PropsType.func,
  add: PropsType.bool,
  addNew: PropsType.bool,
  edit: PropsType.func,
  subCompetencies: PropsType.array,
  levels: PropsType.array,
  disabled: PropsType.bool
}
export default reduxForm({
  form: 'competency'
})(Form)
