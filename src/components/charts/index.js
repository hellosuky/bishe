import React,{Component} from 'react'
// import echarts from 'echarts'
import ReactEcharts from 'echarts-for-react'
import './index.css'

class Charts extends Component{
  getOption(){
    let x = this.props.data.map(v=>v._id[0])
    let x1 = x.slice(0,5)
    let y = this.props.data.map(v=>v.num)
    let y1 = y.slice(0,5)
    return {
      title: {
        left: 'center',
        text: '品牌有效元素TOP5'
      },
      tooltip:{
        trigger:'axis'
      },
        xAxis: {
            type: 'category',
            data: x1,
            axisLabel:{
              interval:0,
              rotate:-30
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: y1,
            type: 'bar'
        }]
      }
  }
  render(){
    return(
      <div id="charts-container">
          <ReactEcharts
          option={this.getOption()}
          notMerge={true}
          lazyUpdate={true}
          style={{width: '100%'}}
        />
      </div>
    )
  }
}

export default Charts
