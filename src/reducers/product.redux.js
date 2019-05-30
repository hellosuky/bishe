import {Actions} from '../actiontypes/actions.js'

const initalState = {
  products:[],
  brands:[],
  detail:{}
}

export function products(state = initalState,action){
  switch(action.type){
    case Actions.GET_PRODUCT_SUCCESS:
      return {...state,products:action.payload}
    case Actions.GET_FRONT_PRODUCTS_SUCCESS:
      return {...state,products:action.payload}
    case Actions.GET_BRAND_SUCCESS:
      return {...state,brands:action.payload}
    case Actions.DELETE_BRAND_SUCCESS:
      return {...state,brands:action.payload}
    case Actions.SHOW_NOSHOW_SUCCESS:
      return {...state,products:action.payload}
    case Actions.UPLOAD_PIC_SUCCESS:
      return {...state,products:action.payload}
    case Actions.GET_DETAIL_SUCCESS:
      return {...state,detail:action.payload}
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

//upload product picture
export function uploadpic(pic,id){
  return ({
    type:Actions.UPLOAD_PIC,
    pic,
    id
  })
}

//get detail
export function getDetail(id){
  return ({
    type:Actions.GET_DETAIL,
    id
  })
}

export function getFrontProducts(page,brand){
  return ({
    type:Actions.GET_FRONT_PRODUCTS,
    page,
    brand
  })
}
