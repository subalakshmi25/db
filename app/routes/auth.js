
var authController = require('../controllers/authcontroller.js');
module.exports = function (app, passport) {
    // GET routes to render our handlebar pages
    app.get('/signup', authController.signup);
    app.get('/signin', authController.signin);
        //WE need a logout
    app.get('/logout', authController.logout);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/dashboard', //GET path defined below
        failureRedirect: '/signup'
    }
    ));
    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated())
            return next();
        res.redirect('/signin');
    }
    app.get('/dashboard',isLoggedIn, authController.dashboard);

    app.post('/signin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/signin'
    }
));
}