import React,{Component} from 'react'
import {Table,Input,Select,Button,Modal,Upload,Icon} from 'antd'
import axios from 'axios'
import {connect} from 'react-redux'
import _ from 'lodash'
import {getBrand,getProducts,show,uploadpic} from '../../reducers/product.redux'
import './index.css'

const Option = Select.Option
const URL = 'http://localhost:9090/upload/'
@connect(
  state =>state.products,
  {getBrand,getProducts,show,uploadpic}
)
class UploadProducts extends Component{
  constructor(){
    super()
    this.state = {
      visible:false,
      pic:'',
      id:'',
      previewVisible:false,
      hover:false
    }
    this.onChange1 = _.debounce(this.onChange,1000)
  }
  componentWillMount(){
    this.props.getBrand()
    this.props.getProducts(1,null)
  }
  onChange(val){
    // this.props.getSearchTheory(val)
  }
  handleChange(key,val){
    this.setState({[key]:val},()=>this.onChange1(this.state.search))
  }
  handleCustomRequest(options:any){
   const data= new FormData()
     data.append('pic', options.file)
     const config= {
       "headers": {
         "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
       }
     }
     axios.post('/api/upload', data, config)
     .then((res: any) => {
       this.setState({pic:res.data.data.filename})
       options.onSuccess(res.data, options.file)
     }).catch((err: Error) => {
       console.log(err)
     })
 }
  getColumns(){
    return [{
        title: '名字',
        dataIndex: 'name',
        key: 'name',
        render: text => <span style={{"width":"80px","display":'block'}}>{text}</span>,
      },
      {
        title: '产品品牌',
        dataIndex: 'brand',
        key: 'brand',
        render: text => <span style={{"width":"80px","display":'block'}}>{text.name}</span>,
      },
      {
        title: '辅助成分',
        dataIndex: 'base',
        key: 'base',
        render: text => {
          let newtxt = text.join('、')
          return <span style={{"width":"300px","display":'block'}}>{newtxt}</span>
        },
      },
      {
        title: '有效成分',
        dataIndex: 'Ingredient',
        key: 'Ingredient',
        render: text => {
          if(text.length>0){
            let arr = text.map(v=>v.name)
            let txt = arr.join('、')
            return <span style={{"width":"300px","display":'block'}}>{txt}</span>
          }else{
            return <span>无</span>
          }
        },
      },
      {
        title: '产品图片',
        dataIndex: 'pic',
        key: 'pic',
        render: (text,record) => <span>
        {text?<img style={{"width":"150px"}} alt='img' src={URL +text}/>:<span
        onClick={this.showModal.bind(this,record._id)}>上传图片</span>}
        </span>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Button type="primary" onClick={this.handleShow.bind(this,record._id)}>{record.show?"下架":"展示"}</Button>
        ),
      }
    ]
  }
  showModal(id){
    this.setState({visible:true,id})
  }
  handleShow(id){
    this.props.show(id)
  }
  handleOk(){
    this.props.uploadpic(this.state.pic,this.state.id)
    this.setState({visible:false})
  }
  handleCancel(){
    this.setState({visible:false})
  }
  handleCancel1(){
    this.setState({previewVisible:false})
  }
  handleHover(){
    this.setState({hover:true})
  }
  handleBlur(){
    this.setState({hover:false})
  }
  handleDelete(){
    axios.post('/api/delete',{url:this.state.pic})
    this.setState({pic:''})
  }
  handlePreview(){
    this.setState({
      previewVisible:true
    })
  }
  render(){
    const uploadButton = (
     <div>
       <Icon type='plus' />
       <div className="ant-upload-text">Upload</div>
     </div>
   )
    return(
      <div id="uploadproducts-container">
        <p className="title">产品种类更新</p>
        {this.props.brands.length > 0?
          <Select style={{ width: 120 }} onChange={e => this.handleChange('category',e)}>
               {this.props.brands.map(v=>{
                return <Option value={v._id} key={v._id}>{v.name}</Option>
              }) }
            </Select>
            :null
        }
        <Input placeholder="种类搜索" style={{'maxWidth':"400px","marginRight":"20px","float":"right"}}/>
        <p>现有种类</p>
        <Table rowKey={record =>record._id} columns={this.getColumns()} dataSource={this.props.products} />
        <Modal
          title="上传产品图片"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}>
            <div className="clearfix">
             <Upload
               customRequest={this.handleCustomRequest.bind(this)}
               listType="picture-card"
               showUploadList={false}
               disabled={this.state.pic?true:false}
               style={{'position':'relative'}}
             >
               {this.state.pic ?
                <div onMouseLeave={this.handleBlur.bind(this)} onMouseOver={this.handleHover.bind(this)}>
                  <img alt="pic" style={{"width":"200px"}} src={URL + this.state.pic}/>
                  {this.state.hover?
                  <div>
                    <Icon style={{'position':'absolute',"left":'45%',"top":"50%","transform":"translate(-50%,-50%)"}} onClick={this.handleDelete.bind(this)} type="delete"/>
                    <Icon style={{'position':'absolute',"left":'55%',"top":"50%","transform":"translate(-50%,-50%)"}} onClick={this.handlePreview.bind(this)}  type="eye"/>
                  </div>:null}
                </div>
                 : uploadButton}
             </Upload>
             <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel1.bind(this)}>
              <img alt="example" style={{ width: '100%' }} src={URL + this.state.pic} />
            </Modal>
         </div>
        </Modal>
      </div>
    )
  }
}

export default UploadProducts
