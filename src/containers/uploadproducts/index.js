import React,{Component} from 'react'
import {Table,Button,Input,Select} from 'antd'
import './index.css'

const Option = Select.Option

const columns = [
  {
    title: '名字',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '产品图片',
    dataIndex: 'pic',
    key: 'pic',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">删除该产品</a>
      </span>
    ),
  }
]
const data = [
  {
    key: '1',
    name: '保湿剂'
  },
  {
    key: '2',
    name: '抗氧化剂'
  },
  {
    key: '3',
    name: '表面活性剂'
  },
]
class UploadProducts extends Component{
  handleChange(){

  }
  render(){
    return(
      <div id="uploadproducts-container">
        <p className="title">产品种类更新</p>
        <Select defaultValue="lucy" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>
              Disabled
            </Option>
            <Option value="Yiminghe">yiminghe</Option>
        </Select>
        <Input placeholder="种类搜索" style={{'maxWidth':"400px","marginRight":"20px","float":"right"}}/>
        <p>现有种类</p>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}

export default UploadProducts
