import React from 'react'
import './style.css'

export const Content = ({ children }) => (
  <div className='content'><div className='inner'>{children}</div></div>
)

export const MainContent = ({ children }) => (
  <div className='main-content'>{children}</div>
)

export const FlexContent = ({ children }) => (
  <div className='flex-content'>{children}</div>
)
export const GutterContent = ({ children }) => (
  <div className='gutter-content '>{children}</div>
)
