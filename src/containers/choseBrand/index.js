import React,{Component} from 'react'
import { Card,Icon} from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getBrand} from '../../reducers/product.redux'
import './index.css'

const { Meta } = Card
const URL = 'http://localhost:3001/upload/'

@connect(
  state => state.products,
  {getBrand}
)
class ChoseBrand extends Component{
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  componentWillMount(){
    this.props.getBrand()
  }
  handleClick(brand){
    //获取后端产品信息
    this.props.history.push(`/brand/${brand}`)
  }
  handleBack(){
    this.props.history.goBack(-1)
  }
  render(){
    return (
      <div id="choseBrand-container">
        <div className="top">
              <span className="back-icon" onClick={this.handleBack.bind(this)}><Icon type="left" /></span>
              <img alt="img" className="top-logo" src={require('../../images/logo.png')} />
              <span className="top-title">知美</span>
        </div>
        <div className="container">
          {this.props.brands.map(v=>{
            return <Card
                    key={v._id}
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="pic1" src={URL + v.pic} />}
                    onClick={this.handleClick.bind(this,v._id)}
                    >
                      <Meta title={v.name} description={v.enname} style={{'textAlign':"center"}}/>
                    </Card>
          })}
        </div>
      </div>
    )
  }
}

export default withRouter(ChoseBrand)
