import {Actions} from '../actiontypes/actions.js'

const initalState = {
  products:[],
  brands:[],
  detail:{},
  allProducts:[],
  pkdetail:{},
  most:[],
  process:''
}

export function products(state = initalState,action){
  switch(action.type){
    case Actions.GET_PRODUCT_SUCCESS:
      return {...state,products:action.payload}
    case Actions.GET_ALL_PRODUCTS_SUCCESS:
      return {...state,allProducts:action.payload}
    case Actions.GET_FRONT_PRODUCT_SUCCESS:
      return {...state,products:action.payload}
    case Actions.GET_MOST_SUCCESS:
      return {...state,most:action.payload}
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
    case Actions.GET_PK_DETAIL_SUCCESS:
      return {...state,pkdetail:action.payload}
    case Actions.ADD_BRAND_SUCCESS:
      return {...state,brands:[...state.brands,action.payload]}
    case Actions.LOADING_START:
      return {...state,process:action.payload}
    case Actions.LOADING_FINISH:
      return {...state,process:''}
    case Actions.UPDATE_PRODUCTS:
      return {...state}
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
export function getProducts(page,brand,word){
  return ({
    type:Actions.GET_PRODUCT,
    page,
    brand,
    word
  })
}

export function getFrontProducts(brand){
  return ({
    type:Actions.GET_FRONT_PRODUCT,
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
export function uploadpic(pic,id,brand,val){
  return ({
    type:Actions.UPLOAD_PIC,
    pic,
    id,
    brand,
    val
  })
}

//get detail
export function getDetail(id){
  return ({
    type:Actions.GET_DETAIL,
    id
  })
}

//get all products
export function getAllProducts(){
  return ({
    type:Actions.GET_ALL_PRODUCTS
  })
}

//get pk detail
export function getPkDetail(name){
  return ({
    type:Actions.GET_PK_DETAIL,
    name
  })
}

export function getMost(id){
  return ({
    type:Actions.GET_MOST,
    id
  })
}

export function updateProducts(id){
  return ({
    type:Actions.UPDATE_PRODUCTS,
    id
  })
}
