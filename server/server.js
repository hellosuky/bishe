const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const compression = require('compression')

app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb',extended:true,parameterLimit:50000}))
app.use(compression())


app.use('/data',function(req,res){
  res.json({'name':'ddd'})
})


//connect to mongodb
mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/product', {useNewUrlParser: true})
mongoose.connection.on('connected',() => console.log('mongodb is now connected'))

const PORT =process.env.PORT || 9090
app.listen(PORT,() => console.log(`we are now listening to ${PORT}`))
