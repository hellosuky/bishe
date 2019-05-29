const express = require('express')
const axios = require('axios')
const Router = express.Router()
const Product = require('../schemas/product.schemas')
const Brand = require('../schemas/brand.schemas')
const Ingredient = require('../schemas/ingredient.schemas')

Router.get('/getproducts',function(req,res){
    let {page} = req.query
    Product.find({})
    .limit(10)
    .skip(10* (page-1))
    .exec(function(err,results){
      if(err){
        res.json({code:1,msg:'服务端出错'})
        return
      }
      res.json({code:0,data:results})
    })
})

Router.post('/isshow',function(req,res){
  let {id} = req.body
  Product.findOne({'_id':id})
  .then(one=> {return one.show})
  .then(show =>{ return !show})
  .then(nowshow=>{return Product.updateOne({'_id':id},{'show':nowshow})})
  .then(()=> {return Product.find({}).limit(10)})
  .then(all=>res.json({code:0,data:all}))
  .catch(err=>console.log(err))
})

Router.post('/addbrand',function(req,res){
  let {brand,enname,pic} = req.body
  //添加后要查找我们的一个产品
  Brand.find({'name':brand})
  .then(doc=>{
    if(doc.length === 0){
      let ingre = new Brand({"name":brand,enname,pic})
      return ingre.save()
    }else{
      res.json({code:1,msg:"存在该成分了"})
    }
  }).then((ingre)=>{
    //ingre 是保存的新品牌
    res.json({code:0,data:ingre})
  })
  .catch(err=>console.log(err))
  // 利用正则表达式
})

function addNewProduct(product){
  let arr = product.cf.split("、")
  let promises = arr.map(item => Ingredient.findOne({'name':item}))
  Promise.all(promises)
  .then(one => {

  })
}

Router.post('/addproducts',async function(req,res){
  let {products,id} = req.body
  for(let i=0;i<products.length;i++){
    //挨个顺序执行
    await addNewProduct(products[i])
  }
})

Router.get('/getbrand',function(req,res){
  Brand.find({},function(err,doc){
      res.json({code:0,data:doc})
  })
})

Router.post('/deletebrand',function(req,res){
  let {id} = req.body
  //delete brand 也需要将所有brand删除
  //同时删除连接
  Product.deleteMany({'brand':id})
  .then(()=>{
    return Brand.deleteOne({'_id':id})
  }).then(()=>{
    return Brand.find({})
  }).then(all=>{
    res.json({code:0,data:all})
  })
  .catch(err=>console.log(err))
})

module.exports = Router
