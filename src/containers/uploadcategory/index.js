import React,{Component} from 'react'
import {Table,Divider,Input,Button,Popconfirm,message} from 'antd'
import {connect} from 'react-redux'
import {getCategory,addCategory,deleteCategory} from '../../reducers/ingredient.redux'
import './index.css'

@connect(
  state => state.ingredients,
  {getCategory,addCategory,deleteCategory}
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
    this.setState({category:''})
    message.success('新增成功')
  }
  handleChange(e){
    this.setState({'category':e.target.value})
  }
  confirm(id) {
    this.props.deleteCategory(id)
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
            <a href="#">删除该成分</a>
          </Popconfirm>
        ),
      }
    ]
  }
  render(){
    return(
      <div id="uploadcatergory-container">
        <p className="title">有效成分种类更新</p>
        <p className="add">新增种类</p>
        <Input value={this.state.category} placeholder="新增种类" className="addcategory" onChange={e => this.handleChange(e)}/>
        <Button type="primary" onClick={this.handleClick.bind(this)}>确认增加</Button>
        <br/>
        <p>现有种类</p>
        {this.props.category?<Table rowKey={record =>record._id} pagination={false} columns={this.getColumns()} dataSource={this.props.category} />:null}
      </div>
    )
  }
}

export default UploadCategory
