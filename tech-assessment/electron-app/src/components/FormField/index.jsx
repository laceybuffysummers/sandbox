import React from 'react'
import PropTypes from 'prop-types'
import MenuArrow from '../../icons/MenuArrow.svg'
import './style.css'

const FormField = ({ label, component }) => (
  <div className='form-field-wrapper'>
    <div className='form-label-wrapper'>{label}</div>
    <div className='form-value-wrapper'>{component}</div>
  </div>
)

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
}

export default FormField

export const FormWrapper = ({ children }) => <div className='form-wrapper'>{children}</div>
export const ExportButton = ({ children }) => <div className='export-button-wrapper'>{children}</div>
export const DetailSection = ({ children }) => <div className='detail-section'>{children}</div>
export const DetailSectionInner = ({ children }) => <div className='detail-section-inner'>{children}</div>
export const ButtonWrapper = ({ children }) => <div className='button-wrapper'>{children}</div>
export const SubHeading = ({ className, children }) => <div className={`${className} sub-heading`}>{children}</div>
export const Heading = ({ children }) => <div className='heading'>{children}</div>
export const ActionMenu = ({ children, onClick }) => <a onClick={onClick} className='action-menu'>{children}<img src={MenuArrow} alt='' /></a>
export const CompetencyHeading = ({ title, description }) => <div className='competency-header'><div><h3>{title}</h3><p className='description'>{description}</p></div></div>
