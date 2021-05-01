var express = require('express');
var router = express.Router();	
var shortid = require('shortid');
var userModel = require('../models/user');
var middleware = require('../helpers/middleware');

const bankServices=require('../services/bank')

router.post('/queue',async(req,res)=>{
    let transactions=req.body// 
    console.log(transactions);
    try {
        let upload=await bankServices.addTransactionsToLedger(transactions)
        res.status(200).send(upload)
    } catch (error) {
        res.status(500).send({success:false})
    }
    

})

module.exports=router