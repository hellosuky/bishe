const express = require('express')
const Router = express.Router()
const axios = require('axios')
const Ingredient = require('../schemas/ingredient.schemas')
const Category = require('../schemas/category.schemas')
const Product = require('../schemas/product.schemas')

Router.post('/addingredients',function(req,res){
  let {name,enname,category,url,infor,iupac,pic} = req.body
  Ingredient.find({'name':name},function(err,doc){
    if(doc.length === 0){
      let ingre = new Ingredient({name,enname,category,url,infor,iupac,pic})
      ingre.save().then(function(results){
        Product.updateMany({base:{$in:name}},
        {
          $pull:{base:name},
          $push:{Ingredient:results._id}
        })
          .then(()=>{
            res.json({code:0,msg:'新增成功'})
          })
        })
    }else{
      res.json({code:1,msg:"存在该成分了"})
    }
  })
})

//ingredient 应该在name发生改变时，才会影响到products
Router.post('/updateingredient',function(req,res){
  let {id,name,enname,category,url,infor,iupac,pic} = req.body
  Ingredient.updateOne({'_id':id},{name,enname,category,url,infor,iupac,pic})
  .then(results => {
    res.json({code:0,msg:'成功更新'})
  })
})

Router.post('/deleteingredients',function(req,res){
  let {id} = req.body
  Ingredient.findOne({'_id':id})
  .then(results =>{
    return Product.updateMany({Ingredient:{$in:id}},
      {
        $pull:{Ingredient:id},
        $push:{base:results.name}
      })
  }).then(()=>{
    return Ingredient.deleteOne({'_id':id})
  }).then((del) =>{
    Ingredient.find({})
    .limit(10)
    .exec(function(err,results){
      res.json({code:0,data:results})
    })
  }).catch(err=>console.log(err))

})

Router.get('/getingredients',function(req,res){
  let {page,category,word} = req.query
  if(word === ''){
    if(category===""){
      Ingredient.find({})
      .populate({path:'category',select:'name'})
      .limit(8)
      .skip(8 * (page -1 ))
      .exec(function(err,results){
        res.json({code:0,data:results})
      })
    }else{
      Ingredient.find({'category':category})
      .populate({path:'category',select:'name'})
      .limit(8)
      .skip(8 * (page -1 ))
      .exec(function(err,results){
        res.json({code:0,data:results})
      })
    }
  }else{
    if(category===""){
      Ingredient.find({'name':new RegExp(word)})
      .populate({path:'category',select:'name'})
      .limit(8)
      .skip(8 * (page -1 ))
      .exec(function(err,results){
        res.json({code:0,data:results})
      })
    }else{
      Ingredient.find({'category':category,'name':new RegExp(word)})
      .populate({path:'category',select:'name'})
      .limit(8)
      .skip(8 * (page -1 ))
      .exec(function(err,results){
        res.json({code:0,data:results})
      })
    }
  }
})

Router.get('/getspecialingredient',function(req,res){
  let {id} = req.query
  Ingredient.findOne({'_id':id})
  .populate({path:'category',select:'name'})
  .exec(function(err,results){
    res.json({code:0,data:results})
  })
})

Router.post('/addcategory',function(req,res){
  let {name} = req.body
  Category.find({'name':name},function(err,doc){
    if(doc.length === 0){
      let newcategory = new Category({name})
      newcategory.save().then(function(ingre){
          res.json({code:0,data:ingre})
      })
    }else{
      res.json({'code':1,'msg':"存在该分类"})
    }
  })
})

// 删除分类应该把相应的有效成分也删除
Router.post('/deletecategory',function(req,res){
  let {id} = req.body
  Ingredient.deleteMany({'category':id})
  .then(()=>{
    return Category.deleteOne({'_id':id})
  }).then(()=>{
    return Category.find({})
  }).then(all=>res.json({code:0,data:all}))
  .catch(err=>console.log(err))
})

Router.get('/getcategory',function(req,res){
  Category.find({},function(err,doc){
    res.json({code:0,data:doc})
  })
})


module.exports = Router
