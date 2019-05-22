import React,{Component} from 'react'
import {Button } from 'antd'
import './index.css'

class FrontPage extends Component{
  handleClick(){
    this.props.history.push('/second')
  }
  render(){
    return (
      <div id="container">
        <div className="logo-container">
          <img src={require('./images/logo.png')} alt="logo"/>
          <span>知美</span>
        </div>
        <div className="inner-container">
          <p>了解微观下的化妆品</p>
          <Button type="primary" className="search" onClick={this.handleClick.bind(this)}>点击探索</Button>
        </div>
      </div>
    )
  }
}

export default FrontPage
