import React,{Component} from 'react'
import {Table,Popconfirm,message,Input} from 'antd'
import {connect} from 'react-redux'
import {getIngredient,deleteIngredient,getSpecialIngredient} from '../../reducers/ingredient.redux'
import './index.css'

const URL = 'http://localhost:3001/upload/'

@connect(
  state => state.ingredients,
  {getIngredient,deleteIngredient,getSpecialIngredient}
)
class UpdateIngre extends Component{
  componentWillMount(){
    this.props.getIngredient(1,'','')
  }
  confirm(id) {
    this.props.deleteIngredient(id)
    message.success('删除成功')
  }

  cancel(e) {
    message.error('取消删除')
  }
  edit(id){
    this.props.getSpecialIngredient(id)
    this.props.history.push('/adminpage/editingredient')
  }
  getColumns(){
    return  [
      {
        title: '成分名字',
        dataIndex: 'name',
        key: 'name',
        render: text => <span>{text}</span>,
      },
      {
        title: '成分种类',
        dataIndex: 'category',
        key: 'category',
        render: text => <span>{text.name}</span>,
      },
      {
        title: '成分三维结构',
        dataIndex: 'url',
        key: 'url',
        render: text => <span>{text}</span>,
      },
      {
        title: '成分信息',
        dataIndex: 'infor',
        key: 'infor',
        render: text => <span>{text}</span>,
      },
      {
        title: '成分英文名',
        dataIndex: 'enname',
        key: 'enname',
        render: text => <span>{text}</span>,
      },
      {
        title: '成分IUPAC',
        dataIndex: 'iupac',
        key: 'iupac',
        render: text => <span>{text}</span>,
      },
      {
        title: '成分封面图',
        dataIndex: 'pic',
        key: 'pic',
        render: text => <img style={{"width":"150px"}} src={URL + text} alt="pic"/>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Popconfirm
            title="你真的要删除该分类?"
            onConfirm={this.confirm.bind(this,record._id)}
            onCancel={this.cancel.bind(this)}
            okText="是"
            cancelText="否"
            >
            <a href="/">删除该成分</a>
          </Popconfirm>
        ),
      },
      {
        title: '操作',
        key: 'action1',
        render: (text, record) => (
            <span onClick={this.edit.bind(this,record._id)}>修改该成分</span>
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
        dataSource={this.props.ingredients} />
      </div>
    )
  }
}

export default UpdateIngre
