const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const userModel = require('../models/user');
const middleware = require('../helpers/middleware');
const passport = require('passport');
const axios = require('axios');
const User = require('../models/user');
const helpers = require('../helpers/index');
const crypto = require('crypto')
const bankServices = require('../services/bank')
router.get('/profile', middleware.isLoggedIn, async (req, res) => {
    try {
        var userData = await userModel.findOne({ uid: req.user.uid });
        res.status(200).send({ success: true, user: data });
    } catch (error) {
        console.log(error);
        res.status(200).send({ success: false, user: {}, message: "not found" });
    }
});

router.post('/login', passport.authenticate('local', {
    //successRedirect: resRedirect,
    failureRedirect: '/',
    failureFlash: true
}), (req, res) => {
    let phonepeBalance = await bankServices.findPhonePeBalance(req.user.uid)
    res.status(200).send({ user: req.user, wallet: phonepeBalance })
});

router.get('/logout', function (req, res) {
    req.logout();
    res.send({ success: true });
});

router.post('/signup', async (req, res) => {
    const {
        publicKey,
        privateKey,
    } = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
        }
    });
    // console.log(publicKey,privateKey);
    // var prime_length = 60;
    // var encrypted = crypto.publicEncrypt(publicKey, Buffer.from('prakhar shrivastava','utf-8'));
    // console.log(encrypted.toString('utf-8'));
    // var buffers = Buffer.from(encrypted, 'utf-8');
    // const decrypted = crypto.privateDecrypt(
    //     {
    //         key: privateKey.toString(),
    //     },
    //     buffers,
    // )
    // console.log(decrypted.toString('utf-8'));

    // diffHell.generateKeys('base64');
    // var data=crypto.publicEncrypt(diffHell.getPublicKey('base64'),Buffer.from("secret"))
    // console.log(data.toString('base64'));
    // console.log( crypto.privateDecrypt( diffHell.getPrivateKey('base64'),Buffer.from(data,'base64')));
    // diffHell.generateKeys('base64');

    const user = {
        name: req.body.name,
        username: req.body.username,
        email: req.body.username,
        upiId: req.body.upiId,
        publicKey: publicKey,
        privateKey: privateKey,
        phone: req.body.phone
    };

    try {
        var u = new User(user);
        // console.log(u);
        userModel.register(new User(u), req.body.password, (err, user) => {
            if (err) {
                console.log(err);
                res.status(200).send({ success: false, message: 'error in creating user' })
            }
            else {
                passport.authenticate('local')(req, res, () => {
                    console.log(req.user);
                    res.status(200).send({ success: true, user: u })
                });
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({ success: false, message: 'error in registering user' });
    }

});

router.post('/encrypt', async (req, res) => {

    // diffHell.generateKeys('base64');
    // var data=crypto.publicEncrypt(diffHell.getPublicKey('base64'),Buffer.from("secret"))
    // console.log(data.toString('base64'));
    // console.log( crypto.privateDecrypt( diffHell.getPrivateKey('base64'),Buffer.from(data,'base64')));
    // diffHell.generateKeys('base64');


    var data = await userModel.findOne({ username: "prakharshriv@gmail.com" })
    var publicKey = data.publicKey, privateKey = data.privateKey
    var encrypted = crypto.publicEncrypt(publicKey, Buffer.from(req.body.value, 'utf-8'));
    console.log(encrypted.toString('utf-8'));
    var buffers = Buffer.from(encrypted, 'utf-8');
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey.toString(),
        },
        buffers,
    )
    console.log(decrypted.toString('utf-8'));
    res.send({ encrypted: encrypted.toString('utf-8'), decrypted: decrypted.toString('utf-8') })
})

module.exports = router