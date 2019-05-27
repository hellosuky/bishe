const express = require('express')
const Router = express.Router()
const axios = require('axios')
const Ingredient = require('../schemas/ingredient.schemas')
const Category = require('../schemas/category.schemas')

Router.post('/addingredients',function(req,res){
  let {name,enname,category,url,infor,iupac,pic,deleteurl} = req.body
  Ingredient.find({'name':name},function(err,doc){
    if(doc.length === 0){
      let ingre = new Ingredient({name,enname,category,url,infor,iupac,pic,deleteurl})
      ingre.save().then(function(ingre){
        res.json({code:0,msg:'新增成功'})
      })
    }else{
      res.json({code:1,msg:"存在该成分了"})
    }
  })
})

Router.post('/updateingredient',function(req,res){
  let {id,name,enname,category,url,infor,iupac,pic,deleteurl} = req.body
  Ingredient.updateOne({'_id':id},{name,enname,category,url,infor,iupac,pic,deleteurl})
  .then(results => {
    res.json({code:0,msg:'成功更新'})
  })
})

Router.post('/deleteingredients',function(req,res){
  let {id} = req.body
  Ingredient.findOne({'_id':id})
  .then((ingre) => {
    axios.get(ingre.deleteurl)
    return ingre._id
  }).then((id)=>{
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
  let {page} = req.query
  Ingredient.find({})
  .populate({path:'category',select:'name'})
  .limit(10)
  .skip(10 * (page -1 ))
  .exec(function(err,results){
    res.json({code:0,data:results})
  })
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

Router.post('/deletecategory',function(req,res){
  let {id} = req.body
  Category.deleteOne({'_id':id},function(err,doc){
    Category.find({},function(e,d){
      if(e){
        res.json({code:1,msg:'服务端出错'})
      }else{
        res.json({code:0,data:d})
      }
    })
  })
})

Router.get('/getcategory',function(req,res){
  Category.find({},function(err,doc){
    res.json({code:0,data:doc})
  })
})


module.exports = Router
