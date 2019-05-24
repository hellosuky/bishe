import React,{Component} from 'react'
import { Input,Breadcrumb,Pagination,Modal,List,Typography,Button } from 'antd'
import './index.css'

const Search = Input.Search

class Detail extends Component{
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
  render(){
  const data = "水、C12-20 酸 PEG-8 酯、甘油、辛酸/癸酸甘油三酯、椰油醇-辛酸酯/癸酸酯、鲸蜡醇蓖麻醇酸酯、鲸蜡醇、丁二醇、PEG-100 硬脂酸酯、1,3-丙二醇、鲸蜡醇磷酸酯钾、乙酰壳糖胺、生育酚乙酸酯、卡波姆、辛甘醇、丙二醇二癸酸酯、聚二甲基硅氧烷、苯氧乙醇、向日葵(HELIANTHUS ANNUUS)籽饼、(日用)香精、咖啡因、甘草亭酸、假交替单胞菌发酵产物提取物、氨丁三醇、葡萄糖、植物鞘氨醇、碳酸钙、乳清蛋白、珍珠粉、白桦(BETULA ALBA)树皮/叶提取物、酵母提取物、糊精、黄原胶、己二醇、亚油酸、透明质酸钠、虎杖(POLYGONUM CUSPIDATUM)根提取物、脱羧肌肽 HCl、EDTA 二钠、磷脂、氨基丙醇抗坏血酸磷酸酯、丙烯酸钠/丙烯酰二甲基牛磺酸钠共聚物、植物甾醇低芥酸菜子油甘油酯类、掌状海带(LAMINARIA DIGITATA)提取物、氢化聚癸烯、棕榈酸、藻提取物、大麦(HORDEUM VULGARE)籽提取物、油酸、卵磷脂、百金花(CENTAURIUM ERYTHRAEA)提取物、聚甲基硅倍半氧烷、硬脂酸、三油精、奥氏海藻(CLADOSIPHON OKAMURANUS)提取物、月桂醇聚醚-8、稻(ORYZA SATIVA)糠提取物、黄瓜(CUCUMIS SATIVUS)果提取物、微球菌溶胞产物、柠檬酸、迷迭香(ROSMARINUS OFFICINALIS)叶提取物、野大豆(GLYCINE SOJA)蛋白、葡萄(VITIS VINIFERA)籽提取物、卷柏(SELAGINELLA TAMARISCINA)提取物、迷迭香(ROSMARINUS OFFICINALIS)提取物、啤酒花(HUMULUS LUPULUS)提取物、麦角硫因、柑橘(CITRUS RETICULATA)果皮提取物、去甲二氢愈创木酸、石榴(PUNICA GRANATUM)果汁、环糊精、乙酰基六肽-8、粉团扇藻(PADINA PAVONICA)叶状体提取物、乳过氧化物酶、葡糖氧化酶、亚麻酸、乙基双亚氨基甲基愈创木酚锰氯化物、金、水解小麦蛋白".split("、")
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
          <div class="word">
            <p>雅诗兰黛白金级尊宠精华霜</p>
            <p>ESTĒE LAUDER Re-Nutriv Re-Creation Face Creme</p>
            <Button type="primary">Pk</Button>
          </div>
          <List
          style={{"marginTop":"10px","clear":"both"}}
          bordered
          dataSource={data}
          renderItem={(item,index) => (
            <List.Item>
              <Typography.Text mark></Typography.Text> {item }{index %2 !== 1?<Button type="primary" icon="search" style={{'float':"right"}}></Button>: <span style={{'float':"right"}}>辅助元素</span>}
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
