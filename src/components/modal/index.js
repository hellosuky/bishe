import React,{Component} from 'react'
import {Modal} from 'antd'
import {URL} from '../../utils/url'
import './index.css'

class SelfModal extends Component{
  handleCancel(){
    this.props.close()
  }
  render(){
    const data = this.props.data
    return(
        <Modal
           title="详细信息"
           visible={this.props.visible}
           footer={null}
           onCancel={this.handleCancel.bind(this)}
         >
           {data.url?<iframe style={{'width': '100%'}}
           title="iframe"
           frameBorder="0" src={data.url}></iframe>:<img style={{'width': '100%'}} src={URL + data.pic} alt={data.name}/>}
           <p className="modal-name">{data.name}</p>
           <p className="modal-cator">{data.category?data.category.name:null}</p>
           <p className="modal-iupac">IUPAC名：{data.iupac}</p>
           <p className="modal-infor">简介:{data.infor}</p>
         </Modal>
    )
  }
}

export default SelfModal
