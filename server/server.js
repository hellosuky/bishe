const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const proxy = require('http-proxy-middleware')
const compression = require('compression')
const UserRouter = require('./router/user.router')
const IngredientRouter = require('./router/ingredient.router')
const ProductRouter = require('./router/products.router')
const TheoryRouter = require('./router/theory.router')
const UploadRouter = require('./router/upload.router')

app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true,parameterLimit:50000}))
app.use(compression())

// app.use('/province/**',proxy({target:'http://cpnp.nmpa.gov.cn',changeOrigin:true}))
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//   res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//
//   if (req.method == 'OPTIONS') {
//     res.send(200); /*让options请求快速返回*/
//   } else {
//     next();
//   }
// })


//router manager
app.use('/back/user',UserRouter)
app.use('/back/ingredient',IngredientRouter)
app.use('/back/products',ProductRouter)
app.use('/back/theory',TheoryRouter)
app.use('/api',UploadRouter)

//图片储存路径
app.use('/upload',express.static(__dirname + '/upload'))
app.use(express.static(__dirname + '/build'))

// app.get('*',function(req,res){
//   res.sendFile(path.join('/build/index.html'))
// })

//connect to mongodb
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost:27017/systems', {useNewUrlParser: true})
// mongoose.connect('mongodb://suky:00000000@47.100.171.180:27017/admin', {useNewUrlParser: true})
mongoose.connection.on('connected',() => console.log('mongodb is now connected'))

const PORT =process.env.PORT || 3001
app.listen(PORT,() => console.log(`we are now listening to ${PORT}`))
