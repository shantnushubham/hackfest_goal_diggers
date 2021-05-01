var mongoose = require('mongoose');
// var passportLocalMongoose = require('passport-local-mongoose');
const shortid = require('shortid');
var Pbank = new mongoose.Schema({
    uid: {
        type: String,
        default: shortid.generate,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    upiId:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        required:true
    },
    amount:{
        type:Number
    }
})
module.exports = mongoose.model('pbank', Pbank, 'pbank');