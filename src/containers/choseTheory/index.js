import React,{Component} from 'react'
import { Input,List} from 'antd'
import {connect} from 'react-redux'
import {getTheory} from '../../reducers/theory.redux'
import './index.css'

const Search = Input.Search
const URL = 'http://localhost:9090/upload/'

@connect(
  state => state.theory,
  {getTheory}
)
class ChoseTheory extends Component{
  componentWillMount(){
    this.props.getTheory(1)
  }
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
          <List
            itemLayout="vertical"
            size="large"
            style={{'minWidth':'800px'}}
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={this.props.theory}
            footer={false}
            renderItem={item => {
              let text1 = item.content.replace(/<[^>]+>/g,"")
              return (
              <List.Item
                key={item._id}
                extra={
                  <img
                    width={272}
                    alt="logo"
                    src={item.pic?URL +  item.pic:require('./images/pic1.png')}
                  />
                }
              >
                <List.Item.Meta
                  title={<a href={item.href}>{item.title}</a>}
                />
                {text1}
            </List.Item>
            )}
            }
          />
        </div>
      </div>
    )
  }
}

export default ChoseTheory
