const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema =  new Schema({
  name:{type:String,required:true},
  brand:{type:String,required:true},
  base:{type:Array,required:true},
  Ingredient:[{type:mongoose.Schema.ObjectId,ref:'Ingredient'}]
})

module.exports = mongoose.model('Product',ProductSchema)
