var express = require('express');
var router = express.Router();	
var shortid = require('shortid');
var userModel = require('../models/user');
var middleware = require('../helpers/middleware');
var passport = require('passport');
var axios = require('axios');
const User = require('../models/user');
const helpers = require('../helpers/index');

router.post('/sender/queue',middleware.isLoggedIn,async(req,res)=>{

})

router.post('/receiver/queue',middleware.isLoggedIn,async(req,res)=>{

})
