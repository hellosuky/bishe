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

function* getBrandProducts(brand){
  yield put({type:Helper.FETCH_START})
  try{
    let data = yield call(axios({
      method:'POST',
      url:`/province/webquery/wq.do?method=query`,
      data:`querytype=productname&pfid=&content=${brand.name}&dataPage=&allPage=&perPage=&allRows=&order=`,
      headers:{
        "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }))
    let page = data.pageBean.allPage
    console.log(page)
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* addBrandFlow(){
  while (true) {
    let req = yield take(Actions.ADD_BRAND)
    let res = yield call(addBrand,req.brand,req.enname,req.pic)
    if(res.data && res.data.code === 0){
      let add = res.data.data
      //品牌新增成功
      yield put({type:Actions.ADD_BRAND_SUCCESS,payload:add})
      //获取产品
      let res2 = yield call(getBrandProducts,add)
      console.log(res2.data)
    }
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
