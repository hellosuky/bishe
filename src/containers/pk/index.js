import React,{Component} from 'react'
import {Breadcrumb,List,Button,Cascader,Icon} from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {getAllProducts,getPkDetail,getDetail} from '../../reducers/product.redux'
import {getSpecialIngredient} from '../../reducers/ingredient.redux'
import SelfModal from '../../components/modal/index'
import './index.css'

const URL = 'http://localhost:3001/upload/'
@connect(
  state => ({products:state.products,ingredients:state.ingredients}),
  {getAllProducts,getPkDetail,getSpecialIngredient,getDetail}
)
class Pk extends Component{
  constructor(){
    super()
    this.state = {
       visible: false
    }
    this.showModal = this.showModal.bind(this)
  }
  close(){
    this.setState({visible:false})
  }
  componentWillMount(){
    this.props.getAllProducts()
    this.props.getDetail(this.props.match.params.id)
  }
  onChange(value) {
    this.props.getPkDetail(value[1])
  }
  handleBack(){
    this.props.history.goBack(-1)
  }
  showModal(data){
    this.props.getSpecialIngredient(data._id)
    this.setState({visible:true})
  }
  render(){
    const product = this.props.products
    const ingredient = this.props.ingredients
    return (
      <div id="pk-container">
        <div className="top">
            <span className="back-icon" onClick={this.handleBack.bind(this)}><Icon type="left" /></span>
            <img className="top-logo" alt="img" src={require('../../images/logo.png')} />
            <span className="top-title">知美</span>
        </div>
        <Breadcrumb style={{'paddingTop':'75px','paddingLeft':"20px"}}>
          <Breadcrumb.Item>
            <a href="/">品牌成分</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/">成分对比</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="container" style={{"color":"#000"}}>
          <div className="pk-product pk">
            <img style={{'width':"200px","height":"200px","float":"left"}} alt="pic" src={URL + product.detail.pic}/>
            <div className="word">
              <p>{product.detail.name}</p>
              <p>{product.detail.brand?product.detail.brand.name:null}</p>
            </div>
            <p className="useful">有效成分</p>
            <List
            bordered
            dataSource={product.detail.Ingredient}
            renderItem={(item,index) => (
              <List.Item className="list">
                <span className="text">{item.name}</span>
                <Button type="primary"
                onClick={() => this.showModal(item)}>查看</Button>
              </List.Item>
            )}
          />
          <p className="base">辅助成分</p>
          <List
          bordered
          dataSource={product.detail.base}
          renderItem={(item,index) => (
            <List.Item className="list">
              <span className="text">{item}</span>辅助元素
            </List.Item>
          )}
        />
          </div>
          <div className="pk-product">
            <Cascader className="select" options={product.allProducts}
            onChange={this.onChange.bind(this)} placeholder="选择你想比较的品牌" />
            {product.pkdetail.name?
              <div>
              <div className="pk-product">
                <img style={{'width':"200px","height":"200px","float":"left"}} alt="pic" src={URL + product.pkdetail.pic}/>
                <div className="word">
                  <p>{product.pkdetail.name}</p>
                  <p>{product.pkdetail.brand?product.pkdetail.brand.name:null}</p>
                </div>
              <p className="useful">有效成分</p>
              <List
              bordered
              dataSource={product.pkdetail.Ingredient}
              renderItem={(item,index) => (
                <List.Item className="list">
                  <span className="text">{item.name}</span><Button type="primary" onClick={() => this.showModal(item)}>查看</Button>
                </List.Item>
              )}
            />
            <p className="base">辅助成分</p>
            <List
            bordered
            dataSource={product.pkdetail.base}
            renderItem={(item,index) => (
              <List.Item className="list">
                <span className="text">{item}</span> 辅助元素
              </List.Item>
            )}
          />
          </div>
          </div>:null}
          </div>
        </div>
        <SelfModal data={ingredient.ingredient} visible={this.state.visible} close={this.close.bind(this)}/>
      </div>
    )
  }
}

export default withRouter(Pk)
