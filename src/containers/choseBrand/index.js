import React,{Component} from 'react'
import { Input,Card} from 'antd'
import {connect} from 'react-redux'
import {getBrand,getFrontProducts} from '../../reducers/product.redux'
import './index.css'

const Search = Input.Search
const { Meta } = Card
const URL = "http://localhost:9090/upload/"

@connect(
  state => state.products,
  {getBrand,getFrontProducts}
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
    this.props.getFrontProducts(1,brand)
    this.props.history.push('/brand')
  }
  render(){
    return (
      <div id="choseBrand-container">
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

export default ChoseBrand
