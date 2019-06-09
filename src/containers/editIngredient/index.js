import React,{Component} from 'react'
import {Input,Icon,Upload,Button,Select,Modal,message} from 'antd'
import {connect} from 'react-redux'
import {updateIngredient,getCategory} from '../../reducers/ingredient.redux'
import {URL} from '../../utils/url'
import axios from 'axios'
import './index.css'

const {TextArea} = Input
const Option = Select.Option

@connect(
  state => state.ingredients,
  {updateIngredient,getCategory}
)
class EditIngre extends Component{
  constructor(){
    super()
    this.state = {
       id:'',
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
  componentWillReceiveProps(nextProps){
      if(nextProps.ingredient.infor){
        let ingre = nextProps.ingredient
        this.setState({id:ingre._id,name:ingre.name,category:ingre.category._id,
        url:ingre.url,infor:ingre.infor,enname:ingre.enname,iupac:ingre.iupac,
        pic:ingre.pic})
      }
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
       console.log(res.data)
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
   if(!this.state.id){
     message.error('无法提交')
     return
   }
   if(!this.state.name || !this.state.category ||
     !this.state.infor || !this.state.enname ||!this.state.iupac ||!this.state.pic){
     //错误信息
     message.error('请将所有空填完')
   }else{
     //提交
     this.props.updateIngredient(this.state.id,this.state.name,this.state.category,this.state.url,
     this.state.infor,this.state.enname,this.state.iupac,this.state.pic)
     this.setState({id:'',name:'',category:'',url:'',infor:'',enname:'',iupac:'',pic:""})
     message.success('更新成功')
     setTimeout(()=>{
       this.props.history.push('/adminpage/updateingre')
     },1500)
   }
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
    return (
       <div id="upload-container">
        <p className="title">有效成分数据更改</p>
        <p>输入成分名字:</p>
        <Input value={this.state.name} placeholder="输入成分名字" onChange={e => this.handleChange('name',e.target.value)}/>
        <p>选择成分种类:</p>
        {this.props.category.length > 0?
          <Select value={this.state.category} style={{ width: 120 }} onChange={e => this.handleChange('category',e)}>
               {this.props.category.map(v=>{
                return <Option value={v._id} key={v._id}>{v.name}</Option>
              }) }
            </Select>
            :null
        }
        <p>输入成分三维图地址:</p>
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
                <Icon style={{'position':'absolute',"left":'40%',"top":"50%","transform":"translate(-50%,-50%)","fontSize":"0.3rem"}} onClick={this.handleDelete.bind(this)} type="delete"/>
                <Icon style={{'position':'absolute',"left":'55%',"top":"50%","transform":"translate(-50%,-50%)","fontSize":"0.3rem"}} onClick={this.handlePreview.bind(this)}  type="eye"/>
              </div>:null}
            </div>
             : uploadButton}
         </Upload>
         <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
          <img alt="example" style={{ width: '100%' }} src={URL  + this.state.pic} />
        </Modal>
       </div>
       <Button type="primary" className="submit" onClick={this.handleClick.bind(this)}>确认修改</Button>
      </div>
    )
  }
}

export default EditIngre
