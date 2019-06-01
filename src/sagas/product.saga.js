import {fork,all,put,call,take} from 'redux-saga/effects'
import axios from 'axios'
import {Helper} from '../actiontypes/helper.actions'
import {Actions} from '../actiontypes/actions'

function* getProduct(page,brand,word){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.get,`/back/products/getproducts?page=${page}&brand=${brand}&word=${word}`)
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getProductFlow(){
  while (true) {
    let req = yield take(Actions.GET_PRODUCT)
    let res = yield call(getProduct,req.page,req.brand,req.word)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.GET_PRODUCT_SUCCESS,payload:res.data.data})
    }
  }
}

function* getAllProducts(){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.get,`/back/products/getallproducts`)
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getAllProductsFlow(){
  while (true) {
    yield take(Actions.GET_ALL_PRODUCTS)
    let res = yield call(getAllProducts)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.GET_ALL_PRODUCTS_SUCCESS,payload:res.data.data})
    }
  }
}

function* getFrontProduct(brand){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.get,`/back/products/getfrontproducts?brand=${brand}`)
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getFrontProductFlow(){
  while (true) {
    let req = yield take(Actions.GET_FRONT_PRODUCT)
    let res = yield call(getFrontProduct,req.brand)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.GET_FRONT_PRODUCT_SUCCESS,payload:res.data.data})
    }
  }
}


function* addBrand(brand,enname,pic){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/products/addbrand',{brand,enname,pic})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}


function* getPage(brand){
  yield put({type:Helper.FETCH_START})
  try{
    const config = {
      headers:{
        "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }
    const data = `querytype=productname&pfid=&content=${brand}&dataPage=&allPage=&perPage=&allRows=&order=`
    let res = yield call(axios.post,`/province/webquery/wq.do?method=query`,data,config)
    let page = res.data.pageBean.allPage
    return page
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getList(brand,page){
  yield put({type:Helper.FETCH_START})
  try{
    let arr = []
    for(let i=0;i<page;i++){
      const config = {
        headers:{
          "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
      const data = `querytype=productname&pfid=&content=${brand}&dataPage=${i}&allPage=&perPage=&allRows=&order=`
      let res = yield call(axios.post,`/province/webquery/wq.do?method=query`,data,config)
      arr.push(...res.data.list)
    }
    return arr
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getDetail(list){
  yield put({type:Helper.FETCH_START})
  try{
    let arr = []
    for(let i=0;i<list.length;i++){
      const config = {
        headers:{
          "Content-Type": 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }
      const data = `method=show&id=${list[i].id}`
      let res = yield call(axios.post,`/province/webquery/wq.do`,data,config)
      arr.push(res.data)
    }
    return arr
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* save(products,id){
  yield put({type:Helper.FETCH_START})
  try {
    return yield call(axios.post,'/back/products/addproducts',{products,id})
  } catch (e) {
    console.log(e)
  } finally {
    yield put({type:Helper.FETCH_END})
  }
}

function* addBrandFlow(){
  while (true) {
    let req = yield take(Actions.ADD_BRAND)
    //增加品牌到数据库中
    let res = yield call(addBrand,req.brand,req.enname,req.pic)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.ADD_BRAND_SUCCESS,payload:res.data.data})
    }
    //获得返回的数据进行第二次请求,获取该品牌的页数
    let brand = res.data.data.name
    let res1 = yield call(getPage,brand)
    //第三次请求，根据获得的页数请求产品list清单
    let res2 = yield call(getList,brand,res1)
    //第三次请求，获取我们的具体的产品
    let res3 = yield call(getDetail,res2)
    //将请求的值存入数据库
    yield call(save,res3,res.data.data._id)
  }
}

function* getBrand(){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.get,'/back/products/getbrand')
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getBrandFlow(){
  while (true) {
    yield take(Actions.GET_BRAND)
    let res = yield call(getBrand)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.GET_BRAND_SUCCESS,payload:res.data.data})
    }
  }
}

function* deleteBrand(id){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/products/deletebrand',{id})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* deleteBrandFlow(){
  while (true) {
    let req = yield take(Actions.DELETE_BRAND)
    let res = yield call(deleteBrand,req.id)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.DELETE_BRAND_SUCCESS,payload:res.data.data})
    }
  }
}

function* show(id){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/products/isshow',{id})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* showFlow(){
  while (true) {
    let req = yield take(Actions.SHOW_NOSHOW)
    let res = yield call(show,req.id)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.SHOW_NOSHOW_SUCCESS,payload:res.data.data})
    }
  }
}

function* uploadpic(pic,id,brand,val){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.post,'/back/products/uploadpic',{pic,id,brand,val})
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* uploadpicFlow(){
  while (true) {
    let req = yield take(Actions.UPLOAD_PIC)
    let res = yield call(uploadpic,req.pic,req.id,req.brand,req.val)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.UPLOAD_PIC_SUCCESS,payload:res.data.data})
    }
  }
}

function* getProductDetail(id){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.get,`/back/products/detail?id=${id}`)
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getDetailFlow(){
  while (true) {
    let req = yield take(Actions.GET_DETAIL)
    let res = yield call(getProductDetail,req.id)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.GET_DETAIL_SUCCESS,payload:res.data.data})
    }
  }
}

function* getPkProductDetail(name){
  yield put({type:Helper.FETCH_START})
  try{
    return yield call(axios.get,`/back/products/pkdetail?name=${name}`)
  }catch(err){
    console.log(err)
  }finally{
    yield put({type:Helper.FETCH_END})
  }
}

function* getPkDetailFlow(){
  while (true) {
    let req = yield take(Actions.GET_PK_DETAIL)
    let res = yield call(getPkProductDetail,req.name)
    if(res.data && res.data.code === 0){
      yield put({type:Actions.GET_PK_DETAIL_SUCCESS,payload:res.data.data})
    }
  }
}

export function* actionSaga(){
  yield all([
    fork(getProductFlow),
    fork(getAllProductsFlow),
    fork(getFrontProductFlow),
    fork(addBrandFlow),
    fork(getBrandFlow),
    fork(deleteBrandFlow),
    fork(showFlow),
    fork(uploadpicFlow),
    fork(getDetailFlow),
    fork(getPkDetailFlow)
  ])
}
