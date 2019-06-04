import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'
import FrontPage from './containers/frontPage/index'
import SecondPage from './containers/secondPage/index'
// import Principle from './containers/principle/index'
// import Brand from './containers/brand/index'
// import Category from './containers/category/index'
// import Detail from './containers/brand/detail'
// import ChoseTheory from './containers/choseTheory/index'
// import ChoseBrand from './containers/choseBrand/index'
// import Pk from './containers/pk/index'
// import Admin from './containers/admin/index'
// import AdminPage from './containers/adminpage/index'
import asyncComponent from './containers/AsyncComponent/index'

const AsyncAdminPage = asyncComponent(()=>import('./containers/adminpage/index'))
const AsyncAdmin = asyncComponent(()=>import('./containers/admin/index'))
const AsyncChoseBrand = asyncComponent(()=>import('./containers/choseBrand/index'))
const AsyncPk = asyncComponent(()=>import('./containers/pk/index'))
const AsyncChoseTheory = asyncComponent(()=>import('./containers/choseTheory/index'))
const AsyncDetail = asyncComponent(()=>import('./containers/brand/detail'))
const AsyncCategory = asyncComponent(()=>import('./containers/category/index'))
const AsyncBrand = asyncComponent(()=>import('./containers/brand/index'))
const AsyncPrinciple = asyncComponent(()=>import('./containers/principle/index'))


//前端、后端、404
class App extends Component {
  componentWillMount(){
    this.resize()
  }
  componentDidMount(){
    this.screenChange()
  }
  screenChange(){
    window.addEventListener('resize',this.resize)
  }
  resize(){
    var dom = document.documentElement
    var clientWidth = dom.clientWidth
    if (!clientWidth) return
    if(clientWidth>=750){
          dom.style.fontSize = '50px';
    }else{
          dom.style.fontSize = 100 * (clientWidth / 750) + 'px';
    }
  }
  render() {
    return (
      <div className="wrapper">
          <Switch>
            <Route path="/detail/:id" component={AsyncDetail} />
            <Route path="/pk/:id" component={AsyncPk} />
            <Route path="/second" component={SecondPage} />
            <Route path="/theory" component={AsyncChoseTheory} />
            <Route path="/chosebrand" component={AsyncChoseBrand} />
            <Route path="/principle/:id" component={AsyncPrinciple} />
            <Route path="/brand/:id" component={AsyncBrand} />
            <Route path="/category" component={AsyncCategory} />
            <Route path="/admin" component={AsyncAdmin} />
            <Route path="/adminpage" component={AsyncAdminPage} />
            <Route path="/" component={FrontPage} />
            <Route component={FrontPage} />
          </Switch>
      </div>
    );
  }
}

export default App;
