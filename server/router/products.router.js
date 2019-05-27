const express = require('express')
const Router = express.Router()
const Product = require('../schemas/product.schemas')
const Brand = require('../schemas/brand.schemas')

Router.post('/addbrand',function(req,res){
  let {brand,enname,pic,deleteurl} = req.body
  Brand.find({'name':brand},function(err,doc){
    if(doc.length === 0){
      let ingre = new Brand({"name":brand,enname,pic,deleteurl})
      ingre.save().then(function(ingre){
        res.json({code:0,data:ingre})
      })
    }else{
      res.json({code:1,msg:"存在该成分了"})
    }
  })
})

Router.get('/getbrand',function(req,res){
  Brand.find({},function(err,doc){
      res.json({code:0,data:doc})
  })
})

Router.post('/deletebrand',function(req,res){
  let {id} = req.body
  Brand.deleteOne({'_id':id},function(err,doc){
    Brand.find({},function(e,d){
        res.json({code:0,data:d})
    })
  })
})

module.exports = Router
