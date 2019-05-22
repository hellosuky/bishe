import React,{Component} from 'react'
import { Input,Card} from 'antd'
import Brand from './brand.json'
import './index.css'

const Search = Input.Search
const { Meta } = Card


class ChoseTheory extends Component{
  constructor(){
    super()
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(title){
    //获取后端产品信息
  }
  render(){
    const a = 'guerlain.jpg'
    return (
      <div id="choseBrand-container">
        <div className="top">
              <img className="top-logo" src={require('./images/logo.png')} />
              <span className="top-title">知美</span>
                  <Search
                  className="top-search"
                  placeholder="搜索有效成分"
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }}
                />
        </div>
        <div className="container">
          {Brand.map(v=>{
            return <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="pic1" src={require('./images/' + v.img)} />}
                    onClick={this.handleClick.bind(this,v.title)}
                    >
                      <Meta title={v.title} description={v.description} style={{'textAlign':"center"}}/>
                    </Card>
          })}
        </div>
      </div>
    )
  }
}

export default ChoseTheory
