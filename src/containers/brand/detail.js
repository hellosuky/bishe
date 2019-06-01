import React,{Component} from 'react'
import { Breadcrumb,List,Button,Icon } from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import SelfModal from '../../components/modal/index'
import {getDetail} from '../../reducers/product.redux'
import {getSpecialIngredient} from '../../reducers/ingredient.redux'
import './index.css'


const URL = 'http://localhost:9090/upload/'

@connect(
  state => ({products:state.products,ingredients:state.ingredients}),
  {getDetail,getSpecialIngredient}
)
class Detail extends Component{
  constructor(){
    super()
    this.state = {
       visible: false
    }
    this.showModal = this.showModal.bind(this)
  }
  componentWillMount(){
    this.props.getDetail('5cefd1eb32b7033388762313')
  }
  showModal(data){
    this.props.getSpecialIngredient(data._id)
    this.setState({visible:true})
  }
  handleBack(){
    this.props.history.goBack(-1)
  }
  close(){
    this.setState({visible:false})
  }
  handlePk(){
    this.props.history.push('/pk')
  }
  render(){
    const product = this.props.products
    const ingredient = this.props.ingredients
    return (
      <div id="detail-container">
        <div className="top">
            <span className="back-icon" onClick={this.handleBack.bind(this)}><Icon type="left" /></span>
            <img className="top-logo" alt="pic" src={require('../../images/logo.png')} />
            <span className="top-title">知美</span>
        </div>
        <div className="container" style={{"color":"#000"}}>
          <Breadcrumb style={{'paddingTop':'75px','paddingLeft':"20px"}}>
            <Breadcrumb.Item>首页</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/">{product.detail.brand?product.detail.brand.name:null}</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/">{product.detail.name}</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="product">
            {product.detail.pic?
              <img alt="img" className="product-pic" src={URL + product.detail.pic}/>:null}
            <div className="word">
              <p>{product.detail.name}</p>
              <p>{product.detail.brand?product.detail.brand.name:null}</p>
              <Button type="primary" onClick={this.handlePk.bind(this)}>Pk</Button>
            </div>
          </div>
          <br/>
          <p className="useful">有效成分</p>
          <List
            style={{"marginTop":"10px","clear":"both"}}
            bordered
            dataSource={product.detail.Ingredient}
            renderItem={(item,index) =>
              (
              <List.Item className="list">
                <span className="text">{item.name}</span>
                <Button type="primary" className="ingredient-btn" onClick={() => this.showModal(item)}>查看</Button>
              </List.Item>
          )}
        />
          <p className="base">辅助成分</p>
          <List
            style={{"marginTop":"10px","clear":"both"}}
            bordered
            dataSource={product.detail.base}
            renderItem={(item,index) =>
              (
              <List.Item>
                {item}
              </List.Item>
          )}
        />
      </div>
      <SelfModal data={ingredient.ingredient} visible={this.state.visible} close={this.close.bind(this)}/>
    </div>
    )
  }
}


export default withRouter(Detail)
