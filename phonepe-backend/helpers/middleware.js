var middlewareObj = {};


middlewareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/');
    }
};

middlewareObj.isAdmin = function(req, res, next) {
    if (req.isAuthenticated())  {
        if (req.user.isAdmin == true) {
            console.log('verified admin');
            next();
        } else {
            res.redirect('/dashboard');
        }
    } else {
        res.redirect('/login');
    }
};


module.exports = middlewareObj;