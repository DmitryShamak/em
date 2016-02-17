var db = require("./db.js");

var user = require("./routes/userRoutes.js")(db);

var passport = require("./passport.js");

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated() && req.user)
        res.cookie('user', JSON.stringify(req.user));
        return next();

    // if they aren't redirect them to the home page
    var url = req.originalUrl.substring(1);
    var redirectUrl = url === "landing" ? url : "landing";
    res.redirect('/' + redirectUrl);
}

var router = function(app) {
    app.post('/api/user', user.save);
    app.post('/api/authenticate', user.authenticate);
    app.put('/api/user', user.update);

    app.all("/logout", function(req, res, next) {
        res.cookie("user", "", { expires: new Date(), path: '/'});
        req.logout();
        req.session.destroy();
        res.redirect("/landing");
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
            successRedirect: "/home",
            failureRedirect: "/landing"
        })
    );

    app.use(isLoggedIn);
};

module.exports = router;

