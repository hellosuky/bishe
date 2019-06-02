import React,{Component} from 'react'
import {Input,Button,Table,Upload,Icon,Modal,Popconfirm,message} from 'antd'
import {connect} from 'react-redux'
import axios from 'axios'
import {addBrand,getBrand,deleteBrand} from '../../reducers/product.redux'
import './index.css'

const URL = 'http://47.100.171.180:3001/upload/'

@connect(
  state => state.products,
  {addBrand,getBrand,deleteBrand}
)
class UploadBrand extends Component{
  constructor(){
    super()
    this.state = {
      brand:'',
      pic:""
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount(){
    this.props.getBrand()
  }
  handleClick(){
    this.props.addBrand(this.state.brand,this.state.enname,this.state.pic)
    this.setState({brand:'',pic:'',enname:''})
    message.success('新增成功')
  }
  handleChange(key,val){
    this.setState({[key]:val})
  }
  confirm(id) {
    this.props.deleteBrand(id)
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
        title: '英文名',
        dataIndex: 'enname',
        key: 'enname',
        render: text => <span>{text}</span>,
      },
      {
        title: '图片',
        dataIndex: 'pic',
        key: 'pic',
        render: text => <img style={{"width":"150px"}} src={URL + text} alt="img"/>,
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
      }
    ]
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
 handlePreview(){
   this.setState({previewVisible:true})
 }
 handleCancel(){
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
  render(){
    const uploadButton = (
     <div>
       <Icon type='plus' />
       <div className="ant-upload-text">Upload</div>
     </div>
   )
    return(
      <div id="uploadbrand-container">
        <p className="title">展示品牌更新</p>
        <p className="add">新增品牌</p>
        <span className="brand-chin">品牌中文</span>
        <Input className="addbrand" value={this.state.brand} placeholder="新增品牌"
        onChange={e => this.handleChange('brand',e.target.value)}/>
        <span className="brand-en">品牌英文</span>
        <Input className="addenname" value={this.state.enname} placeholder="新增品牌英语"
        onChange={e => this.handleChange('enname',e.target.value)}/>
        <br/>
        <span>品牌图片</span>
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
         <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
          <img alt="example" style={{ width: '100%' }} src={URL + this.state.pic} />
        </Modal>
       </div>
        <Button className="add-btn" type="primary" onClick={this.handleClick.bind(this)}>确认增加</Button>
        <br/><br/><br/><br/><br/>
        <p>现有品牌</p>
        {this.props.brands?<Table rowKey={record =>record._id} pagination={false} columns={this.getColumns()} dataSource={this.props.brands} />:null}
      </div>
    )
  }
}

export default UploadBrand
