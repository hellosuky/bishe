const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const compression = require('compression')
const UserRouter = require('./router/user.router')
const IngredientRouter = require('./router/ingredient.router')
const ProductRouter = require('./router/products.router')
const TheoryRouter = require('./router/theory.router')
const UploadRouter = require('./router/upload.router')

app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true,parameterLimit:50000}))
app.use(compression())

//router manager
app.use('/back/user',UserRouter)
app.use('/back/ingredient',IngredientRouter)
app.use('/back/products',ProductRouter)
app.use('/back/theory',TheoryRouter)
app.use('/api',UploadRouter)

//图片储存路径
app.use('/upload',express.static(__dirname + '/upload'))


//connect to mongodb
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/systems', {useNewUrlParser: true})
mongoose.connection.on('connected',() => console.log('mongodb is now connected'))

const PORT =process.env.PORT || 9090
app.listen(PORT,() => console.log(`we are now listening to ${PORT}`))
