import {fork,all,put,call,take,select} from 'redux-saga/effects'
import axios from 'axios'
import {Actions} from '../actiontypes/actions'

function* addBlog(title,content,selectedTags,url,isPublish){
  yield put({type:GlobalActions.FETCH_START})
  try{
    return yield call(axios.post,'/api/blog/addblog',{title,content,selectedTags,url,isPublish})
  }catch(err){
    yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:'客户端出错啦'})
  }finally{
    yield put({type:GlobalActions.FETCH_END})
  }
}

function* addBlogFlow(){
  while (true) {
    let req = yield take(BlogActions.ADD_NEW_BLOG)
    let res = yield call(addBlog,req.title,req.content,req.selectedTags,req.url,req.isPublish)
    if(res.data && res.data.code === 0){
      yield put({type:BlogActions.ADD_NEW_BLOG_SUCCESS})
      yield put({type:GlobalActions.MSG_RETURN,msgType:0,msgContent:res.data.msg})
    }else{
      yield put({type:GlobalActions.MSG_RETURN,msgType:1,msgContent:res.data.msg})
    }
  }
}


export function* blogSaga(){
  yield all([
    fork(addBlogFlow),
  ])
}
