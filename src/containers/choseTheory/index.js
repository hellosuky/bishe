import React,{Component} from 'react'
import {List,Icon} from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getTheory,getSpecialTheory} from '../../reducers/theory.redux'
import './index.css'

const URL = 'http://localhost:3001/upload/'

@connect(
  state => state.theory,
  {getTheory,getSpecialTheory}
)
class ChoseTheory extends Component{
  componentWillMount(){
    this.props.getTheory(1)
  }
  handleClick(id){
    this.props.getSpecialTheory(id)
    this.props.history.push('/principle')
  }
  handleBack(){
    this.props.history.goBack(-1)
  }
  render(){
    return (
      <div id="choseTheory-container">
        <div className="top">
              <span className="back-icon" onClick={this.handleBack.bind(this)}><Icon type="left" /></span>
              <img className="top-logo" alt="pic" src={require('../../images/logo.png')} />
              <span className="top-title">知美</span>
        </div>
        <div className="container">
          <List
            itemLayout="vertical"
            size="xs"
            dataSource={this.props.theory}
            footer={false}
            renderItem={item => {
              let text1 = item.content.replace(/<[^>]+>/g,"")
              return (
              <List.Item
                key={item._id}
                onClick={this.handleClick.bind(this,item._id)}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src={URL +  item.cover}
                  />
                }
              >
                <List.Item.Meta
                  title={<a href={item.href}>{item.title}</a>}
                />
                {text1}
            </List.Item>
            )}
            }
          />
        </div>
      </div>
    )
  }
}

export default withRouter(ChoseTheory)
