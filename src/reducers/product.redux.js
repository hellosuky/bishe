import {Actions} from '../actiontypes/actions.js'

const initalState = {
  products:[]
}

export function products(state = initalState,action){
  switch(action.type){
    case Actions.GET_PRODUCT:
      return {...state,products:action.payload}
    default:
      return state
  }
}

//get products
export function getProducts(brand){
  return ({
    type:Actions.GET_PRODUCT,
    brand
  })
}
