var express = require('express');
var router = express.Router();	
var shortid = require('shortid');
var userModel = require('../models/user');
var middleware = require('../helpers/middleware');
var passport = require('passport');
var axios = require('axios');
const User = require('../models/user');
const helpers = require('../helpers/index');

router.get('/',async(req,res)=>{
    res.send({success:true,user:req.isAuthenticated()?req.user:{}})
})

module.exports=router
