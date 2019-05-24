import React,{Component} from 'react'
import {Input,Table,Button} from 'antd'
import './index.css'

const columns = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="/">{text}</a>,
  },
  {
    title: '密码',
    dataIndex: 'pwd',
    key: 'pwd',
    render: text => <a href="/">{text}</a>,
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="/">删除该管理员</a>
      </span>
    ),
  }
]
const data = [
  {
    key: '1',
    name: 'suky',
    pwd:'123'
  },
  {
    key: '2',
    name: 'kim',
    pwd:'abc'
  },
]
class AddAdmin extends Component{
  render(){
    return(
      <div id="addadmin-container">
        <p className="title">后台管理员管理</p>
        <p>新增管理员</p>
        <Input placeholder="新增管理员登录名" style={{'maxWidth':"850px","marginRight":"20px"}}/>
        <Input placeholder="新增管理员密码" style={{'maxWidth':"850px","marginTop":"20px","marginRight":"20px"}}/>
        <Button type="primary">确认增加</Button>
        <br/>
        <br/><br/>
        <p>现有管理员</p>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default AddAdmin
