import {Actions} from '../actiontypes/theory.actions.js'

const initalState = {
  theory:[],
  article:{}
}

export function theory(state = initalState,action){
  switch(action.type){
    case Actions.ADD_THEORY_SUCCESS:
      return {...state}
    case Actions.GET_THEORY_SUCCESS:
      return {...state,theory:action.payload}
    case Actions.GET_SEARCH_THEORY_SUCCESS:
      return {...state,theory:action.payload}
    case Actions.GET_SPECIAL_THEORY_SUCCESS:
      return {...state,article:action.payload}
    case Actions.EDIT_THEORY_SUCCESS:
      return {...state,theory:action.payload}
    case Actions.DELETE_THEORY_SUCCESS:
      return {...state,theory:action.payload}
    default:
      return state
  }
}

//add theory
export function addTheory(title,content,cover){
  return ({
    type:Actions.ADD_THEORY,
    title,
    content,
    cover
  })
}

//get theory
export function getTheory(){
  return ({
    type:Actions.GET_THEORY
  })
}

export function getSearchTheory(word){
  return ({
    type:Actions.GET_SEARCH_THEORY,
    word
  })
}

export function getSpecialTheory(id){
  return ({
    type:Actions.GET_SPECIAL_THEORY,
    id
  })
}

//DELETE theory
export function deleteTheory(id){
  return ({
    type:Actions.DELETE_THEORY,
    id
  })
}

//edit theory
export function editTheory(id,title,content,cover){
  return ({
    type:Actions.EDIT_THEORY,
    id,
    title,
    content,
    cover
  })
}
