import React,{Component} from 'react'
import { Input,Card,Breadcrumb,Pagination } from 'antd'
import {connect} from 'react-redux'
import {getDetail} from '../../reducers/product.redux'
import './index.css'

const Search = Input.Search
const { Meta } = Card
const URL = 'http://localhost:9090/upload/'

@connect(
  state => state.products,
  {getDetail}
)
class Brand extends Component{
  handleClick(id){
    this.props.getDetail(id)
    this.props.history.push('/detail')
  }
  onChange(page,pageSize){
    console.log(page)
  }
  render(){
    return (
      <div id="brand-container">
        <div className="top">
              <img alt="img" className="top-logo" src={require('./images/logo.png')} />
              <span className="top-title">知美</span>
              <Search
              className="top-search"
              placeholder="搜索有效成分"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
        </div>
        <Breadcrumb style={{'paddingTop':'75px','paddingLeft':"20px"}}>
          <Breadcrumb.Item>
            <a href="/">品牌成分</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/">雅诗兰黛</a>
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
          <Pagination defaultCurrent={1} onChange={this.onChange.bind(this)} total={50} style={{'paddingLeft':"800px","paddingTop":"10px"}}/>
        </div>
      </div>
    )
  }
}

export default Brand
