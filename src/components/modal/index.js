import React,{Component} from 'react'
import {Modal} from 'antd'

class SelfModal extends Component{
  handleCancel(){
    this.props.close()
  }
  render(){
    const data = this.props.data
    return(
      <div id="selfmodal-container">
        <Modal
           title="详细信息"
           visible={this.props.visible}
           footer={null}
           onCancel={this.handleCancel.bind(this)}
         >
           <iframe style={{'width': '500px', 'height': '300px'}}
           title="ddd"
           frameBorder="0" src={data.url}></iframe>
           <p>{data.name}</p>
           <p>{data.iupac}</p>
           <p>{data.infor}</p>
         </Modal>
      </div>
    )
  }
}

export default SelfModal
