const express = require('express')
const Router = express.Router()
const utils = require('utility')
const User = require('../schemas/user.schemas')

//encrypt pwd
function encryptPwd(pwd){
    const salt = '&*()TREbdbgbfjsrgknfewnf肥婷很可爱'
    return utils.md5(utils.md5(pwd + salt))
}

Router.post('/login',function(req,res){
  let {username,pwd} = req.body
  User.findOne({'username':username,'pwd':encryptPwd(pwd)},{pwd:0},(err,doc) => {
    if(err){
      res.json({code:1,msg:'该用户不存在'})
      return
    }
      res.json({code:0,msg:'登录成功'})
  })
})

Router.get('/getall',function(req,res){
  User.find({},{pwd:0},function(err,doc){
    if(err){
      res.json({code:1,msg:'客户端出错了'})
      return
    }
      res.json({code:0,data:doc})
  })
})

Router.post('/addadmin',function(req,res){
  let {username,pwd} = req.body
  User.find({username},function(err,doc){
    if(err){
      res.json({code:1,msg:'该用户名已存在'})
      return
    }
    let user1 = new User({username,'pwd':encryptPwd(pwd)})
    user1.save().then(function(newadmin){
      res.json({code:0,data:newadmin})
    })
  })
})

Router.post('/deleteadmin',function(req,res){
  let {id} = req.body
  User.deleteOne({'_id':id},function(err,doc){
    if(err){
      res.json({code:1,msg:'客户端出错了'})
      return
    }
    User.find({},{pwd:0},function(e,d){
      if(e){
        res.json({code:1,msg:'客户端出错了'})
        return
      }
      res.json({code:0,data:d})
    })
  })

})

module.exports = Router
