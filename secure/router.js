var db = require("./db.js");

var user = require("./routes/userRoutes.js")(db);

var passport = require("./passport.js");

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        res.cookie('user', JSON.stringify(req.user));
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

var router = function(app) {
    app.post('/api/user', user.save);
    app.post('/api/authenticate', user.authenticate);
    app.put('/api/user', user.update);

    app.all("/logout", function(req, res, next) {
       req.logout();
       res.redirect("/");
    });

    //OAuth
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('/auth/google', passport.authenticate("google", {scope: ['profile', 'email']}));
    app.use('/auth/google/callback', function(req, res, next) {
        console.log("Middleware", req.url);
        next();
    });
    app.get('/auth/google/callback', passport.authenticate("google", {
            successRedirect: "/landing",
            failureRedirect: "/login"
        })
    );

    app.use(isLoggedIn);
};

module.exports = router;

