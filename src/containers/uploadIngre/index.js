import React,{Component} from 'react'
import {Input,Icon,Upload,Button,Select} from 'antd'
import {connect} from 'react-redux'
import {addIngredient} from '../../reducers/ingredient.redux'
import axios from 'axios'
import './index.css'

const {TextArea} = Input
const Option = Select.Option
@connect(
  null,
  {addIngredient}
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
       pic:""
    }
    this.handleChange.bind(this)
  }
  handleCustomRequest(options:any){
   const data= new FormData()
     data.append('smfile', options.file)
     const config= {
       "headers": {
         "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
       }
     }
     axios.post('/api/upload', data, config)
     .then((res: any) => {
       this.setState({pic:res.data.data.url})
       options.onSuccess(res.data, options.file)
     }).catch((err: Error) => {
       console.log(err)
     })
 }
 handleChange(key,e){
   this.setState({[key]:e.target.value})
 }
 handleClick(){
   if(!this.state.name || !this.state.category || !this.state.url ||
     !this.state.infor || !this.state.enname ||!this.state.iupac ||!this.state.pic){
     //错误信息

   }else{
     //提交
     this.props.addIngredient(this.state.name,this.state.category,this.state.url,
     this.state.infor,this.state.enname,this.state.iupac,this.state.pic)
   }
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
        <Input placeholder="输入成分名字" onChange={e => this.handleChange('name',e)}/>
        <p>输入成分种类:</p>
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={e => this.handleChange('category',e)}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <p>输入成分三维图地址:</p>
        <Input placeholder="输入成分三维图地址" onChange={e => this.handleChange('url',e)}/>
        <p>输入成分的相关信息:</p>
        <TextArea rows={4} onChange={e => this.handleChange('infor',e)}/>
        <p>输入成分英文名:</p>
        <Input placeholder="输入成分英文名" onChange={e => this.handleChange('enname',e)}/>
        <p>输入成分IUPAC:</p>
        <Input placeholder="输入成分IUPAC" onChange={e => this.handleChange('iupac',e)}/>
        <p>上传成分封面图:</p>
        <div className="clearfix">
         <Upload
           customRequest={this.handleCustomRequest.bind(this)}
           listType="picture-card"
           showUploadList={false}
         >
           {this.state.pic ?<img alt="pic" style={{"width":"200px"}} src={this.state.pic}/>: uploadButton}
         </Upload>
       </div>
       <Button type="primary" className="submit" onClick={this.handleClick.bind(this)}>确认上传</Button>
      </div>
    )
  }
}

export default UploadIngre
