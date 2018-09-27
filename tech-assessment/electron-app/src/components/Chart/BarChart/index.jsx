import React, { Component } from 'react'
import PropsType from 'prop-types'
import { Bar } from 'react-chartjs-2'

class Chart extends Component {
  render () {
    const barChart = React.createRef()
    const { data, title } = this.props
    if (data === undefined) {
      return null
    }
    return (<Bar
      ref={barChart}
      width={500}
      height={200}
      data={{
        labels: ['', '', '', ''],
        datasets: [{
          data: data,
          backgroundColor: [
            '#eb8f2b',
            '#007bc1',
            '#925fbe',
            '#87c346'
          ]
        }]
      }} options={{
        title: {
          display: true,
          position: 'bottom',
          text: title,
          padding: 0,
          color: '#4a4a4a',
          fontStyle: 'normal'
        },
        legend: {
          display: false
        },
        responsive: false,
        scales: {
          xAxes: [{gridLines: { display: false }}],
          yAxes: [{
            gridLines: {
              drawBorder: false
            },
            ticks: {
              beginAtZero: true,
              min: 0,
              max: 100,
              stepSize: 50,
              callback: (label) => label + '%'
            }
          }]
        },
        hover: {
          animationDuration: 0
        },
        animation: {
          onComplete: () => {
            const chartInstance = barChart.current.chartInstance
            const ctx = chartInstance.ctx

            ctx.font = 'Arial'
            ctx.fillStyle = '#ffffff'
            ctx.textAlign = 'center'
            ctx.textBaseline = 'bottom'

            barChart.current.props.data.datasets.forEach((dataset, i) => {
              const meta = chartInstance.controller.getDatasetMeta(i)
              meta.data.forEach((bar, index) => {
                const data = dataset.data[index] + '%'
                ctx.fillText(data, bar._model.x, bar._model.y + 25)
              })
            })
          }
        },
        tooltips: {
          enabled: false
        }
      }} />
    )
  }
}

Chart.propsType = {
  data: PropsType.array,
  title: PropsType.string
}
export default Chart
