var mongoose = require('mongoose');
// var passportLocalMongoose = require('passport-local-mongoose');
const shortid = require('shortid');
var ledger = new mongoose.Schema({
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
        required:true
    },amount:{
        type:Number,
        required:true
    },resolved:{
        type:Boolean,
        default:false
    },
})
module.exports = mongoose.model('ledger', ledger, 'ledger');