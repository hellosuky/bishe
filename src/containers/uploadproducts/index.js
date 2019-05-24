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
    render: text => <span>{text}</span>,
  },
  {
    title: '产品图片',
    dataIndex: 'pic',
    key: 'pic',
    render: text => <img style={{"width":"150px"}} alt='img' src={text}/>,
  },
  {
    title: '操作',
    key: 'action1',
    render: (text, record) => (
      <span>
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
    name: '保湿剂'
  },
  {
    key: '2',
    name: '抗氧化剂'
  },
  {
    key: '3',
    name: '表面活性剂'
  },
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
