import React,{Component} from 'react'
import { Input,Card,Pagination,Select,Icon,Breadcrumb} from 'antd'
import {withRouter} from 'react-router'
import _ from 'lodash'
import {connect} from 'react-redux'
import {getIngredient,getCategory} from '../../reducers/ingredient.redux'
import SelfModal from '../../components/modal/index'
import './index.css'

const { Meta } = Card
const {Option} = Select
const URL = 'http://47.100.171.180:3001/upload/'

@connect(
  state => state.ingredients,
  {getIngredient,getCategory}
)
class Category extends Component{
  constructor(){
    super()
    this.state = {
       visible: false,
       val:'',
       category:'',
       data:{},
       mobile:false
    }
    this.handleSearchWord1 = _.debounce(this.handleSearchWord,1000)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount(){
    this.props.getIngredient(1,'','')
    this.props.getCategory()
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
  handleBack(){
    this.props.history.goBack(-1)
  }
  showModal(data){
    this.setState({visible: true,data})
  }
  onChange(page,pageSize){
    this.props.getIngredient(page,this.state.category,this.state.val)
  }
  // 关键字搜索
  handleSearchWord(){
    this.props.getIngredient(1,this.state.category,this.state.val)
  }
  handleChange(category){
    this.setState({category})
    this.props.getIngredient(1,category,this.state.val)
  }
  close(){
    this.setState({visible:false})
  }
  handleSearch(e){
    this.setState({val:e},this.handleSearchWord1())
  }
  render(){
    return (
      <div id="category-container">
        <div className="top">
              <span className="back-icon" onClick={this.handleBack.bind(this)}><Icon type="left" /></span>
              <img alt="img" className="top-logo" src={require('../../images/logo.png')} />
              <span className="top-title">知美</span>
              {this.state.mobile?null:
                  <div className="top-select">
                    <Select defaultValue="选择分类" style={{ width: 120 }} onChange={e => this.handleChange(e)}>
                      <Option value="">所有</Option>
                      {this.props.category.map(v=>{
                        return <Option value={v._id} key={v._id}>{v.name}</Option>
                      })}
                    </Select>
                  </div>
                }
                {this.state.mobile?null:
                  <Input
                  className="top-search"
                  placeholder="搜索有效成分"
                  value={this.state.val}
                  onChange={e=>this.handleSearch(e.target.value)}
                  style={{ width: 200 }}
                />}
        </div>
        <Breadcrumb style={{'paddingTop':'75px','paddingLeft':"20px"}}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/">有效成分</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="inner-container">
          { this.props.ingredients.map(v=>{
            return  <Card
              hoverable
              key={v._id}
              style={{ width: 240 }}
              cover={<img alt="example" src={URL + v.pic} />}
              onClick={this.showModal.bind(this,v)}
              >
                <Meta title={v.name} description={v.enname} style={{'textAlign':"center"}}/>
              </Card>
          })}
        </div>
        <Pagination className="page" size={this.state.mobile?"small":"big"} defaultCurrent={1}
        onChange={this.onChange.bind(this)} total={50} />
        <SelfModal data={this.state.data} close={this.close.bind(this)} visible={this.state.visible}/>
      </div>
    )
  }
}

export default withRouter(Category)
