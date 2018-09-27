import React, { Component } from 'react'
import PropsType from 'prop-types'
import { Route } from 'react-router'

import { MainContent } from '../../components/Container'

import Header from '../../components/Header'
import Footer from '../../components/Footer'
import SideBar from '../../components/SideBar'

import User from '../User'
import Employee from '../Employee'
import EmpCompetency from '../EmpCompetency'
import AggregateTotal from '../AggregateTotal'
import Competency from '../Competency'
import CompetencyDetail from '../CompetencyDetail'

class Pure extends Component {
  componentDidMount () {
    this.props.loadMenuData()
    this.props.loadMasterData()
  }
  render () {
    const { user, menu, activeMenu, goTo, expandMenu, logout } = this.props
    return (<div>
      <Header user={user} onLogout={logout} />
      <MainContent>
        <SideBar expandMenu={expandMenu} goTo={goTo} activeMenu={activeMenu} menu={menu} />
        <React.Fragment>
          <Route exact path='/home/user' component={User} />
          <Route exact path='/home/employee' component={Employee} />
          <Route exact path='/home/empcompetency' component={EmpCompetency} />
          <Route exact path='/home/aggregatetotal' component={AggregateTotal} />
          <Route exact path='/home/competencies' component={Competency} />
          <Route exact path='/home/competency/:id' component={CompetencyDetail} />
        </React.Fragment>
      </MainContent>
      <Footer />
    </div>)
  }
}

Pure.propsType = {
  user: PropsType.object,
  menu: PropsType.object,
  activeMenu: PropsType.string,
  goTo: PropsType.func,
  expandMenu: PropsType.func,
  logout: PropsType.func
}

export default Pure
