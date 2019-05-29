import {fork,all,put,call,take} from 'redux-saga/effects'
import axios from 'axios'
import {Helper} from '../actiontypes/helper.actions'
import {Actions} from '../actiontypes/actions'

function* getProduct(brand){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/products/getproducts',{brand})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getProductFlow(){
  while (true) {
    let req = yield take(Actions.GET_PRODUCT)
    let res = yield call(getProduct,req.brand)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.GET_PRODUCT_SUCCESS})
    }
  }
}

function* addBrand(brand,enname,pic){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/products/addbrand',{brand,enname,pic})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}


function* getPage(brand){
  yield put({type:Helper.FETCH_START})
  try{
    const config = {
      headers:{
        "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
    const data = `querytype=productname&pfid=&content=${brand}&dataPage=&allPage=&perPage=&allRows=&order=`
    let res = yield call(axios.post,`/province/webquery/wq.do?method=query`,data,config)
    let page = res.data.pageBean.allPage
    return page
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getList(brand,page){
  yield put({type:Helper.FETCH_START})
  try{
    let arr = []
    for(let i=0;i<page;i++){
      const config = {
        headers:{
          "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
      const data = `querytype=productname&pfid=&content=${brand}&dataPage=${i}&allPage=&perPage=&allRows=&order=`
      let res = yield call(axios.post,`/province/webquery/wq.do?method=query`,data,config)
      arr.push(...res.data.list)
    }
    return arr
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getDetail(list){
  yield put({type:Helper.FETCH_START})
  try{
    let arr = []
    for(let i=0;i<list.length;i++){
      const config = {
        headers:{
          "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
      const data = `method=show&id=${list[i].id}`
      let res = yield call(axios.post,`/province/webquery/wq.do`,data,config)
      arr.push(res.data)
    }
    return arr
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* save(products,id){
  yield put({type:Helper.FETCH_START})
  try {
    return yield call(axios.post,'/back/products/addproducts',{products,id})
  } catch (e) {
    console.log(e)
  } finally {
    yield put({type:Helper.FETCH_END})
  }
}

function* addBrandFlow(){
  while (true) {
    let req = yield take(Actions.ADD_BRAND)
    //增加品牌到数据库中
    let res = yield call(addBrand,req.brand,req.enname,req.pic)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.ADD_BRAND_SUCCESS,payload:res.data.data})
    }
    //获得返回的数据进行第二次请求,获取该品牌的页数
    let brand = res.data.data.name
    let res1 = yield call(getPage,brand)
    //第三次请求，根据获得的页数请求产品list清单
    let res2 = yield call(getList,brand,res1)
    //第三次请求，获取我们的具体的产品
    let res3 = yield call(getDetail,res2)
    //将请求的值存入数据库
    yield call(save,res3,res.data.data._id)
  }
}

function* getBrand(){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.get,'/back/products/getbrand')
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getBrandFlow(){
  while (true) {
    yield take(Actions.GET_BRAND)
    let res = yield call(getBrand)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.GET_BRAND_SUCCESS,payload:res.data.data})
    }
  }
}

function* deleteBrand(id){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/products/deletebrand',{id})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* deleteBrandFlow(){
  while (true) {
    let req = yield take(Actions.DELETE_BRAND)
    let res = yield call(deleteBrand,req.id)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.DELETE_BRAND_SUCCESS,payload:res.data.data})
    }
  }
}

export function* actionSaga(){
  yield all([
    fork(getProductFlow),
    fork(addBrandFlow),
    fork(getBrandFlow),
    fork(deleteBrandFlow)
  ])
}
