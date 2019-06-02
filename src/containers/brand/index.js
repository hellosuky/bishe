import React,{Component} from 'react'
import {Card,Icon,Breadcrumb } from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getDetail} from '../../reducers/product.redux'
import './index.css'

const { Meta } = Card
const URL = 'http://47.100.171.180:3001/upload/'

@connect(
  state => state.products,
  {getDetail}
)
class Brand extends Component{
  handleClick(id){
    this.props.getDetail(id)
    this.props.history.push('/detail')
  }
  handleBack(){
    this.props.history.goBack(-1)
  }
  render(){
    return (
      <div id="brand-container">
        <div className="top">
              <span className="back-icon" onClick={this.handleBack.bind(this)}><Icon type="left" /></span>
              <img alt="img" className="top-logo" src={require('../../images/logo.png')} />
              <span className="top-title">知美</span>
        </div>
        <Breadcrumb style={{'paddingTop':'75px','paddingLeft':"20px"}}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/">{this.props.products[0]?this.props.products[0].brand.name:null}</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="inner-container">
          {this.props.products.map(v=>{
            return <Card
              hoverable
              key={v._id}
              style={{ width: 240 }}
              onClick={this.handleClick.bind(this,v._id)}
              cover={<img alt="example" src={URL + v.pic} />}
              >
              <Meta title={v.name} description={v.brand.name} style={{'textAlign':"center"}}/>
              </Card>
          })}
          </div>
      </div>
    )
  }
}

export default withRouter(Brand)
