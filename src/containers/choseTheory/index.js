import React,{Component} from 'react'
import { Input,Card,List,Avatar,Icon} from 'antd'
import './index.css'

const Search = Input.Search
const { Meta } = Card

const listData = [];
for (let i = 0; i < 2; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `保湿剂`,
    description:
      '保湿剂是一类亲水性的润肤物质',
    content:
      '在较低湿度范围内具有结合水的能力，给皮肤补充水分，它们可以通过控制产品与周围空气之间水分的交换使皮肤维持在高于正常水含量的平衡状态，起到减轻皮肤干燥的作用',
  });
}

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
)

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
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={listData}
          footer={false}
          renderItem={item => (
            <List.Item
              key={item.title}
              extra={
                <img
                  width={272}
                  alt="logo"
                  src={require('./images/pic1.png')}
                />
              }
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
        </div>
      </div>
    )
  }
}

export default ChoseTheory
