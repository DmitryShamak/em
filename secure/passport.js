var oauthConfig = require("./oauth.js");
var passport = require("passport");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var _ = require('lodash');

var db = require("./db.js");
var sources = require("./routes/sourcesRoutes.js")(db);

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new GoogleStrategy(oauthConfig.googleAuth,
    function(accessToken, refreshToken, profile, done) {
        //console.log("Google", profile);
        //User.findOrCreate({ openId: identifier }, function(err, user) {
        //    done(err, user);
        //});
        //TODO: save user source data (tokens)
        sources.add({
            email: _.find(profile.emails, {type: "account"}).value,
            token: accessToken
        }, function(err, data) {
            if(err) {
                return console.log(err);
            }
            console.log("Source", data);
        });
        //TODO: return display Name and status (on/off)
        done(null, {
            profile: profile,
            accessToken: accessToken,
            refreshToken: refreshToken
        });
    }
));

module.exports = passport;