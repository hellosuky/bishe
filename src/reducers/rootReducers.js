import {combineReducers} from 'redux'
import {globalMsg} from './global.redux'
import {products} from './product.redux'
import {ingredients} from './ingredient.redux'

export default combineReducers({
  globalMsg,
  products,
  ingredients
})
