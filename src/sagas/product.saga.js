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


export function* actionSaga(){
  yield all([
    fork(getProductFlow),
  ])
}
