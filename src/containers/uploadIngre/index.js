import React,{Component} from 'react'
import {Input,Icon,Upload,Button,Select,Modal,message} from 'antd'
import {connect} from 'react-redux'
import {addIngredient,getCategory} from '../../reducers/ingredient.redux'
import {URL} from '../../utils/url'
import axios from 'axios'
import './index.css'


const {TextArea} = Input
const Option = Select.Option
@connect(
  state => state.ingredients,
  {addIngredient,getCategory}
)
class UploadIngre extends Component{
  constructor(){
    super()
    this.state = {
       name:'',
       category:'',
       url:"",
       infor:'',
       enname:"",
       iupac:"",
       pic:"",
       previewVisible:false,
       hover:false
    }
    this.handleChange = this.handleChange.bind(this)
  }
  componentWillMount(){
    this.props.getCategory()
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
 handleChange(key,val){
   this.setState({[key]:val})
 }
 handleClick(){
   if(!this.state.name || !this.state.category ||
     !this.state.infor || !this.state.enname ||!this.state.iupac ||!this.state.pic){
     //错误信息
     message.error('请将所有空填完')
     return
   }

     //提交
     this.props.addIngredient(this.state.name,this.state.category,this.state.url,
     this.state.infor,this.state.enname,this.state.iupac,this.state.pic)
     this.setState({name:'',category:'',url:'',infor:'',enname:'',iupac:'',pic:""})
     message.success('上传成功')

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
      <div id="upload-container">
        <p className="title">有效成分数据库上传</p>
        <p>输入成分名字:</p>
        <Input value={this.state.name} placeholder="输入成分名字" onChange={e => this.handleChange('name',e.target.value)}/>
        <p>选择成分种类:</p>
          <Select defaultValue="选择种类" style={{ width: 120 }} onChange={e => this.handleChange('category',e)}>
               {this.props.category.map(v=>{
                return <Option value={v._id} key={v._id}>{v.name}</Option>
              }) }
          </Select>
        <p>输入成分三维图地址(选填):</p>
        <Input value={this.state.url} placeholder="输入成分三维图地址" onChange={e => this.handleChange('url',e.target.value)}/>
        <p>输入成分的相关信息:</p>
        <TextArea value={this.state.infor} rows={4} onChange={e => this.handleChange('infor',e.target.value)}/>
        <p>输入成分英文名:</p>
        <Input placeholder="输入成分英文名" value={this.state.enname} onChange={e => this.handleChange('enname',e.target.value)}/>
        <p>输入成分CAS:</p>
        <Input placeholder="输入成分CAS" value={this.state.iupac} onChange={e => this.handleChange('iupac',e.target.value)}/>
        <p>上传成分封面图:</p>
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
       <Button type="primary" className="submit" onClick={this.handleClick.bind(this)}>确认上传</Button>
      </div>
    )
  }
}

export default UploadIngre
