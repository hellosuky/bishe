import {Actions} from '../actiontypes/actions.js'

const initalState = {
  products:[],
  brands:[]
}

export function products(state = initalState,action){
  switch(action.type){
    case Actions.GET_PRODUCT_SUCCESS:
      return {...state,products:action.payload}
    case Actions.GET_BRAND_SUCCESS:
      return {...state,brands:action.payload}
    case Actions.DELETE_BRAND_SUCCESS:
      return {...state,brands:action.payload}
    case Actions.SHOW_NOSHOW_SUCCESS:
      return {...state,products:action.payload}
    case Actions.ADD_BRAND_SUCCESS:
      return {...state,brands:[...state.brands,action.payload]}
    default:
      return state
  }
}

//get brand
export function getBrand(){
  return ({
    type:Actions.GET_BRAND
  })
}

//add brand
export function addBrand(brand,enname,pic){
  return ({
    type:Actions.ADD_BRAND,
    brand,
    enname,
    pic
  })
}

//delete brand
export function deleteBrand(id){
  return ({
    type:Actions.DELETE_BRAND,
    id
  })
}

//get products
export function getProducts(page,brand){
  return ({
    type:Actions.GET_PRODUCT,
    page,
    brand
  })
}

//show boolean
export function show(id){
  return ({
    type:Actions.SHOW_NOSHOW,
    id
  })
}
