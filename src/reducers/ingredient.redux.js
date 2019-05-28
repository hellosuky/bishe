import {Actions} from '../actiontypes/ingredient.actions.js'

const initalState = {
  category:[],
  ingredients:[],
  ingredient:{}
}

export function ingredients(state = initalState,action){
  switch(action.type){
    case Actions.ADD_INGREDIENTS_SUCCESS:
      return {...state}
    case Actions.GET_INGREDIENTS_SUCCESS:
      return {...state,ingredients:action.payload}
    case Actions.DELETE_INGREDIENTS_SUCCESS:
        return {...state,ingredients:action.payload}
    case Actions.GET_SPECIAL_INGREDIENT_SUCCESS:
        return {...state,ingredient:action.payload}
    case Actions.UPDATE_INGREDIENT_SUCCESS:
        return {...state}
    case Actions.ADD_CATEGORY_SUCCESS:
      return {...state,category:[...state.category,action.payload]}
    case Actions.GET_CATEGORY_SUCCESS:
      return {...state,category:action.payload}
    case Actions.DELETE_CATEGORY_SUCCESS:
      return {...state,category:action.payload}
    default:
      return state
  }
}

//ADD ingredient
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

//get ingredients
export function getIngredient(page){
  return ({
    type:Actions.GET_INGREDIENTS,
    page
  })
}

//delete ingredient
export function deleteIngredient(id){
  return ({
    type:Actions.DELETE_INGREDIENTS,
    id
  })
}

//get special ingredient
export function getSpecialIngredient(id){
  return ({
    type:Actions.GET_SPECIAL_INGREDIENT,
    id
  })
}

//update ingredient
export function updateIngredient(id,name,category,url,infor,enname,iupac,pic){
  return ({
    type:Actions.UPDATE_INGREDIENT,
    id,
    name,
    category,
    url,
    infor,
    enname,
    iupac,
    pic
  })
}

//get all category
export function getCategory(){
  return ({
    type:Actions.GET_CATEGORY
  })
}

//add category
export function addCategory(category){
  return ({
    type:Actions.ADD_CATEGORY,
    category
  })
}

//delete Category
export function deleteCategory(id){
  return ({
    type:Actions.DELETE_CATEGORY,
    id
  })
}
