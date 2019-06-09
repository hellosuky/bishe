import {fork,all,put,call,take} from 'redux-saga/effects'
import axios from 'axios'
import {Helper} from '../actiontypes/helper.actions'
import {Actions as IngreActions} from '../actiontypes/ingredient.actions'

function* addIngredient(name,category,url,infor,enname,iupac,pic){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/ingredient/addingredients',{name,category,url,infor,enname,iupac,pic})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
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

function* updateIngredient(id,name,category,url,infor,enname,iupac,pic){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/ingredient/updateingredient',{id,name,category,url,infor,enname,iupac,pic})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* updateIngredientFlow(){
  while (true) {
    let req = yield take(IngreActions.UPDATE_INGREDIENT)
    let res = yield call(updateIngredient,req.id,req.name,req.category,req.url,req.infor,req.enname,req.iupac,req.pic)
    if(res.data && res.data.code === 0){
      yield put({type:IngreActions.UPDATE_INGREDIENT_SUCCESS})
    }
  }
}

function* getIngredient(page,category,word){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.get,`/back/ingredient/getingredients?page=${page}&category=${category}&word=${word}`)
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getIngredientFlow(){
  while (true) {
    let req = yield take(IngreActions.GET_INGREDIENTS)
    let res = yield call(getIngredient,req.page,req.category,req.word)
    if(res.data && res.data.code === 0){
      yield put({type:IngreActions.GET_INGREDIENTS_SUCCESS,payload:res.data.data,total:res.data.total})
    }
  }
}

function* getSpecialIngredient(id){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.get,`/back/ingredient/getspecialingredient?id=${id}`)
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getSpecialIngredientFlow(){
  while (true) {
    let req = yield take(IngreActions.GET_SPECIAL_INGREDIENT)
    let res = yield call(getSpecialIngredient,req.id)
    if(res.data && res.data.code === 0){
      yield put({type:IngreActions.GET_SPECIAL_INGREDIENT_SUCCESS,payload:res.data.data})
    }
  }
}

function* deleteIngredient(id){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/ingredient/deleteingredients',{id})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* deleteIngredientFlow(){
  while (true) {
    let req = yield take(IngreActions.DELETE_INGREDIENTS)
    let res = yield call(deleteIngredient,req.id)
    if(res.data && res.data.code === 0){
      yield put({type:IngreActions.DELETE_INGREDIENTS_SUCCESS,payload:res.data.data})
    }
  }
}

function* getCategory(){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.get,'/back/ingredient/getcategory')
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getCategoryFlow(){
  while (true) {
    yield take(IngreActions.GET_CATEGORY)
    let res = yield call(getCategory)
    if(res.data && res.data.code === 0){
      yield put({type:IngreActions.GET_CATEGORY_SUCCESS,payload:res.data.data})
    }
  }
}

function* addCategory(name){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/ingredient/addcategory',{name})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
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
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/ingredient/deletecategory',{id})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
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
    fork(getIngredientFlow),
    fork(deleteIngredientFlow),
    fork(getSpecialIngredientFlow),
    fork(updateIngredientFlow),
    // 分类操作
    fork(getCategoryFlow),
    fork(addCategoryFlow),
    fork(deleteCategoryFlow)
  ])
}
