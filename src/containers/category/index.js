import React,{Component} from 'react'
import { Input,Card,Pagination,Select} from 'antd'
import _ from 'lodash'
import {connect} from 'react-redux'
import {getIngredient,getCategory} from '../../reducers/ingredient.redux'
import SelfModal from '../../components/modal/index'
import './index.css'

const Search = Input.Search
const { Meta } = Card
const {Option} = Select
const URL = 'http://localhost:9090/upload/'

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
       data:{}
    }
    this.handleSearchWord1 = _.debounce(this.handleSearchWord,1000)
  }
  componentWillMount(){
    this.props.getIngredient(1,'null','')
    this.props.getCategory()
  }
  showModal(data){
    this.setState({visible: true,data})
  }
  onChange(page,pageSize){
    this.props.getIngredient(page,this.state.category,this.state.val)
  }
  // 关键字搜索
  handleSearchWord(word){
    this.props.getIngredient(1,this.state.category,word)
  }
  handleChange(category){
    this.setState({category})
    this.props.getIngredient(1,category,this.state.val)
  }
  close(){
    this.setState({visible:false})
  }
  handleSearch(e){
    this.setState({val:e},this.handleSearchWord1(this.state.val))
  }
  render(){
    return (
      <div id="principle-container">
        <div className="top">
              <img alt="img" className="top-logo" src={require('../../images/logo.png')} />
              <span className="top-title">知美</span>
              <div className="top-select">
                <Select defaultValue="选择分类" style={{ width: 120 }} onChange={e => this.handleChange(e)}>
                  <Option value="null">所有</Option>
                  {this.props.category.map(v=>{
                    return <Option value={v._id} key={v._id}>{v.name}</Option>
                  })}
                </Select>
              </div>
              <Search
              className="top-search"
              placeholder="搜索有效成分"
              onSearch={e=>this.handleSearch.bind(this,e)}
              style={{ width: 200 }}
            />
        </div>
        <div className="inner-container">
          {this.props.ingredients && this.props.ingredients.map(v=>{
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
          <Pagination defaultCurrent={1} onChange={this.onChange.bind(this)} total={50} style={{'paddingLeft':"800px","paddingTop":"10px"}}/>
        </div>
        <SelfModal data={this.state.data} close={this.close.bind(this)} visible={this.state.visible}/>
      </div>
    )
  }
}

export default Category
