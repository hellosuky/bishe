const express = require('express')
const Router = express.Router()
const Content = require('../schemas/content.schemas')

Router.post('/addtheory',function(req,res){
  let {title,content,cover} = req.body
  let article = new Content({title,content,cover})
  article.save().then(function(article){
    res.json({code:0})
  })
})

Router.get('/gettheory',function(req,res){
  let {page} = req.query
  Content.find({})
  .exec(function(err,results){
    res.json({code:0,data:results})
  })
})

Router.post('/getspecialtheory',function(req,res){
  let {id} = req.body
  Content.findOne({'_id':id})
  .exec(function(err,results){
    res.json({code:0,data:results})
  })
})

Router.get('/getsearchtheory',function(req,res){
  let {word} = req.query
  Content.find({'title':new RegExp(word)})
  .exec(function(err,results){
    res.json({code:0,data:results})
  })
})

Router.post('/deletetheory',function(req,res){
  let {id} = req.body
  Content.deleteOne({'_id':id})
  .then(()=>{
    Content.find({})
    .exec(function(err,results){
      res.json({code:0,data:results})
    })
  })
})

Router.post('/edittheory',function(req,res){
  let {id,title,content,cover} = req.body
  Content.updateOne({'_id':id},{title,content,cover})
  .then(()=>{
    Content.find({})
    .exec(function(err,results){
      res.json({code:0,data:results})
    })
  })
})

module.exports = Router
