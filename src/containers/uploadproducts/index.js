import React,{Component} from 'react'
import {Table,Input,Select,Button} from 'antd'
import {connect} from 'react-redux'
import _ from 'lodash'
import {getBrand,getProducts,show} from '../../reducers/product.redux'
import './index.css'

const Option = Select.Option

@connect(
  state =>state.products,
  {getBrand,getProducts,show}
)
class UploadProducts extends Component{
  constructor(){
    super()
    this.onChange1 = _.debounce(this.onChange,1000)
  }
  componentWillMount(){
    this.props.getBrand()
    this.props.getProducts(1,null)
  }
  onChange(val){
    // this.props.getSearchTheory(val)
  }
  handleChange(key,val){
    this.setState({[key]:val},()=>this.onChange1(this.state.search))
  }
  getColumns(){
    return [{
        title: '名字',
        dataIndex: 'name',
        key: 'name',
        render: text => <span style={{"width":"80px","display":'block'}}>{text}</span>,
      },
      {
        title: '产品品牌',
        dataIndex: 'brand',
        key: 'brand',
        render: text => <span style={{"width":"80px","display":'block'}}>{text.name}</span>,
      },
      {
        title: '辅助成分',
        dataIndex: 'base',
        key: 'base',
        render: text => {
          let newtxt = text.join('、')
          return <span>{newtxt}</span>
        },
      },
      {
        title: '有效成分',
        dataIndex: 'Ingredient',
        key: 'Ingredient',
        render: text => {
          if(text.length>0){
            let arr = text.map(v=>v.name)
            let txt = arr.join('、')
            return <span>{txt}</span>
          }else{
            return <span>无</span>
          }
        },
      },
      {
        title: '产品图片',
        dataIndex: 'pic',
        key: 'pic',
        render: text => <span>
        {text?<img style={{"width":"150px"}} alt='img' src={require('./'+text)}/>:<div>上传图片</div>}
        </span>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Button type="primary" onClick={this.handleShow.bind(this,record._id)}>{record.show?"下架":"展示"}</Button>
        ),
      }
    ]
  }
  handleShow(id){
    this.props.show(id)
  }
  render(){
    return(
      <div id="uploadproducts-container">
        <p className="title">产品种类更新</p>
        {this.props.brands.length > 0?
          <Select style={{ width: 120 }} onChange={e => this.handleChange('category',e)}>
               {this.props.brands.map(v=>{
                return <Option value={v._id} key={v._id}>{v.name}</Option>
              }) }
            </Select>
            :null
        }
        <Input placeholder="种类搜索" style={{'maxWidth':"400px","marginRight":"20px","float":"right"}}/>
        <p>现有种类</p>
        <Table rowKey={record =>record._id} columns={this.getColumns()} dataSource={this.props.products} />
      </div>
    )
  }
}

export default UploadProducts
