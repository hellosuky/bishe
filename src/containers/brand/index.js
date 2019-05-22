import React,{Component} from 'react'
import { Input,Card,Breadcrumb,Pagination,Modal } from 'antd'
import './index.css'

const Search = Input.Search
const { Meta } = Card

class Brand extends Component{
  render(){
    return (
      <div id="brand-container">
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
        <Breadcrumb style={{'paddingTop':'75px','paddingLeft':"20px"}}>
          <Breadcrumb.Item>
            <a href="">品牌成分</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">雅诗兰黛</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="inner-container">
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/pic1.png')} />}
          >
          <Meta title="雅诗兰黛白金级尊宠精华霜" description="ESTĒE LAUDER Re-Nutriv Re-Creation Face Creme" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/pic2.png')} />}
          >
          <Meta title="雅诗兰黛沁水倍润轻乳霜" description="ESTEE LAUDER Nutritious Active-Tremella Hydra Fortifying Soufflé Creme" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/pic3.png')} />}
          >
          <Meta title="雅诗兰黛沁水倍润眼部凝霜" description="ESTEE LAUDER Nutritious Active-Tremella Hydra Fortifying Eye Balm" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/pic4.png')} />}
          >
          <Meta title="雅诗兰黛沁水倍润三合一洁颜水" description="ESTĒE LAUDER Nutritious Active-Tremella Hydra Fortifying Micellar Cleanser" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/pic5.png')} />}
          >
          <Meta title="雅诗兰黛弹力多肽眼霜" description="ESTĒE LAUDER Resilience Multi-Effect Tri-Peptide Eye Creme" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/pic6.png')} />}
          >
          <Meta title="雅诗兰黛弹力多肽面颈柔肤霜" description="ESTĒE LAUDER Resilience Multi-Effect Tri-Peptide Face and Neck Creme" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/pic7.png')} />}
          >
          <Meta title="雅诗兰黛弹力多肽面颈柔肤晚霜" description="Estee Lauder Resilience Multi-Effect Night Tri-Peptide Face and Neck Creme" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/pic8.png')} />}
          >
          <Meta title="雅诗兰黛樱花微精华露" description="Estee Lauder Micro Essence Skin Activating Treatment Lotion Fresh with Sakura Ferment" style={{'textAlign':"center"}}/>
          </Card>
          <Pagination defaultCurrent={1} total={50} style={{'paddingLeft':"800px","paddingTop":"10px"}}/>
        </div>
      </div>
    )
  }
}

export default Brand
