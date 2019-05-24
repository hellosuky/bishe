import React, { Component } from 'react'
import {Switch,Route} from 'react-router-dom'
import FrontPage from './containers/frontPage/index'
import SecondPage from './containers/secondPage/index'
import Principle from './containers/principle/index'
import Brand from './containers/brand/index'
import Category from './containers/category/index'
import Detail from './containers/brand/detail'
import ChoseTheory from './containers/choseTheory/index'
import ChoseBrand from './containers/choseBrand/index'
import Pk from './containers/pk/index'
import Admin from './containers/admin/index'
import AdminPage from './containers/adminpage/index'
import Page from './containers/page/index'

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
          dom.style.fontSize = '100px';
    }else{
          dom.style.fontSize = 100 * (clientWidth / 750) + 'px';
    }
  }
  render() {
    return (
      <div className="wrapper">
          <Switch>
            <Route path="/detail" component={Detail} />
            <Route path="/pk" component={Pk} />
            <Route path="/second" component={SecondPage} />
            <Route path="/theory" component={ChoseTheory} />
            <Route path="/chosebrand" component={ChoseBrand} />
            <Route path="/principle" component={Principle} />
            <Route path="/brand" component={Brand} />
            <Route path="/page" component={Page} />
            <Route path="/category" component={Category} />
            <Route path="/admin" component={Admin} />
            <Route path="/adminpage" component={AdminPage} />
            <Route path="/" component={FrontPage} />
            <Route component={FrontPage} />
          </Switch>
      </div>
    );
  }
}

export default App;
