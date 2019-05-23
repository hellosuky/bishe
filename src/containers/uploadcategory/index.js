import React,{Component} from 'react'
import {Table,Divider,Input,Button} from 'antd'
import {connect} from 'react-redux'
import {getCategory,addCategory} from '../../reducers/ingredient.redux'
import './index.css'

const columns = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">删除该成分分类</a>
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
  null,
  {getCategory,addCategory}
)
class UploadCategory extends Component{
  constructor(){
    super()
    this.state = {
      category:''
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount(){
    this.props.getCategory()
  }
  handleClick(){
    this.props.addCategory(this.state.category)
  }
  handleChange(e){
    this.setState({'category':e.target.value})
  }
  render(){
    return(
      <div id="uploadcatergory-container">
        <p className="title">有效成分种类更新</p>
        <p className="add">新增种类</p>
        <Input placeholder="新增种类" className="addcategory" onChange={e => this.handleChange(e)}/>
        <Button type="primary" onClick={this.handleClick.bind(this)}>确认增加</Button>
        <br/>
        <p>现有种类</p>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default UploadCategory
