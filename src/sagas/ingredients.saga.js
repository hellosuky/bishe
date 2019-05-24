import {fork,all,put,call,take} from 'redux-saga/effects'
import axios from 'axios'
import {Actions} from '../actiontypes/actions'
import {Actions as IngreActions} from '../actiontypes/ingredient.actions'

function* addIngredient(name,category,url,infor,enname,iupac,pic){
  yield put({type:Actions.FETCH_START})
  try{
    return yield call(axios.post,'/back/addingredients',{name,category,url,infor,enname,iupac,pic})
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
      yield put({type:IngreActions.ADD_INGREDIENTS_SUCCESS,payload:res.data.data})
    }
  }
}

function* getCategory(){
  yield put({type:Actions.FETCH_START})
  try{
    return yield call(axios.get,'/back/getcategory')
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Actions.FETCH_END})
  }
}

function* getCategoryFlow(){
  while (true) {
    let req = yield take(IngreActions.GET_CATEGORY)
    let res = yield call(getCategory)
    if(res.data && res.data.code === 0){
      yield put({type:IngreActions.GET_CATEGORY_SUCCESS,payload:res.data.data})
    }
  }
}

function* addCategory(name){
  yield put({type:Actions.FETCH_START})
  try{
    return yield call(axios.post,'/back/addcategory',{name})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Actions.FETCH_END})
  }
}

function* addCategoryFlow(){
  while (true) {
    let req = yield take(IngreActions.ADD_CATEGORY)
    let res = yield call(addCategory,req.category)
    if(res.data && res.data.code === 0){
      yield put({type:IngreActions.ADD_CATEGORY_SUCCESS,payload:res.data.data})
    }
  }
}

function* deleteCategory(id){
  yield put({type:Actions.FETCH_START})
  try{
    return yield call(axios.post,'/back/deletecategory',{id})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Actions.FETCH_END})
  }
}

function* deleteCategoryFlow(){
  while (true) {
    let req = yield take(IngreActions.DELETE_CATEGORY)
    let res = yield call(deleteCategory,req.id)
    if(res.data && res.data.code === 0){
      yield put({type:IngreActions.DELETE_CATEGORY_SUCCESS,payload:res.data.data})
    }
  }
}

export function* ingredientSaga(){
  yield all([
    fork(addIngredientFlow),
    // 分类操作
    fork(getCategoryFlow),
    fork(addCategoryFlow),
    fork(deleteCategoryFlow)
  ])
}
