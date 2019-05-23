import {fork,all} from 'redux-saga/effects'
import {actionSaga} from './product.saga'
import {ingredientSaga} from './ingredients.saga'

export default function* rootSaga(){
  yield all([
    fork(actionSaga),
    fork(ingredientSaga)
  ])
}
