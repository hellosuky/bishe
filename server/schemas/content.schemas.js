const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContentSchema =  new Schema({
  title:{type:String,required:true},
  cover:{type:String,required:true},
  content:{type:String,required:true}
})

module.exports = mongoose.model('Content',ContentSchema)
