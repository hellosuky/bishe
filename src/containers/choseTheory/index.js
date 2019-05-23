import React,{Component} from 'react'
import { Input,Card} from 'antd'
import './index.css'

const Search = Input.Search
const { Meta } = Card

class ChoseTheory extends Component{
  handleClick(){
    this.props.history.push('/second')
  }
  render(){
    return (
      <div id="choseTheory-container">
        <div className="top">
              <img className="top-logo" alt="pic" src={require('./images/logo.png')} />
              <span className="top-title">知美</span>
                  <Search
                  className="top-search"
                  placeholder="搜索有效成分"
                  onSearch={value => console.log(value)}
                  style={{ width: 200 }}
                />
        </div>
        <div className="container">
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="pic1" src={require('./images/pic1.png')} />}
          >
            <Meta title="保湿剂" description="Humectant" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="pic2" src={require('./images/pic2.png')} />}
          >
            <Meta title="抗氧化剂" description="Antioxidant" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="pic3" src={require('./images/pic3.png')} />}
          >
            <Meta title="清洁剂" description="Detergent" style={{'textAlign':"center"}}/>
          </Card>
        </div>
      </div>
    )
  }
}

export default ChoseTheory
