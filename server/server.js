const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const compression = require('compression')
const Product = require('./schemas/product.schemas')
const Ingredient = require('./schemas/ingredient.schemas')
const Category = require('./schemas/category.schemas')
const Brand = require('./schemas/brand.schemas')

app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true,parameterLimit:50000}))
app.use(compression())

app.post('/back/addingredients',function(req,res){
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

app.post('/back/deleteingredients',function(req,res){
  let {id} = req.body
  Ingredient.deleteOne({'_id':id},function(err,doc){
    Ingredient.find({})
    .limit(10)
    .exec(function(err,results){
      res.json({code:0,data:results})
    })
  })
})

app.get('/back/getingredients',function(req,res){
  let {page} = req.query
  Ingredient.find({})
  .limit(10)
  .skip(10 * (page -1 ))
  .exec(function(err,results){
    res.json({code:0,data:results})
  })
})

app.post('/back/addbrand',function(req,res){
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

app.get('/back/getbrand',function(req,res){
  Brand.find({},function(err,doc){
      res.json({code:0,data:doc})
  })
})

app.post('/back/deletebrand',function(req,res){
  let {id} = req.body
  Brand.deleteOne({'_id':id},function(err,doc){
    Brand.find({},function(e,d){
        res.json({code:0,data:d})
    })
  })
})

app.post('/back/addcategory',function(req,res){
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

app.post('/back/deletecategory',function(req,res){
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

app.get('/back/getcategory',function(req,res){
  Category.find({},function(err,doc){
    res.json({code:0,data:doc})
  })
})


//connect to mongodb
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/product', {useNewUrlParser: true})
mongoose.connection.on('connected',() => console.log('mongodb is now connected'))

const PORT =process.env.PORT || 9090
app.listen(PORT,() => console.log(`we are now listening to ${PORT}`))
