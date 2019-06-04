import React,{Component} from 'react'
import {Table,Input,Select,Button,Modal,Upload,Icon,Pagination} from 'antd'
import axios from 'axios'
import {connect} from 'react-redux'
import _ from 'lodash'
import {getBrand,getProducts,show,uploadpic} from '../../reducers/product.redux'
import {URL} from '../../utils/url'
import './index.css'

const Option = Select.Option

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
      val:'', //查的值
      brand:'',//品牌
      previewVisible:false,
      hover:false
    }
    this.onChange1 = _.debounce(this.onChange,1000)
  }
  componentWillMount(){
    this.props.getBrand()
    this.props.getProducts(1,'','')
  }
  onChange(){
    this.props.getProducts(1,this.state.brand,this.state.val)
  }
  handleChange(key,val){
    this.setState({[key]:val},()=>this.onChange1())
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
        className="upload-pic-btn" onClick={this.showModal.bind(this,record._id)}>上传图片</span>}
        </span>,
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Button type="primary"
          disabled={record.pic?false:true}
          onClick={this.handleShow.bind(this,record._id)}>{record.show?"下架":"展示"}</Button>
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
    this.props.uploadpic(this.state.pic,this.state.id,this.state.brand,this.state.val)
    this.setState({visible:false,pic:'',id:''})
  }
  handleDelete(){
    axios.post('/api/delete',{url:this.state.pic})
    this.setState({pic:''})
  }
  handlePreview(){
    this.setState({previewVisible:true})
  }
  onPageChange(page,pageSize){
    //检索是否有那个换页
    this.props.getProducts(page,this.state.brand,this.state.val)
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
        <p className="title">产品更新</p>
          <Select defaultValue="" style={{ width: 120 }}
          onChange={e => this.handleChange('brand',e)}>
              <Option value="">选择品牌</Option>
               {this.props.brands.map(v=>{
                return <Option value={v._id} key={v._id}>{v.name}</Option>
              }) }
          </Select>
        <Input placeholder="种类搜索" value={this.state.val}
        onChange={e=>this.handleChange('val',e.target.value)} style={{'maxWidth':"400px","marginRight":"20px","float":"right"}}/>
        <p>现有种类</p>
        <Table rowKey={record =>record._id} pagination={false} columns={this.getColumns()}
        dataSource={this.props.products} />
        <Pagination defaultCurrent={1} total={50} onChange={this.onPageChange.bind(this)}/>
        <Modal
          title="上传产品图片"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={()=>this.setState({visible:false})}>
            <div className="clearfix">
             <Upload
               customRequest={this.handleCustomRequest.bind(this)}
               listType="picture-card"
               showUploadList={false}
               disabled={this.state.pic?true:false}
               style={{'position':'relative'}}
             >
               {this.state.pic ?
                <div onMouseLeave={()=>this.setState({hover:false})} onMouseOver={()=>this.setState({hover:true})}>
                  <img alt="pic" style={{"width":"200px"}} src={URL + this.state.pic}/>
                  {this.state.hover?
                  <div>
                    <Icon style={{'position':'absolute',"left":'45%',"top":"50%","transform":"translate(-50%,-50%)"}} onClick={this.handleDelete.bind(this)} type="delete"/>
                    <Icon style={{'position':'absolute',"left":'55%',"top":"50%","transform":"translate(-50%,-50%)"}} onClick={this.handlePreview.bind(this)}  type="eye"/>
                  </div>:null}
                </div>
                 : uploadButton}
             </Upload>
             <Modal visible={this.state.previewVisible} footer={null} onCancel={()=>this.setState({previewVisible:false})}>
              <img alt="example" style={{ width: '100%' }} src={URL + this.state.pic} />
            </Modal>
         </div>
        </Modal>
      </div>
    )
  }
}

export default UploadProducts
