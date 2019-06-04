import React,{Component} from 'react'
import {Layout,Menu,message} from 'antd'
import {Switch,Route} from 'react-router-dom'
import {connect} from 'react-redux'
import UploadIngre from '../uploadIngre/index'
import UploadCategory from '../uploadcategory/index'
import UploadBrand from '../uploadbrand/index'
import UploadProducts from '../uploadproducts/index'
import AddAdmin from '../addadmin/index'
import IsLoading from '../../components/isloading/index'
import UpdateIngre from '../updateingre/index'
import UploadTheory from '../uploadtheory/index'
import UpdateTheory from '../updatetheory/index'
import EditIngre from '../editIngredient/index'
import EditTheory from '../edittheory/index'
import {getUser} from '../../reducers/login.redux'
import './index.css'

const {Header,Content,Sider} = Layout

const menus = [
  {url:'/adminpage/uploadbrand',name:'展示品牌修改'},
  {url:'/adminpage/uploadproducts',name:'更新展示产品'},
  {url:'/adminpage/uploadcategory',name:'修改有效成分种类'},
  {url:'/adminpage/uploadingre',name:'新增有效成分'},
  {url:'/adminpage/updateingre',name:'更新有效成分'},
  {url:'/adminpage/uploadtheory',name:'新增原理详情'},
  {url:'/adminpage/updatetheory',name:'更新原理详情'},
  {url:'/adminpage/addadmin',name:'更新后台管理员'}
]

@connect(
  state => ({globalMsg:state.globalMsg,loginReducers:state.loginReducers}),
  {getUser}
)
class AdminPage extends Component{
  constructor(){
    super()
    this.state = {
      current:'/adminpage/uploadbrand'
    }
  }
  componentWillMount(){
    this.props.getUser()
  }
  componentWillReceiveProps(nextProps){
    if(!nextProps.loginReducers.isLogin){
      message.error('你没有登陆这里的权限')
      setTimeout(()=>this.props.history.push('/admin'),1500)
    }
  }
  handleChooseMenu(e){
   this.setState({current:e.key})
   this.props.history.push(`${e.key}`)
 }
 goBack(){
   this.props.history.push('/first')
 }
  render(){
    return(
      <Layout id="layout-container" style={{'minHeight':"100%"}}>
     <Header className="header">
       <img alt="logo" className="logo" src={require('../../images/logo.png')}/>
       <span className="logo-text">知美后台</span>
       <span className="go-back" onClick={this.goBack.bind(this)}>返回首页</span>
     </Header>
     <Layout>
       <Sider width={200} style={{ background: '#fff' }}>
       <Menu
        mode="inline"
        defaultSelectedKeys={['/adminpage/uploadbrand']}
        selectedKeys={[this.state.current]}
        onClick={this.handleChooseMenu.bind(this)}>
          {menus.map(v=>
              <Menu.Item key={v.url}>
                <span>{v.name}</span>
              </Menu.Item>)
          }
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
              <Route path="/adminpage/uploadtheory" component={UploadTheory}/>
              <Route path="/adminpage/uploadbrand" component={UploadBrand}/>
              <Route path="/adminpage/uploadingre" component={UploadIngre}/>
              <Route path="/adminpage/editingredient" component={EditIngre}/>
              <Route path="/adminpage/edittheory" component={EditTheory}/>
              <Route path="/adminpage/updateingre" component={UpdateIngre}/>
              <Route path="/adminpage/uploadcategory" component={UploadCategory}/>
              <Route path="/adminpage/addadmin" component={AddAdmin}/>
              <Route path="/adminpage/updatetheory" component={UpdateTheory}/>
              <Route component={UploadBrand} />
            </Switch>
         </Content>
       </Layout>
     </Layout>
 </Layout>
    )
  }
}

export default AdminPage
