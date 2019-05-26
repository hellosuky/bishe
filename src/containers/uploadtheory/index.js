import React,{Component} from 'react'
import {Input,Button, Upload,Icon} from 'antd'
import './index.css'

const { TextArea } = Input

class UploadTheory extends Component{
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
        <Input placeholder="输入标题"/>
        <p>输入你的文章内容：</p>
        <TextArea placeholder="输入你的文章内容" rows={5}/>
        <p>插入图片：</p>
        <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        onChange={this.handleChange}
      >
         {uploadButton}
      </Upload>
        <Button type="primary" style={{"marginTop":'15px'}}>发布</Button>
      </div>
    )
  }
}

export default UploadTheory
