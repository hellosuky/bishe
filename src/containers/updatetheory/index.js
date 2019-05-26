import React,{Component} from 'react'
import {Table,Popconfirm,message,Input} from 'antd'
import './index.css'

const data = [
  {
    key:'1',
    name:'保湿剂',
    content:'保湿剂是一个好的东西',
    pic:'pic2.png'
  }
]
class UpdateTheory extends Component{
  confirm(id) {
    message.success('删除成功')
  }

  cancel(e) {
    message.error('取消删除')
  }
  getColumns(){
    return  [
      {
        title: '名字',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        render: text => <span>{text}</span>,
      },
      {
        title: '封面图',
        dataIndex: 'pic',
        key: 'pic',
        render: text => <img style={{"width":"150px"}} src={require('./images/pic2.png')} alt="pic"/>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>  <a href="/">修改</a>
          <br/>
            <a href="/">删除</a></span>
        ),
      }
    ]
  }
  render(){
    return(
      <div id="updateingre-container">
        <p className="title">修改有效成分</p>
        <Input style={{"width":"300px","float":"right"}} placeholder="搜索某一成分"/>
        <Table rowKey={record =>record._id} pagination={false} columns={this.getColumns()}
        dataSource={data} />
      </div>
    )
  }
}

export default UpdateTheory
