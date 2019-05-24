const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BrandSchema =  new Schema({
  name:{type:String,required:true},
  pic:{type:String,required:true},
  enname:{type:String,required:true},
  deleteurl:{type:String,required:true}
})

module.exports = mongoose.model('Brand',BrandSchema)
