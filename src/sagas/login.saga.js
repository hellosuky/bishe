import {fork,all,put,call,take} from 'redux-saga/effects'
import axios from 'axios'
import {Helper} from '../actiontypes/helper.actions'
import {Actions} from '../actiontypes/login.actions'

function* loginfunc(username,pwd){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/user/login',{username,pwd})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* loginFlow(){
  while (true) {
    let req = yield take(Actions.LOGIN)
    let res = yield call(loginfunc,req.user,req.pwd)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.LOGIN_SUCCESS,payload:true})
    }
  }
}

function* getAllAdmin(){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.get,'/back/user/getall')
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getAllAdminFlow(){
  while (true) {
    yield take(Actions.GET_ALL_ADMIN)
    let res = yield call(getAllAdmin)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.GET_ALL_ADMIN_SUCCESS,payload:res.data.data})
    }
  }
}

function* addAdmin(username,pwd){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/user/addadmin',{username,pwd})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* addAdminFlow(){
  while (true) {
    let req = yield take(Actions.ADD_ADMIN)
    let res = yield call(addAdmin,req.user,req.pwd)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.ADD_ADMIN_SUCCESS,payload:res.data.data})
    }
  }
}

function* deleteAdmin(id){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/user/deleteadmin',{id})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* deleteAdminFlow(){
  while (true) {
    let req = yield take(Actions.DELETE_ADMIN)
    let res = yield call(deleteAdmin,req.id)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.DELETE_ADMIN_SUCCESS,payload:res.data.data})
    }
  }
}

function* getUser(){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.get,'/back/user/user')
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getUserFlow(){
  while (true) {
    yield take(Actions.GET_USER)
    let res = yield call(getUser)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.GET_USER_SUCCESS,payload:res.data.data})
    }
  }
}

export function* loginSaga(){
  yield all([
    fork(loginFlow),
    fork(getAllAdminFlow),
    fork(addAdminFlow),
    fork(deleteAdminFlow),
    fork(getUserFlow)
  ])
}
