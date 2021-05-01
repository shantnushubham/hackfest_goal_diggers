var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
const shortid = require('shortid');
var User = new mongoose.Schema({
    uid: {
        type: String,
        default: shortid.generate,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    }
    ,
    isAdmin: {
        type: Boolean,
        default: false
    },

    phone: {
        type: String,
        required:true
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    },
    privateKey:{
        type:Object,
        required:true
    },
    publicKey:{
        type:Object,
        required:true
    },
    upiId:{
        type:String,
        required:true
    }

});


User.plugin(passportLocalMongoose);
module.exports = mongoose.model('users', User, 'users');