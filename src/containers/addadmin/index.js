import React,{Component} from 'react'
import {Input,Table,Button,Popconfirm,message} from 'antd'
import {connect} from 'react-redux'
import {getAllAdmin,addAdmin,deleteAdmin} from '../../reducers/login.redux'
import './index.css'

@connect(
  state => state.loginReducers,
  {getAllAdmin,addAdmin,deleteAdmin}
)
class AddAdmin extends Component{
  constructor(){
    super()
    this.state = {
      username:'',
      pwd:''
    }
  }
  componentWillMount(){
    //get all admin
    this.props.getAllAdmin()
  }
  confirm(){
    // add new admin
    this.props.addAdmin(this.state.username,this.state.pwd)
    this.setState({username:'',pwd:''})
    message.success('新增成功')
  }
  delete(id){
    //delete a admin
    this.props.deleteAdmin(id)
    message.success('删除成功')
  }
  handleChange(key,val){
    this.setState({[key]:val})
  }
  getColumns(){
    return[
      {
      title: '名字',
      dataIndex: 'username',
      key: 'username',
      render: text => <span>{text}</span>,
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Popconfirm
        title="你确认要删除吗？"
        onConfirm={this.delete.bind(this,record._id)}
        okText="好的"
        cancelText="取消"
        >
          <span className="delete-admin">删除该管理员</span>
        </Popconfirm>
      ),
    }]
  }
  render(){
    console.log(this.props.admin)
    return(
      <div id="addadmin-container">
        <p className="title">后台管理员管理</p>
        <p className="add-admin">新增管理员</p>
        <span>新管理员登陆名:</span>
        <Input className="add-admin-input" placeholder="新增管理员登录名" value={this.state.username} onChange={e => this.handleChange('username',e.target.value)}/>
        <span>新管理员密码:</span>
        <Input className="add-pwd-input" placeholder="新增管理员密码" value={this.state.pwd} onChange={e => this.handleChange('pwd',e.target.value)}/>
        <br/>
        <Popconfirm
        title="管理员的密码不再显示，请牢记"
        onConfirm={this.confirm.bind(this)}
        okText="好的"
        cancelText="取消"
        >
          <Button type="primary" className="add-admin-btn">确认增加</Button>
        </Popconfirm>
        <p className="now-admin">现有管理员</p>
        {this.props.admin?<Table rowKey={record => record._id} columns={this.getColumns()} dataSource={this.props.admin} pagination={false}/>:null}
      </div>
    )
  }
}

export default AddAdmin
