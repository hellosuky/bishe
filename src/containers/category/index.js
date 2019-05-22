import React,{Component} from 'react'
import { Input,Card,Breadcrumb,Pagination,Modal } from 'antd'
import axios from 'axios'
import './index.css'

const Search = Input.Search
const { Meta } = Card

class Category extends Component{
  constructor(){
    super()
    this.state = {
       visible: false
    }
  }
  showModal(){
    this.setState({
      visible: true,
    })
  };

  handleOk(e){
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel(e){
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  componentWillMount(){
    //get first page data of atom
    axios.get('/data')
    .then(data=>console.log(data))
  }
  render(){
    return (
      <div id="principle-container">
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
          <Breadcrumb.Item>首页</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">种类微观</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">保湿剂</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="inner-container">
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/GLYCERINE.png')} />}
          onClick={this.showModal.bind(this)}
          >
          <Meta title="甘油" description="GLYCERINE" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/Butanediol.png')} />}
          >
          <Meta title="丁二醇" description="Butanediol" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/Butanediol.png')} />}
          >
          <Meta title="聚二甲基硅氧烷" description="Polydimethylsiloxane" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/Hexalene.png')} />}
          >
          <Meta title="己二醇" description="hexalene" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/Ethylhexylglycerin.png')} />}
          >
          <Meta title="乙基己基甘油" description="Ethylhexylglycerin" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/Dipropylene glycol.png')} />}
          >
          <Meta title="双丙甘醇" description="Dipropylene glycol" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/(2R)-2,4-dihydroxy-N-(3-hydroxypropyl)-3,3-dimethylbutanamide.png')} />}
          >
          <Meta title="泛醇" description="(2R)-2,4-dihydroxy-N-(3-hydroxypropyl)-3,3-dimethylbutanamide" style={{'textAlign':"center"}}/>
          </Card>
          <Card
          hoverable
          style={{ width: 240 }}
          cover={<img alt="example" src={require('./images/SODIUM HYALURONATE.png')} />}
          >
          <Meta title="透明质酸钠" description="SODIUM HYALURONATE" style={{'textAlign':"center"}}/>
          </Card>
          <Pagination defaultCurrent={1} total={50} style={{'paddingLeft':"800px","paddingTop":"10px"}}/>
        </div>
          <Modal
           title="详细信息"
           visible={this.state.visible}
           onOk={this.handleOk.bind(this)}
           onCancel={this.handleCancel.bind(this)}
         >
           <iframe style={{'width': '500px', 'height': '300px'}}
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

export default Category
