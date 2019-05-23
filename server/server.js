const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const compression = require('compression')
const Product = require('./schemas/product.schemas')
const Ingredient = require('./schemas/ingredient.schemas')

app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true,parameterLimit:50000}))
app.use(compression())

app.post('/addingredients',function(req,res){
  let {name,enname,category,url,infor,iupac,pic} = req.body
  Ingredient.find({'name':name},function(err,doc){
    if(doc.length === 0){
      let ingre = new Ingredient({name,enname,category,url,infor,iupac,pic})
      ingre.save().then(function(ingre){
        console.log(ingre)
        res.json({'code':0,'msg':"新增成功"})
      })
    }else{
      res.json({'code':1,'msg':"存在该成分了"})
    }
  })
})

app.post('/products',function(req,res){
  let {brand} = req.body

})


//connect to mongodb
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/product', {useNewUrlParser: true})
mongoose.connection.on('connected',() => console.log('mongodb is now connected'))

const PORT =process.env.PORT || 9090
app.listen(PORT,() => console.log(`we are now listening to ${PORT}`))
