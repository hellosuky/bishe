import React,{Component} from 'react'
import Cream from '../../data/cream.json'
import { Modal,Button,List } from 'antd'
import './index.css'

class FrontPage extends Component{
  render(){
    return (
      <div id="container">
        {
          Cream.map((item,index) =>{
            return <Item data={item} key={index}/>
          })
        }
        <div>
          通过对四款不同价位的面霜进行一个成分表的对比，我们可以看到 面霜类 最重要的东西有两类 一类是 保湿剂 另外一类是 抗氧化剂，
          而且 随着价钱的提高 明显变化的是 抗氧化剂 的数量,那我们不仅只对这四款的面霜进行了对比，我们还将所有大牌的面霜抽离出来与
          我们的普通品牌进行对比，得到了下图
        </div>
      </div>
    )
  }
}


class Item extends Component{
  constructor(){
    super()
    this.state = { visible: false }
  }
  showModal(){
    this.setState({
      visible: true,
    });
  }
  handleOk(e){
    this.setState({
      visible: false,
    });
  }

  handleCancel(e){
    this.setState({
      visible: false,
    })
  }
  render(){
    const data = this.props.data
    var str=data.normal.join(" ,")
    return (
      <div className="item-container">
        <img className="pic" src={require('.'+data.imgUrl +'.png')}/>
        <p style={{fontSize:"22px"}}>{data.productName}</p>
        <p style={{fontSize:"21px"}}>价格：{data.price}</p>
        <p className="title">重复元素</p>
        <ul>
          {
            data.common.length !== 0 && data.common.map((v,index)=>{
              return <li className="li" key={index}>
                        <span className="word">{v}</span>
                        <Button type="primary" className="btn" icon="search" onClick={this.showModal.bind(this)}/>
                    </li>
            })
          }
        </ul>
        <p className="title">{data.antioxidation.length > 0 ?'抗氧化剂':""}{data.antioxidation.length > 0 ?<span>了解更多</span>:''}</p>
        <ul>
          {
            data.antioxidation.length !== 0 && data.antioxidation.map((v,index)=>{
              return <li className="li" key={index}>
                        <span className="word">{v}</span>
                        <Button type="primary" className="btn" icon="search" onClick={this.showModal.bind(this)}/>
                     </li>
            })
          }
        </ul>
        <p className="title">{  data.moisturizing.length > 0?'保湿剂':''}</p>
        <ul>
          {
            data.moisturizing.length > 0 && data.moisturizing.map((v,index)=>{
              return <li className="li" key={index}>
                          <span className="word">{v}</span>
                          <Button type="primary" className="btn" icon="search" onClick={this.showModal.bind(this)}/>
                      </li>
            })
          }
        </ul>
        <p className="title">{data.exfoliation.length>0 ?'去角质':''}</p>
        <ul>
          {
            data.exfoliation.length>0 && data.exfoliation.map((v,index)=>{
              return <li className="li" key={index}>
                        <span className="word">{v}</span>
                        <Button type="primary" className="btn" icon="search" onClick={this.showModal.bind(this)}/>
                    </li>
            })
          }
        </ul>
        <p className="title">{data.whitening.length >0 ?'美白祛斑':''}</p>
        <ul>
          {
            data.whitening.length > 0 && data.whitening.map((v,index)=>{
              return <li className="li" key={index}>
                        <span className="word">{v}</span>
                        <Button type="primary" className="btn" icon="search" onClick={this.showModal.bind(this)}/>
                     </li>
            })
          }
        </ul>
        <p className="title">普通元素</p>
        {str}
        <Modal
          title="甘油"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
        <iframe title="ab" style={{width:'200px',height: '150px'}} frameBorder="0"
        src="https://embed.molview.org/v1/?mode=balls&smiles=C(=O[H])(C(=O[H])(C(=O[H])([H])[H])[H])([H])[H]&bg=white" />
        <div class="moda">
          <p>格式：C3H11O3</p>
          <p>主要作用：甘油又称丙三醇，柔软、保湿、卸妆溶剂及润滑剂。
          绝不可直接使用未经稀释的100%纯甘油，会造成反效果。甘油具有吸水作用，
          保湿护肤品常常用它吸附空气中的水分子，令其覆盖的皮肤角质层保持湿润。
          但是纯甘油的保湿效果容易受到空气中湿度的影响。湿度较低的季节或环境，
          纯甘油在空气中吸收不到足够的水分，反而会从肌肤真皮中吸取水分，
          使皮肤更加干燥，甚至出现脱水。但是基于多数化妆品是复合型，
          可以考虑有添加适量甘油的化妆品但不建议选用纯甘油化妆品。</p>
        </div>
        </Modal>
      </div>
    )
  }
}


export default FrontPage
