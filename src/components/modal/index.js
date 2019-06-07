import React,{Component} from 'react'
import {Modal} from 'antd'
import './index.css'

class SelfModal extends Component{
  handleCancel(){
    this.props.close()
  }
  render(){
    const data = this.props.data
    let a = this.props.product.map(v=>v.name).join('、')
    return(
        <Modal
           title="详细信息"
           visible={this.props.visible}
           footer={null}
           onCancel={this.handleCancel.bind(this)}
         >
           <iframe style={{'width': '100%'}}
           title="iframe"
           frameBorder="0" src={data.url}></iframe>
           <p className="modal-name">{data.name}</p>
           <p className="modal-cator">{data.category?data.category.name:null}</p>
           <p className="modal-iupac">IUPAC名：{data.iupac}</p>
           <p className="modal-infor">简介:{data.infor}</p>
           <p className="modal-product">使用该有效成分的几个产品: {a}</p>
         </Modal>
    )
  }
}

export default SelfModal
