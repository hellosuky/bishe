import React,{Component} from 'react'
import {Button } from 'antd'
import './index.css'

class FrontPage extends Component{
  constructor(){
    super()
    this.state = {
      mobile:false
    }
  }
  componentDidMount(){
    window.addEventListener("resize", this.resize.bind(this))
    this.resize()
  }
  resize() {
    if(window.innerWidth <= 768){
      this.setState({mobile:true})
    }else{
      this.setState({mobile:false})
    }
  }
  handleClick(){
    this.props.history.push('/second')
  }
  handleAdmin(){
    this.props.history.push('/admin')
  }
  render(){
    return (
      <div id="container">
        <div className="logo-container">
          <img src={require('../../images/logo.png')} alt="logo"/>
          <span>知美</span>
        </div>
        {this.state.mobile?null:
          <img onClick={this.handleAdmin.bind(this)} src={require('./images/admin.png')} className="admin" alt="logo"/>}
        <div className="inner-container">
          <p>了解微观下的化妆品</p>
          <Button type="primary" className="search" onClick={this.handleClick.bind(this)}>点击探索</Button>
        </div>
      </div>
    )
  }
}

export default FrontPage
