import React,{Component} from 'react'
import { Input,Breadcrumb,Pagination,Modal,List,Button } from 'antd'
import {connect} from 'react-redux'
import {getDetail} from '../../reducers/product.redux'
import './index.css'

const Search = Input.Search

@connect(
  state => state.products,
  {getDetail}
)
class Detail extends Component{
  componentWillMount(){
    this.props.getDetail('5cef418ea2ee004c98742b90')
  }
  constructor(){
    super()
    this.state = {
       visible: false
    }
  }
  showModal(){
    this.setState({
      visible: true
    })
  };

  handleOk(e){
    this.setState({
      visible: false
    })
  }

  handleCancel(e){
    this.setState({
      visible: false
    })
  }
  render(){
    return (
      <div id="detail-container">
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
        <Breadcrumb style={{'paddingTop':'75px','paddingLeft':"20px"}}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/">品牌成分</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/">雅诗兰黛</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="container" style={{"color":"#000"}}>
          <img alt="pic"style={{'width':"200px","height":"200px","float":"left"}} src={require('./images/pic1.png')}/>
          <div className="word">
            <p>雅诗兰黛白金级尊宠精华霜</p>
            <p>ESTĒE LAUDER Re-Nutriv Re-Creation Face Creme</p>
            <Button type="primary">Pk</Button>
          </div>
          <br/>
          <p>有效成分</p>
          <List
            style={{"marginTop":"10px","clear":"both"}}
            bordered
            dataSource={this.props.detail.Ingredient}
            renderItem={(item,index) =>
              (
              <List.Item>
                {item} <Button type="primary">查看</Button>
              </List.Item>
          )}
        />
          <p>辅助成分</p>
          <List
            style={{"marginTop":"10px","clear":"both"}}
            bordered
            dataSource={this.props.detail.base}
            renderItem={(item,index) =>
              (
              <List.Item>
                {item}
              </List.Item>
          )}
        />
          <Pagination defaultCurrent={1} total={50} style={{'paddingLeft':"800px","paddingTop":"10px","clear":"both"}}/>
        </div>
          <Modal
           title="详细信息"
           visible={this.state.visible}
           onOk={this.handleOk.bind(this)}
           onCancel={this.handleCancel.bind(this)}
         >
           <iframe style={{'width': '500px', 'height': '300px'}}
           title="aa"
           frameborder="0" src="https://embed.molview.org/v1/?mode=balls&cid=753&bg=white"></iframe>
           <p>丙三醇</p>
           <p>IUPAC命名 propane-1,2,3-triol</p>
           <p>甘油又称丙三醇，柔软、保湿、卸妆溶剂及润滑剂。
           绝不可直接使用未经稀释的100%纯甘油，会造成反效果。
           甘油具有吸水作用，保湿护肤品常常用它吸附空气中的水分子，
           令其覆盖的皮肤角质层保持湿润。但是纯甘油的保湿效果容易受到空气中湿度的影响。
           湿度较低的季节或环境，纯甘油在空气中吸收不到足够的水分，反而会从肌肤真皮中吸取水分，使皮肤更加干燥，
           甚至出现脱水。但是基于多数化妆品是复合型，可以考虑有添加适量甘油的化妆品但不建议选用纯甘油化妆品。</p>
         </Modal>
      </div>
    )
  }
}

export default Detail
