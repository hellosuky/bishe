import React,{Component} from 'react'
import {Input,Button, Upload,Icon,Modal,message} from 'antd'
import {connect} from 'react-redux'
import {editTheory} from '../../reducers/theory.redux'
import axios from 'axios'
import wangEditor from 'wangeditor'
import './index.css'

const URL = 'http://47.100.171.180:3001/upload/'

@connect(
  state=>state.theory,
  {editTheory}
)
class EditTheory extends Component{
  constructor(){
    super()
    this.state = {
      editorContent: '',
      title:'',
      cover:'',
      id:'',
      previewVisible:false,
      hover:false
    }
    this.onChange = this.onChange.bind(this)
  }
  componentDidMount(){
    this.editor = new wangEditor(this.refs.editorDom)
    //菜单配置
    this.editor.customConfig.menus = [
        'head',  // 标题
       'bold',  // 粗体
       'fontSize',  // 字号
       'fontName',  // 字体
       'foreColor',  // 文字颜色
       'backColor',  // 背景颜色
       'link',  // 插入链接
       'list',  // 列表
       'quote',  // 引用
       'image',  // 插入图片
       'undo',  // 撤销
       'redo'  // 重复
    ]
    this.editor.customConfig.customUploadImg = function (files, insert) {
      const data= new FormData()
      data.append('pic', files[0])
        const config= {
          "headers": {
            "content-type": 'multipart/form-data; boundary=----WebKitFormBoundaryqTqJIxvkWFYqvP5s'
          }
        }
        axios.post('/api/upload', data, config)
        .then((res:any) => {
          var imgUrl = URL + res.data.data.filename
          insert(imgUrl)
        }).catch((err: Error) => {
          console.log(err)
        })
      }
    this.editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      })
    }
    this.editor.create()
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.article.title){
        let ingre = nextProps.article
        this.editor.txt.html(ingre.content)
        this.setState({id:ingre._id,title:ingre.title,editorContent:ingre.content,cover:ingre.cover})
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
       this.setState({cover:res.data.data.filename})
       options.onSuccess(res.data, options.file)
     }).catch((err: Error) => {
       console.log(err)
     })
  }
  onChange(key,val){
    this.setState({[key]:val})
  }
  handleSubmit(){
   if(!this.state.title||!this.state.editorContent||!this.state.cover){
     message.error('请把空填完')
     return
   }
   this.props.editTheory(this.state.id,this.state.title,this.state.editorContent,this.state.cover)
   message.success('修改成功')
   setTimeout(()=>this.props.history.push('/adminpage/updatetheory'),1500)
  }
  handlePreview(){
   this.setState({
     previewVisible:true
   })
  }
  handleCancel(){
   this.setState({
     previewVisible:false
   })
  }
  handleHover(){
   this.setState({hover:true})
  }
  handleBlur(){
   this.setState({hover:false})
  }
  handleDelete(){
   axios.post('/api/delete',{url:this.state.cover})
   this.setState({cover:''})
  }
  render(){
    const uploadButton = (
        <div>
          <Icon type= 'plus' />
          <div className="ant-upload-text">Upload</div>
        </div>
      )
    return (
      <div>
        <p>输入你的文章标题：</p>
        <Input placeholder="输入标题" value={this.state.title} onChange={e=>this.onChange('title',e.target.value)}/>
        <p>输入你的文章内容：</p>
        <div className="markdown-editor" ref="editorDom" />
        <p>插入封面图片：</p>
        <div className="clearfix">
         <Upload
           customRequest={this.handleCustomRequest.bind(this)}
           listType="picture-card"
           showUploadList={false}
           disabled={this.state.cover?true:false}
           style={{'position':'relative'}}
         >
           {this.state.cover ?
            <div onMouseLeave={this.handleBlur.bind(this)} onMouseOver={this.handleHover.bind(this)}>
              <img alt="pic" style={{"width":"200px"}} src={URL + this.state.cover}/>
              {this.state.hover?
              <div>
                <Icon style={{'position':'absolute',"left":'45%',"top":"50%","transform":"translate(-50%,-50%)"}} onClick={this.handleDelete.bind(this)} type="delete"/>
                <Icon style={{'position':'absolute',"left":'55%',"top":"50%","transform":"translate(-50%,-50%)"}} onClick={this.handlePreview.bind(this)}  type="eye"/>
              </div>:null}
            </div>
             : uploadButton}
         </Upload>
         <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel.bind(this)}>
          <img alt="example" style={{ width: '100%' }} src={URL + this.state.cover} />
        </Modal>
       </div>
        <Button type="primary" style={{"marginTop":'15px'}} onClick={this.handleSubmit.bind(this)}>修改</Button>
      </div>
    )
  }
}

export default EditTheory
