import React, { Component } from 'react'
import PropsType from 'prop-types'
import Input from '../../components/Input'
import Button from '../../components/Button'
import './style.css'

class Pure extends Component {
  constructor () {
    super()
    this.state = {
      username: '',
      password: ''
    }
  }

  componentWillMount () {
    this.props.checkLoggedIn()
  }

  render () {
    const { login, fail } = this.props
    const { username, password } = this.state
    return (<div className='login-wrapper'>
      { fail && <div className='login-error'>Username or password is incorrect.</div> }
      <div>Username</div>
      <Input name='username' onChange={e => this.setState({username: e.target.value})} value={username} type='text' />
      <div>Password</div>
      <Input name='password' onChange={e => this.setState({password: e.target.value})} value={password} type='password' />
      <Button onClick={() => login(username, password)}>Login</Button>
    </div>)
  }
}
Pure.propsType = {
  login: PropsType.func,
  fail: PropsType.bool
}

export default Pure
