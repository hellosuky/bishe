import React,{Component} from 'react'
import {Table,Divider,Input,Button} from 'antd'
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
class UploadCategory extends Component{
  render(){
    return(
      <div id="uploadcatergory-container">
        <p className="title">有效成分种类更新</p>
        <p>新增种类</p>
        <Input placeholder="新增种类" style={{'maxWidth':"800px","marginRight":"20px"}}/>
        <Button type="primary">确认增加</Button>
        <br/>
        <p>现有种类</p>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default UploadCategory
