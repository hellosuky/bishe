import React,{Component} from 'react'
import {Layout,Menu,Breadcrumb,Icon} from 'antd'
import {Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import UploadIngre from '../uploadIngre/index'
import UploadCategory from '../uploadcategory/index'
import UploadBrand from '../uploadbrand/index'
import UploadProducts from '../uploadproducts/index'
import AddAdmin from '../addadmin/index'
import IsLoading from '../../components/isloading/index'
import './index.css'

const {SubMenu} = Menu
const {Header,Content,Sider} = Layout

@connect(
  state => state.globalMsg
)
class AdminPage extends Component{
  render(){
    return(
      <Layout id="layout-container" style={{'minHeight':"100%"}}>
     <Header className="header">
       <img alt="logo" className="logo" src={require('./images/logo.png')}/>
       <span style={{'color':"#fff","paddingLeft":"5px"}}>知美后台</span>
     </Header>
     <Layout>
       <Sider width={200} style={{ background: '#fff' }}>
         <Menu
           mode="inline"
           defaultSelectedKeys={['1']}
           defaultOpenKeys={['sub1']}
           style={{ height: '100%', borderRight: 0 }}
         >
             <Menu.Item key="1" onClick={()=>this.props.history.push('/adminpage/uploadproducts')}>修改展示产品</Menu.Item>
             <Menu.Item key="2" onClick={()=>this.props.history.push('/adminpage/uploadbrand')}>展示品牌修改</Menu.Item>
             <Menu.Item key="3" onClick={()=>this.props.history.push('/adminpage/uploadingre')}>新增有效成分</Menu.Item>
             <Menu.Item key="4" onClick={()=>this.props.history.push('/adminpage/uploadcategory')}>修改有效成分种类</Menu.Item>
             <Menu.Item key="5" onClick={()=>this.props.history.push('/adminpage/addadmin')}>新增后台管理员</Menu.Item>
         </Menu>
       </Sider>
       <Layout style={{ padding: '0 24px 24px' }}>
         <Content
           style={{
             background: '#fff',
             padding: 24,
             margin: 0,
             minHeight: 280,
           }}
         >
          {this.props.isLoading && <IsLoading />}
           <Switch>
              <Route path="/adminpage/uploadproducts" component={UploadProducts}/>
              <Route path="/adminpage/uploadbrand" component={UploadBrand}/>
              <Route path="/adminpage/uploadingre" component={UploadIngre}/>
              <Route path="/adminpage/uploadcategory" component={UploadCategory}/>
              <Route path="/adminpage/addadmin" component={AddAdmin}/>
            </Switch>
         </Content>
       </Layout>
     </Layout>
 </Layout>
    )
  }
}

export default AdminPage
