import React,{Component} from 'react'
import {Button } from 'antd'
import './index.css'

class SecondPage extends Component{
  handleClick(id){
    if(id === 1){
      this.props.history.push('/theory')
    }
    if(id === 2){
      this.props.history.push('/chosebrand')
    }
    if(id === 3){
      this.props.history.push('/category')
    }
  }
  render(){
    return (
      <div id="secondContainer">
        <div className="bg1box bgbox">
          <div className="subTitle">
            <img src={require('./images/cell.png')} alt="theory"/>
            <Button type="primary" className="btn" onClick={this.handleClick.bind(this,1)}>化妆品原理</Button>
          </div>
        </div>
        <div className="bg2box bgbox">
          <div className="subTitle">
            <img src={require('./images/brand.png')} alt="brand"/>
            <Button type="primary" className="btn" onClick={this.handleClick.bind(this,2)}>品牌成分检索</Button>
          </div>
        </div>
        <div className="bg3box bgbox">
          <div className="subTitle">
            <img src={require('./images/comestic.png')} alt="comestic"/>
            <Button type="primary" className="btn" onClick={this.handleClick.bind(this,3)}>成分分类检索</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default SecondPage
