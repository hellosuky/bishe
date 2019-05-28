const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IngredientSchema =  new Schema({
  name:{type:String,required:true},
  category:{type:mongoose.Schema.ObjectId,ref:'Category'},
  url:{type:String,required:true},
  infor:{type:String,required:true},
  enname:{type:String,required:true},
  iupac:{type:String,required:true},
  pic:{type:String,required:true}
})

module.exports = mongoose.model('Ingredient',IngredientSchema)
