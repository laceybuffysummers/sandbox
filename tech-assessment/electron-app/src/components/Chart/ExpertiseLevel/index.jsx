import React, { Component } from 'react'
import { map } from 'lodash'
import PropsType from 'prop-types'
import './style.css'

class ExpertiseLevelChart extends Component {
  constructor () {
    super()
    this.state = {
      animate: false
    }
  }
  componentDidMount () {
    this.setState({animate: true})
  }
  render () {
    const { data } = this.props
    const { animate } = this.state
    return (<div className='expertise-level-chart'>
      { map(data, (item, i) => (<div key={i} className='bar'>
        <label>{item.label}</label>
        <div className='column'><div className='progress' style={{width: `${animate ? ((item.value * 100) / item.total) : '0'}%`}}>
          <div className='value'>{`${((item.value * 100) / item.total).toFixed(0)}% (${item.value})`}</div>
        </div></div>
        <label>{item.total} Employee</label>
      </div>)) }
    </div>)
  }
}

ExpertiseLevelChart.propsType = {
  data: PropsType.array
}
export default ExpertiseLevelChart
