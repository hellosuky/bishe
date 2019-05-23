import {fork,all,put,call,take} from 'redux-saga/effects'
import axios from 'axios'
import {Actions} from '../actiontypes/actions'
import {Actions as IngreActions} from '../actiontypes/ingredient.actions'

function* addIngredient(name,category,url,infor,enname,iupac,pic){
  yield put({type:Actions.FETCH_START})
  try{
    return yield call(axios.post,'/addingredients',{name,category,url,infor,enname,iupac,pic})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Actions.FETCH_END})
  }
}

function* addIngredientFlow(){
  while (true) {
    let req = yield take(IngreActions.ADD_INGREDIENTS)
    let res = yield call(addIngredient,req.name,req.category,req.url,req.infor,req.enname,req.iupac,req.pic)
    if(res.data && res.data.code === 0){
      yield put({type:IngreActions.ADD_INGREDIENTS_SUCCESS})
    }
  }
}


export function* ingredientSaga(){
  yield all([
    fork(addIngredientFlow),
  ])
}
