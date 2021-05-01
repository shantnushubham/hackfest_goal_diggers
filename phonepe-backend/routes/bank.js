var express = require('express');
var router = express.Router();
var shortid = require('shortid');
var userModel = require('../models/user');
var middleware = require('../helpers/middleware');
var passport = require('passport');
var axios = require('axios');
const User = require('../models/user');
const bankModel = require('../models/bank')
const helpers = require('../helpers/index');
const bankServices = require('../services/bank')
router.get('/balance', middleware.isLoggedIn, async (req, res) => {

    try {

        let bankData = await bankServices.getBankBalance(req.user.uid)
        if (!bankData.success)
            throw ({ success: false, message: 'user not found' })
        res.send({ success: true, bankData: bankData.bankData })
    } catch (error) {
        console.log(error);
        res.status(200).send({ success: false, message: error.message ? error.message : "some error occured" })
    }

})

router.post('/pcash', middleware.isLoggedIn, async (req, res) => {
    try {

        let pin = req.body.pin
        if (req.user.pin != pin)
            throw ({ success: false, message: 'pin mismatch' })
        let bankData = await bankServices.getBankBalance(req.user.uid)
        if (!bankData.success)
            throw ({ success: false, message: 'user not found in home bank' })
        bankData=bankData.bankData
        if(req.body.amount>bankData.amount)
            throw({success:false,message:'not enough balance'})
        let transaction=await bankServices.providePCash(req.user.uid,req.body.amount)
        res.send({success:true,transaction:transaction.txn})
    } catch (error) {
        res.send({success:false,message:error.message})
    }

})

router.get('/summary',middleware.isLoggedIn,async (req,res)=>{
    
})



module.exports=router