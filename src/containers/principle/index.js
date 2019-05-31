import React,{Component} from 'react'
import {Icon} from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import './index.css'

@connect(
  state => state.theory
)
class Principle extends Component{
  handleClick(){
    this.props.history.go(-1)
  }
  render(){
    return (
      <div id="principle-container" >
        <div className="top">
              <span className="back-icon" onClick={this.handleClick.bind(this)}><Icon type="left" /></span>
              <img className="top-logo" alt="pic" src={require('../../images/logo.png')} />
              <span className="top-title">知美</span>
        </div>
        <div className="article">
          <div className="title">{this.props.article.title}</div>
          <div className="content" dangerouslySetInnerHTML={{__html:this.props.article.content}}/>
        </div>
      </div>
    )
  }
}

export default withRouter(Principle)
