const express = require('express')
const axios = require('axios')
const Router = express.Router()
const Product = require('../schemas/product.schemas')
const Brand = require('../schemas/brand.schemas')
const Ingredient = require('../schemas/ingredient.schemas')

Router.get('/getproducts',function(req,res){
    let {page,brand,word} = req.query
    if(word === ""){
      if(brand !== ''){
        Product.find({'brand':brand})
        .populate({path:'brand', select: 'name'})
        .populate({path:'Ingredient',select:'name'})
        .limit(8)
        .skip(8* (page-1))
        .exec(function(err,results){
          if(err){
            res.json({code:1,msg:'服务端出错'})
            return
          }
          res.json({code:0,data:results})
        })
      }else{
        Product.find({})
        .populate({path:'brand',select:'name'})
        .populate({path:'Ingredient',select:'name'})
        .limit(8)
        .skip(8* (page-1))
        .exec(function(err,results){
          if(err){
            res.json({code:1,msg:'服务端出错'})
            return
          }
          res.json({code:0,data:results})
        })
      }
    }else{
      if(brand !== ''){
        Product.find({'name':new RegExp(word),'brand':brand})
        .populate({path:'brand', select: 'name'})
        .populate({path:'Ingredient',select:'name'})
        .limit(8)
        .skip(8* (page-1))
        .exec(function(err,results){
          if(err){
            res.json({code:1,msg:'服务端出错'})
            return
          }
          res.json({code:0,data:results})
        })
      }else{
        Product.find({'name':new RegExp(word)})
        .populate({path:'brand',select:'name'})
        .populate({path:'Ingredient',select:'name'})
        .limit(8)
        .skip(8* (page-1))
        .exec(function(err,results){
          if(err){
            res.json({code:1,msg:'服务端出错'})
            return
          }
          res.json({code:0,data:results})
        })
      }
    }
})

Router.get('/getallproducts',function(req,res){
  Product.aggregate([
    {
      $match:{
        show:true
      }
    },
    {
      $lookup:{
        from:'brands',
        localField:'brand',
        foreignField:'_id',
        as:'Brand'
      }},
      {$group:{
        _id:'$Brand.name',
        "children":{$push:{'value':'$name','label':'$name'}},
      }},
  ],function(err,results){
    let arr = []
    results.map(item=>{
      let obj = {}
      obj.value = item._id[0]
      obj.label = item._id[0]
      obj.children = item.children
      arr.push(obj)
    })
    res.json({code:0,data:arr})
  })
})

Router.get('/getfrontproducts',function(req,res){
    let {brand} = req.query
      Product.find({'brand':brand,'show':true})
      .populate({path:'brand',select:'name'})
      .populate({path:'Ingredient',select:'name'})
      .exec(function(err,results){
        if(err){
          res.json({code:1,msg:'服务端出错'})
          return
        }
        res.json({code:0,data:results})
      })
})

Router.get('/getsearchproducts',function(req,res){
    let {word,page} = req.query
      Product.find({'name':new RegExp(word)})
      .populate({path:'brand',select:'name'})
      .populate({path:'Ingredient',select:'name'})
      .limit(8)
      .skip(8* (page-1))
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
  .then(one=> {
    return !one.show
  })
  .then(nowshow=>{
    return Product.updateOne({'_id':id},{'show':nowshow})})
  .then(()=> {
    Product.find({})
    .populate({path:'brand',select:'name'})
    .populate({path:'Ingredient',select:'name'})
    .limit(8)
    .exec(function(err,results){
      res.json({code:0,data:results})
    })
  })
  .catch(err=>console.log(err))
})

Router.post('/uploadpic',function(req,res){
  let {pic,id,brand,val} = req.body
  Product.updateOne({'_id':id},{pic})
  .then(()=> {
    if(brand){
      if(val){
        Product.find({'brand':brand,'name':new RegExp(val)})
        .populate({path:'brand',select:'name'})
        .populate({path:'Ingredient',select:'name'})
        .limit(8)
        .exec(function(err,results){
          res.json({code:0,data:results})
        })
    }else{
      Product.find({'brand':brand})
      .populate({path:'brand',select:'name'})
      .populate({path:'Ingredient',select:'name'})
      .limit(8)
      .exec(function(err,results){
        res.json({code:0,data:results})
      })
    }
  }else{
    if(val){
      Product.find({'name':new RegExp(val)})
      .populate({path:'brand',select:'name'})
      .populate({path:'Ingredient',select:'name'})
      .limit(8)
      .exec(function(err,results){
        res.json({code:0,data:results})
      })
    }else{
      Product.find({})
      .populate({path:'brand',select:'name'})
      .populate({path:'Ingredient',select:'name'})
      .limit(8)
      .exec(function(err,results){
        res.json({code:0,data:results})
      })
    }
  }
  })
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

function exists(item){
  return Ingredient.findOne({'name':item})
}
//分类
function classification(arr,productname,id){
  let base = []
  let ingredient = []
  let promises = arr.map(item => exists(item))
  Promise.all(promises)
  .then(all=>{
    for(let i =0;i<all.length;i++){
      if(all[i]){
        ingredient.push(all[i]._id)
      }else{
        base.push(arr[i])
      }
    }
    return new Promise((resolve,reject)=>{
      let obj = {'base':base,'Ingredient':ingredient}
      resolve(obj)
    })
  }).then(obj=>{
    let newproduct = new Product({'name':productname,'brand':id,'base':obj.base,'Ingredient':obj.Ingredient})
    newproduct.save()
  })
}

//分成数组
function addNewProduct(product){
  return product.cf.split("、")
}

Router.post('/addproducts',async function(req,res){
  let {products,id} = req.body
  for(let i=0;i<products.length;i++){
    //挨个顺序执行
    let arr = await addNewProduct(products[i])
    //传入函数中进行分类
    classification(arr,products[i].productname,id)
    //保存值到数据库
  }
  res.json({code:0})
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

Router.get('/detail',function(req,res){
  let {id} = req.query
  Product.findOne({"_id":id})
  .populate({path:'brand', select: 'name'})
  .populate({path:'Ingredient',select:'name'})
  .exec(function(err,results){
    if(err){
      res.json({code:1,msg:'服务端出错'})
      return
    }
    res.json({code:0,data:results})
  })
})

Router.get('/pkdetail',function(req,res){
  let {name} = req.query
  Product.findOne({"name":name})
  .populate({path:'brand', select: 'name'})
  .populate({path:'Ingredient',select:'name'})
  .exec(function(err,results){
    if(err){
      res.json({code:1,msg:'服务端出错'})
      return
    }
    res.json({code:0,data:results})
  })
})

Router.get('/getmost',function(req,res){
  let {id} = req.query
  Product.findOne({'_id':id})
  .then(product=>{
    return Product.aggregate([
      {
        $match:{
          brand:product.brand
        }
      },
      {
        $unwind:'$Ingredient'
      },
      {
        $lookup:{
          from:'ingredients',
          localField:'Ingredient',
          foreignField:'_id',
          as:'ingredient'
        }
      },
      {
        $group:{
          _id:'$ingredient.name',
          num:{$sum:1}
        }
      },
      {
        $sort:{num:-1}
      }
    ])
  }).then(results=>{
    res.json({code:0,data:results})
  })
})

Router.post('/deleteproducts',function(req,res){
  let {id} = req.body
  Product.deleteMany({'brand':id})
  .then(()=>{
      return Brand.findOne({'_id':id})
  }).then(results=>{
    res.json({code:0,data:results})
  })
})

module.exports = Router
