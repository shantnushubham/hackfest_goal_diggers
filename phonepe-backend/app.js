const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const { connect } = require('mongoose');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
const colors = require('colors');
const passport = require('passport');
const flash = require('connect-flash');
const path = require('path');
const cors = require('cors');
const User = require('./models/user')
require('dotenv').config();
const envData = process.env;
const userRoutes=require('./routes/users')
const indexRoutes=require('./routes/index')
const bankRoutes=require('./routes/bank')



try {
    connect(envData.DB, { useNewUrlParser: true, useUnifiedTopology: true });
} catch (error) {
    console.log(error);
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // parse application/vnd.api+json as json
app.use(require('cookie-parser')());
app.use(compression());
app.use(flash());
app.use(require('express-session')({
    secret: 'Prakhar',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 6000000
    }
}));
app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    console.log('Request Type:', req.method, ' at :', req.path);
    // console.log('Time:', Date.now());
    next();
});
app.use(function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.currentUser = req.user;
        res.locals.success = req.flash('success');
        res.locals.error = req.flash('error');
    } else {
        res.locals.currentUser = "";
        res.locals.success = req.flash('success');
        res.locals.error = req.flash('error');
    }
    next();
});
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(userRoutes)
app.use(indexRoutes)
app.use(bankRoutes)
app.get('/*', function (req, res) {
    res.send({success:true})
});

const PORT = 5000;
app.listen(PORT, function () {
    console.log("Server is working on 5000");
});