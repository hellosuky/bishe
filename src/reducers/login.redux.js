import {Actions} from '../actiontypes/login.actions.js'

const initalState = {
  isLogin:false,
  admin:[]
}

export function loginReducers(state = initalState,action){
  switch(action.type){
    case Actions.LOGIN_SUCCESS:
      return {...state,isLogin:action.payload}
    case Actions.GET_ALL_ADMIN_SUCCESS:
      return {...state,admin:action.payload}
    case Actions.ADD_ADMIN_SUCCESS:
      return {...state,admin:[...state.admin,action.payload]}
    case Actions.DELETE_ADMIN_SUCCESS:
      return {...state,admin:action.payload}
    default:
      return state
  }
}

//check isLogin
export function login(user,pwd){
  return ({
    type:Actions.LOGIN,
    user,
    pwd
  })
}

//get all admin
export function getAllAdmin(){
  return ({
    type:Actions.GET_ALL_ADMIN
  })
}

//add admin
export function addAdmin(user,pwd){
  return ({
    type:Actions.ADD_ADMIN,
    user,
    pwd
  })
}

//delete admin
export function deleteAdmin(id){
  return ({
    type:Actions.DELETE_ADMIN,
    id
  })
}
