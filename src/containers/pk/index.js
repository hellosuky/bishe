import React,{Component} from 'react'
import {Breadcrumb,List,Typography,Button,Pagination,Cascader} from 'antd'
import './index.css'

const options = [
  {
    value: '雅诗兰黛',
    label: '雅诗兰黛',
    children: [
      {
        value: '雅诗兰黛白金级尊宠精华霜',
        label: '雅诗兰黛白金级尊宠精华霜',
      },
      {
        value: '雅诗兰黛沁水倍润轻乳霜',
        label: '雅诗兰黛沁水倍润轻乳霜',
      },
    ],
  },
  {
    value: '迪奥',
    label: '迪奥',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

class Pk extends Component{
  handleClick(){
    this.props.history.push('/second')
  }
  onChange(value) {
    console.log(value);
  }
  render(){
    const data = "水、C12-20 酸 PEG-8 酯、甘油、辛酸/癸酸甘油三酯、椰油醇-辛酸酯/癸酸酯、鲸蜡醇蓖麻醇酸酯、鲸蜡醇、丁二醇、PEG-100 硬脂酸酯、1,3-丙二醇、鲸蜡醇磷酸酯钾、乙酰壳糖胺、生育酚乙酸酯、卡波姆、辛甘醇、丙二醇二癸酸酯、聚二甲基硅氧烷、苯氧乙醇、向日葵(HELIANTHUS ANNUUS)籽饼、(日用)香精、咖啡因、甘草亭酸、假交替单胞菌发酵产物提取物、氨丁三醇、葡萄糖、植物鞘氨醇、碳酸钙、乳清蛋白、珍珠粉、白桦(BETULA ALBA)树皮/叶提取物、酵母提取物、糊精、黄原胶、己二醇、亚油酸、透明质酸钠、虎杖(POLYGONUM CUSPIDATUM)根提取物、脱羧肌肽 HCl、EDTA 二钠、磷脂、氨基丙醇抗坏血酸磷酸酯、丙烯酸钠/丙烯酰二甲基牛磺酸钠共聚物、植物甾醇低芥酸菜子油甘油酯类、掌状海带(LAMINARIA DIGITATA)提取物、氢化聚癸烯、棕榈酸、藻提取物、大麦(HORDEUM VULGARE)籽提取物、油酸、卵磷脂、百金花(CENTAURIUM ERYTHRAEA)提取物、聚甲基硅倍半氧烷、硬脂酸、三油精、奥氏海藻(CLADOSIPHON OKAMURANUS)提取物、月桂醇聚醚-8、稻(ORYZA SATIVA)糠提取物、黄瓜(CUCUMIS SATIVUS)果提取物、微球菌溶胞产物、柠檬酸、迷迭香(ROSMARINUS OFFICINALIS)叶提取物、野大豆(GLYCINE SOJA)蛋白、葡萄(VITIS VINIFERA)籽提取物、卷柏(SELAGINELLA TAMARISCINA)提取物、迷迭香(ROSMARINUS OFFICINALIS)提取物、啤酒花(HUMULUS LUPULUS)提取物、麦角硫因、柑橘(CITRUS RETICULATA)果皮提取物、去甲二氢愈创木酸、石榴(PUNICA GRANATUM)果汁、环糊精、乙酰基六肽-8、粉团扇藻(PADINA PAVONICA)叶状体提取物、乳过氧化物酶、葡糖氧化酶、亚麻酸、乙基双亚氨基甲基愈创木酚锰氯化物、金、水解小麦蛋白".split("、")
    const data1 ="水、甲基聚三甲基硅氧烷、甘油、丁二醇、1,3-丙二醇、聚二甲基硅氧烷、蔗糖、海藻糖、聚乙二醇-75、氯化钠、苯氧乙醇、辛酸/癸酸甘油三酯、柠檬酸钠、聚硅氧烷-11、聚二甲基硅氧烷 PEG-10/15 交联聚合物、鲸蜡基 PEG/PPG-10/1 聚二甲基硅氧烷、月桂基 PEG-9 聚二甲基硅氧乙基聚二甲基硅氧烷、咖啡因、乙酰壳糖胺、CI 77891、生育酚乙酸酯、甘氨酸、氯苯甘醚、苯基聚三甲基硅氧烷、(日用)香精、丁羟甲苯、乳酸杆菌发酵产物、抗坏血酸葡糖苷、EDTA 二钠、山梨酸钾、银耳(TREMELLA FUCIFORMIS)多糖、稻(ORYZA SATIVA)糠提取物、氢氧化钠、水解大米提取物、聚季铵盐-51、柠檬酸、氯化钙、透明质酸钠、乳清蛋白".split('、')
    return (
      <div id="pk-container">
        <div className="top">
            <img className="top-logo" src={require('./images/logo.png')} />
            <span className="top-title">知美</span>
        </div>
        <Breadcrumb style={{'paddingTop':'75px','paddingLeft':"20px"}}>
          <Breadcrumb.Item>
            <a href="">品牌成分</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">成分对比</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className="pk-product">
        <div className="container" style={{"color":"#000"}}>
          <img style={{'width':"200px","height":"200px","float":"left"}} src={require('./images/pic1.png')}/>
          <div class="word">
            <p>雅诗兰黛白金级尊宠精华霜</p>
            <p>ESTĒE LAUDER Re-Nutriv Re-Creation Face Creme</p>
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
        </div>
        <div className="container">
          <Cascader options={options} onChange={this.onChange.bind(this)} placeholder="选择" />
        </div>
        </div>
      </div>
    )
  }
}

export default Pk
