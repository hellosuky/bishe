import React,{Component} from 'react'
import {Table,Popconfirm,message,Input,Select} from 'antd'
import {connect} from 'react-redux'
import {getIngredient,deleteIngredient,getSpecialIngredient,getCategory} from '../../reducers/ingredient.redux'
import {URL} from '../../utils/url'
import _ from 'lodash'
import './index.css'

const Option = Select.Option

@connect(
  state => state.ingredients,
  {getIngredient,deleteIngredient,getSpecialIngredient,getCategory}
)
class UpdateIngre extends Component{
  constructor(){
    super()
    this.state = {
      word:'',
      page:1,
      category:''
    }
    this.onChange1 = _.debounce(this.onChange,500)
    this.onSearch = this.onSearch.bind(this)
    this.onPageChange = this.onPageChange.bind(this)
    this.handleCategory = this.handleCategory.bind(this)
  }
  componentWillMount(){
    this.props.getIngredient(1,'','')
    this.props.getCategory()
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
  onChange(){
    this.props.getIngredient(1,this.state.category,this.state.word)
  }
  onSearch(val){
    this.setState({word:val,page:1},()=>this.onChange1())
  }
  onPageChange(page,pageSize){
    //检索是否有那个换页
    this.setState({page:page})
    this.props.getIngredient(page,this.state.category,this.state.word)
  }
  handleCategory(key,val){
    this.setState({[key]:val},()=>this.onChange1())
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
        title: '成分CAS',
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
            <span onClick={this.edit.bind(this,record._id)} className="edit">修改该成分</span>
        ),
      }
    ]
  }
  render(){
    return(
      <div id="updateingre-container">
        <p className="title">更新有效成分</p>
        <Input placeholder="搜索某一成分" value={this.state.word}
        className="ingre-input"
        onChange={e=>this.onSearch(e.target.value)}/>
        <Select defaultValue="" style={{ width: 120 }}
        onChange={e => this.handleCategory('category',e)}>
            <Option value="">选择种类</Option>
             {this.props.category.map(v=>{
              return <Option value={v._id} key={v._id}>{v.name}</Option>
            }) }
        </Select>
        <Table rowKey={record =>record._id}
        pagination={{
            current:this.state.page,
            total:this.props.total,
            pageSize:8,
            onChange:this.onPageChange
          }}
        columns={this.getColumns()}
        dataSource={this.props.ingredients} />
      </div>
    )
  }
}

export default UpdateIngre
