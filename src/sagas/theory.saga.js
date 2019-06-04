import {fork,all,put,call,take} from 'redux-saga/effects'
import axios from 'axios'
import {Helper} from '../actiontypes/helper.actions'
import {Actions} from '../actiontypes/theory.actions'

function* addTheory(title,content,cover){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/theory/addtheory',{title,content,cover})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* addTheoryFlow(){
  while (true) {
    let req = yield take(Actions.ADD_THEORY)
    let res = yield call(addTheory,req.title,req.content,req.cover)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.ADD_THEORY_SUCCESS})
    }
  }
}

function* getTheory(){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.get,`/back/theory/gettheory`)
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getTheoryFlow(){
  while (true) {
    yield take(Actions.GET_THEORY)
    let res = yield call(getTheory)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.GET_THEORY_SUCCESS,payload:res.data.data})
    }
  }
}

function* getSpecialTheory(id){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,`/back/theory/getspecialtheory`,{id})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getSpecialTheoryFlow(){
  while (true) {
    let req = yield take(Actions.GET_SPECIAL_THEORY)
    let res = yield call(getSpecialTheory,req.id)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.GET_SPECIAL_THEORY_SUCCESS,payload:res.data.data})
    }
  }
}

function* getSearchTheory(word){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.get,`/back/theory/getsearchtheory?word=${word}`)
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getSearchTheoryFlow(){
  while (true) {
    let req = yield take(Actions.GET_SEARCH_THEORY)
    let res = yield call(getSearchTheory,req.word)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.GET_SEARCH_THEORY_SUCCESS,payload:res.data.data})
    }
  }
}

function* deleteTheory(id){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,`/back/theory/deletetheory`,{id})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* deleteTheoryFlow(){
  while (true) {
    let req = yield take(Actions.DELETE_THEORY)
    let res = yield call(deleteTheory,req.id)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.DELETE_THEORY_SUCCESS,payload:res.data.data})
    }
  }
}

function* editTheory(id,title,content,cover){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,`/back/theory/edittheory`,{id,title,content,cover})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* editTheoryFlow(){
  while (true) {
    let req = yield take(Actions.EDIT_THEORY)
    let res = yield call(editTheory,req.id,req.title,req.content,req.cover)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.EDIT_THEORY_SUCCESS,payload:res.data.data})
    }
  }
}


export function* theorySaga(){
  yield all([
    fork(addTheoryFlow),
    fork(getTheoryFlow),
    fork(getSearchTheoryFlow),
    fork(getSpecialTheoryFlow),
    fork(editTheoryFlow),
    fork(deleteTheoryFlow)
  ])
}
