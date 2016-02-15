var db = require("./db.js");

var user = require("./routes/userRoutes.js")(db);

var passport = require("./passport.js");

var router = function(app) {
    app.post('/api/user', user.save);
    app.post('/api/authenticate', user.authenticate);
    app.post('/api/login', user.login);
    app.get('/api/user', user.get);
    app.put('/api/user', user.update);

    //OAuth
    app.use(passport.initialize());
    app.use(passport.session());

    //app.get('/auth/google', passport.authenticate("google", {scope: ['profile', 'email']}));
    //app.get('/auth/google/callback', passport.authenticate("google", {
    //        successRedirect: "/sources",
    //        failureRedirect: "/sources"
    //    })
    //);
};

module.exports = router;

