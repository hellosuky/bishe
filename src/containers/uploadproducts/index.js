import React,{Component} from 'react'
import {Table,Input,Select} from 'antd'
import {connect} from 'react-redux'
import {getBrand} from '../../reducers/product.redux'
import './index.css'

const Option = Select.Option

const columns = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
    render: text => <span style={{"width":"80px","display":'block'}}>{text}</span>,
  },
  {
    title: '产品品牌',
    dataIndex: 'brand',
    key: 'brand',
    render: text => <span style={{"width":"80px","display":'block'}}>{text}</span>,
  },
  {
    title: '辅助成分',
    dataIndex: 'base',
    key: 'base',
    render: text => <span>{text}</span>,
  },
  {
    title: '有效成分',
    dataIndex: 'ingredient',
    key: 'ingredient',
    render: text => <span>{text}</span>,
  },
  {
    title: '是否展示',
    dataIndex: 'show',
    key: 'show',
    render: text => <span style={{"width":"50px"}}>{text?'true':'false'}</span>,
  },
  {
    title: '产品图片',
    dataIndex: 'pic',
    key: 'pic',
    render: text => <img style={{"width":"150px"}} alt='img' src={require('./'+text)}/>,
  },
  {
    title: '操作',
    key: 'action1',
    render: (text, record) => (
      <span style={{"width":"80px","display":'block'}}>
        <a href="/">删除该产品</a>
      </span>
    ),
  },
  {
    title: '操作',
    key: 'action2',
    render: (text, record) => (
      <span>
        <a href="/">{record.show?"不展示":'展示'}</a>
      </span>
    ),
  }
]
const data = [
  {
    key: '1',
    name: '雅诗兰黛红宝石蒸馏霜',
    brand:'雅诗兰黛',
    base:'柠檬酸钠、聚硅氧烷-11、聚二甲基硅氧烷 PEG-10/15 交联聚合物、鲸蜡基 PEG/PPG-10/1 聚二甲基硅氧烷、月桂基 PEG-9 聚二甲基硅氧乙基聚二甲基硅氧烷、咖啡因、乙酰壳糖胺、CI 77891、生育酚乙酸酯、甘氨酸、氯苯甘醚、苯基聚三甲基硅氧烷、(日用)香精、丁羟甲苯、乳酸杆菌发酵产物、抗坏血酸葡糖苷、EDTA 二钠、山梨酸钾、银耳(TREMELLA FUCIFORMIS)多糖、稻(ORYZA SATIVA)糠提取物、氢氧化钠、水解大米提取物、聚季铵盐-51、柠檬酸、氯化钙、透明质酸钠、乳清蛋白',
    ingredient:'水、甲基聚三甲基硅氧烷、甘油、丁二醇、1,3-丙二醇、聚二甲基硅氧烷、蔗糖、海藻糖、聚乙二醇-75、氯化钠、苯氧乙醇、辛酸/癸酸甘油三酯、',
    pic:'product.jpg'
  }
]

@connect(
  state =>state.products,
  {getBrand}
)
class UploadProducts extends Component{
  componentWillMount(){
    this.props.getBrand()
  }
  handleChange(){

  }
  render(){
    return(
      <div id="uploadproducts-container">
        <p className="title">产品种类更新</p>
        {this.props.brands.length > 0?
          <Select defaultValue={this.props.brands[0].name} style={{ width: 120 }} onChange={e => this.handleChange('category',e)}>
               {this.props.brands.map(v=>{
                return <Option value={v.name} key={v._id}>{v.name}</Option>
              }) }
            </Select>
            :null
        }
        <Input placeholder="种类搜索" style={{'maxWidth':"400px","marginRight":"20px","float":"right"}}/>
        <p>现有种类</p>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default UploadProducts
