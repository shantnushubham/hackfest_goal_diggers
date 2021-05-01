var mongoose = require('mongoose');
// var passportLocalMongoose = require('passport-local-mongoose');
const shortid = require('shortid');
var transactions = new mongoose.Schema({
    transactionId:{
        type:String,
        required:true
    },
    sender:{
        type:String,
        required:true
    },receiver:{
        type:String,
        required:true
    },date:{
        type:Date,
        default:Date.now()
    },amount:{
        type:Number,
        required:true
    },
    pbankTxn:{
        type:Boolean,
        default:false
    },
    meta:{
        type:String
    }
})
module.exports = mongoose.model('transactions', transactions, 'transactions');