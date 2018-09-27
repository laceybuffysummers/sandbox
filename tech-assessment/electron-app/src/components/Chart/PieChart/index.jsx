import React, { Component } from 'react'
import { Doughnut } from 'react-chartjs-2'
import PropsType from 'prop-types'

class Chart extends Component {
  render () {
    const pieChart = React.createRef()
    const {data, title} = this.props
    if (data === undefined) {
      return null
    }
    return (<Doughnut ref={pieChart} data={{
      datasets: [{
        data: data,
        backgroundColor: [
          '#eb8f2b',
          '#007bc1',
          '#925fbe',
          '#87c346'
        ]
      }],
      labels: [
        'Red',
        'Yellow',
        'Blue'
      ]
    }} options={{
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      responsive: false,
      hover: {
        animationDuration: 0
      },
      cutoutPercentage: 70,
      animation: {
        onComplete: () => {
          const chartInstance = pieChart.current.chartInstance
          const ctx = chartInstance.ctx
          ctx.fillStyle = '#4a4a4a'
          ctx.font = '100 12px Roboto'
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(title.toUpperCase(), pieChart.current.props.width / 2, pieChart.current.props.height / 2, 190)
          const radius = 80
          const midX = 190 / 2
          const midY = 190 / 2
          ctx.textAlign = 'start'
          pieChart.current.props.data.datasets.forEach((dataset, i) => {
            const meta = chartInstance.controller.getDatasetMeta(i)
            meta.data.forEach((pie, j) => {
              const value = dataset.data[j] + '%'
              const startAngle = pie._model.startAngle
              const endAngle = pie._model.endAngle
              const middleAngle = startAngle + ((endAngle - startAngle) / 2)

              const posX = (radius - 2) * Math.cos(middleAngle) + midX
              const posY = (radius - 2) * Math.sin(middleAngle) + midY

              const wOffset = ctx.measureText(value).width / 3
              const hOffset = 1
              ctx.fillStyle = '#fff'
              ctx.fillText(value, posX - wOffset, posY + hOffset)
            })
          })
        }
      }
    }} width={190} height={190} />)
  }
}

Chart.propsType = {
  data: PropsType.array,
  title: PropsType.string
}

export default Chart
