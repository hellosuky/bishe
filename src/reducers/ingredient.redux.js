import {Actions} from '../actiontypes/ingredient.actions.js'

const initalState = {
  msg:''
}

export function ingredients(state = initalState,action){
  switch(action.type){
    case Actions.ADD_INGREDIENTS_SUCCESS:
      return {...state,msg:action.payload}
    default:
      return state
  }
}

//get products
export function addIngredient(name,category,url,infor,enname,iupac,pic){
  return ({
    type:Actions.ADD_INGREDIENTS,
    name,
    category,
    url,
    infor,
    enname,
    iupac,
    pic
  })
}
