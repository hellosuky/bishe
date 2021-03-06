import {fork,all} from 'redux-saga/effects'
import {actionSaga} from './product.saga'
import {ingredientSaga} from './ingredients.saga'
import {loginSaga} from './login.saga'
import {theorySaga} from './theory.saga'

export default function* rootSaga(){
  yield all([
    fork(actionSaga),
    fork(ingredientSaga),
    fork(loginSaga),
    fork(theorySaga)
  ])
}
