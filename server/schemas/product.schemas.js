const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema =  new Schema({
  name:{type:mongoose.Schema.ObjectId,ref:'brand'},
  brand:{type:String,required:true},
  base:{type:Array,required:true},
  Ingredient:[{type:mongoose.Schema.ObjectId,ref:'Ingredient'}],
  show:{type:Boolean,default:false},
  pic:{type:String,required:true},
  deleteurl:{type:String,required:true}
})

module.exports = mongoose.model('Product',ProductSchema)
