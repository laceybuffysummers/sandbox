import React from 'react'
import './style.css'

export { default as BarChart } from './BarChart'
export { default as PieChart } from './PieChart'
export { default as ExpertiseLevelChart } from './ExpertiseLevel'

export const ChartWrapper = ({ children, className }) => <div className={`chart-wrapper ${className}`}>{children}</div>
