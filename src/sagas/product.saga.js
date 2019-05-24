import {fork,all,put,call,take} from 'redux-saga/effects'
import axios from 'axios'
import {Actions} from '../actiontypes/actions'

function* getProduct(brand){
  yield put({type:Actions.FETCH_START})
  try{
    return yield call(axios.post,'/products',{brand})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Actions.FETCH_END})
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

function* addBrand(brand,enname,pic,deleteurl){
  yield put({type:Actions.FETCH_START})
  try{
    return yield call(axios.post,'/back/addbrand',{brand,enname,pic,deleteurl})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Actions.FETCH_END})
  }
}

function* addBrandFlow(){
  while (true) {
    let req = yield take(Actions.ADD_BRAND)
    let res = yield call(addBrand,req.brand,req.enname,req.pic,req.deleteurl)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.ADD_BRAND_SUCCESS,payload:res.data.data})
    }
  }
}

function* getBrand(){
  yield put({type:Actions.FETCH_START})
  try{
    return yield call(axios.get,'/back/getbrand')
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Actions.FETCH_END})
  }
}

function* getBrandFlow(){
  while (true) {
    let req = yield take(Actions.GET_BRAND)
    let res = yield call(getBrand)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.GET_BRAND_SUCCESS,payload:res.data.data})
    }
  }
}

function* deleteBrand(id){
  yield put({type:Actions.FETCH_START})
  try{
    return yield call(axios.post,'/back/deletebrand',{id})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Actions.FETCH_END})
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
