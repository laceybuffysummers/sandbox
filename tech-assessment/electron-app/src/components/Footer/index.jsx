import React from 'react'
import PropTypes from 'prop-types'
import './style.css'

const Footer = ({ copyRightText }) => (
  <footer>
    <div className='copy-right'>{copyRightText}</div>
    <nav>
      <ul>
        <li><a href=''>Contact Us</a></li>
        <li className='seperator'>|</li>
        <li><a href=''>Help</a></li>
      </ul>
    </nav>
  </footer>
)

Footer.propTypes = {
  copyRightText: PropTypes.string
}

Footer.defaultProps = {
  copyRightText: 'Tech Assessment ©2018'
}
export default Footer
