import React from 'react'
import PropTypes from 'prop-types'
import Gear from '../../icons/Gear.svg'
import Logout from '../../icons/Logout.svg'
import './style.css'

const Header = ({ user, onSettings, onLogout }) => (
  <header>
    <div className='logo'>
      <i>TA</i>
        Tech Assessment
    </div>
    <div className='user-block'>
      <p>{user.name}</p>
      <div className={`role ${user.role && user.role.toLowerCase()}`}>{user.role}</div>
      <a className='settings-icon' onClick={onSettings}><img src={Gear} alt='' /></a>
      <a className='logout-icon' onClick={onLogout}><img src={Logout} alt='' /></a>
    </div>
  </header>
)
Header.propTypes = {
  user: PropTypes.object,
  onSettings: PropTypes.func,
  onLogout: PropTypes.func
}
Header.defaultProps = {
  user: {},
  onSettings: () => {},
  onLogout: () => {}
}
export default Header
