import React,{Component} from 'react'
import {Table,message,Input,Popconfirm} from 'antd'
import {connect} from 'react-redux'
import _ from 'lodash'
import {getTheory,deleteTheory,getSearchTheory,getSpecialTheory} from '../../reducers/theory.redux'
import {URL} from '../../utils/url'
import './index.css'


@connect(
  state => state.theory,
  {getTheory,deleteTheory,getSearchTheory,getSpecialTheory}
)
class UpdateTheory extends Component{
  constructor(props){
    super(props)
    this.state = {
      search:''
    }
    this.handleChange = this.handleChange.bind(this)
    this.onChange1 = _.debounce(this.onChange,1000)
  }
  componentWillMount(){
    this.props.getTheory(1)
  }
  confirm(id) {
    message.success('删除成功')
  }
  delete(id){
    //delete a admin
    this.props.deleteTheory(id)
    message.success('删除成功')
  }
  cancel(e) {
    message.error('取消删除')
  }
  edit(id){
    this.props.getSpecialTheory(id)
    this.props.history.push('/adminpage/edittheory')
  }
  getColumns(){
    return  [
      {
        title: '名字',
        dataIndex: 'title',
        key: 'title',
        render: text => <span>{text}</span>,
      },
      {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        render: text => {
          let text1 = text.replace(/<[^>]+>/g,"")
          return <span>{text1}</span>
        }
      },
      {
        title: '封面图',
        dataIndex: 'cover',
        key: 'cover',
        render: text => <img style={{"width":"150px"}} src={URL + text} alt="pic"/>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <span onClick={this.edit.bind(this,record._id)} className="edit">修改</span>
            <br/>
            <Popconfirm
            title="你确认要删除吗？"
            onConfirm={this.delete.bind(this,record._id)}
            okText="好的"
            cancelText="取消"
            >
              <span className="delete">删除</span>
            </Popconfirm>
          </span>
        ),
      }
    ]
  }
  handleChange(key,val){
    this.setState({[key]:val},()=>this.onChange1(this.state.search))
  }
  onChange(val){
    this.props.getSearchTheory(val)
  }
  render(){
    return(
      <div id="updatetheory-container">
        <p className="title">修改原理详情</p>
        <span className="search">搜索：</span>
        <Input className="search-input" placeholder="搜索" value={this.state.search}
        onChange={e => this.handleChange('search',e.target.value)}/>
        <Table rowKey={record =>record._id} columns={this.getColumns()}
        dataSource={this.props.theory} />
      </div>
    )
  }
}

export default UpdateTheory
