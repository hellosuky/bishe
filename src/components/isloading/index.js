import React,{Component} from 'react'
import {Spin} from 'antd'
import './index.css'

class IsLoading extends Component{
  render(){
    return(
      <div className="icon">
         <Spin size="large" />
      </div>
    )
  }
}

export default IsLoading
