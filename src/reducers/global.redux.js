import {Actions} from '../actiontypes/actions.js'

const initalState = {
  isLoading:false
}

export function globalMsg(state = initalState,action){
  switch(action.type){
    case Actions.FETCH_START:
      return {...state,isLoading:true}
    case Actions.FETCH_END:
      return {...state,isLoading:false}
    default:
      return state
  }
}
