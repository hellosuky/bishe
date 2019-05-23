import React,{Component} from 'react'
import {Input,Button,Table} from 'antd'
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
        <a href="javascript:;">删除该品牌</a>
      </span>
    ),
  }
]
const data = [
  {
    key: '1',
    name: '雅诗兰黛'
  },
  {
    key: '2',
    name: '迪奥'
  },
  {
    key: '3',
    name: '纪梵希'
  },
]
class UploadBrand extends Component{
  render(){
    return(
      <div id="uploadbrand-container">
        <p className="title">展示品牌修改</p>
        <p>新增品牌</p>
        <Input placeholder="输入新增品牌" style={{'maxWidth':"800px","marginRight":"20px"}}/>
        <Button type="primary">确认新增</Button>
        <p>现有品牌</p>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default UploadBrand
