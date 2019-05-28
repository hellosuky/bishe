const express = require('express')
const path = require('path')
const multer = require('multer')
const fs = require('fs')
const Router = express.Router()

const storage = multer.diskStorage({
   destination: "server/upload/",
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
})

const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
})

Router.post('/upload',upload.single('pic'),function(req,res){
  res.json({code:0,data:req.file})
})

Router.post('/picture',upload.single('pic'),function(req,res){
  res.json({errno:0,data:[`http://localhost:9090/upload/${req.file}`]})
})

Router.post('/delete',function(req,res){
  let {url} = req.body
  fs.unlink(path.resolve('./') + `/server/upload/${url}` ,(err) => {
    if (err) {
      console.log(err)
      return
    }
    res.json({code:0})
  })
})
module.exports = Router
